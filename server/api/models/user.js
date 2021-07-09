const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'seller'],
        default: 'user'
    }

    
}, {timestamps: true}
)

userSchema.pre("save", async function(next){

    //if(this.ismodified('password')) to update password
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
})
const user = mongoose.model("User", userSchema);

module.exports = user;
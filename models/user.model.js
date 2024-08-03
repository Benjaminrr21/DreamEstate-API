const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    role: {
        type:String,
    },
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    estates: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Estate"
    }]
},
{
    timestamps: true
}

);

const User = mongoose.model("User",UserSchema)
module.exports = User
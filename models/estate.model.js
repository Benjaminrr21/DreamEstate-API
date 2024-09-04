const mongoose = require('mongoose')

const EstateSchema = mongoose.Schema({
    category: {
        type:String,
        required: true
    },
    type: {
        type:String,
        required:true
    },
    pricePerM2: {
        type: Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    rooms: {
        type:Number
    },
    year: {
        type:Number
    },
    area: {
        type:Number
    },
    heating: {
        type:String
    },
    image1: {
        type:String
    },
    image2: {
        type:String
    },
    image3: {
        type:String
    },
    image4: {
        type:String
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps:true
})

const Estate = mongoose.model("Estate",EstateSchema);
module.exports = Estate
const mongoose = require('mongoose')

const favoriteList = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    estate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Estate"
    },
}, {
    timestamps:true
})

const FavoriteList = mongoose.model("FavoriteList",favoriteList);
module.exports = FavoriteList;

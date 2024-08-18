const FavoriteList = require('./../models/favoritelist.model.js')

const getByUser = async(req,res) => {
    try {
        const {uid} = req.params

        var myFavoriteList = await FavoriteList.find({user:uid}).populate("estate")
        if (!myFavoriteList) {
            return res.status(404).send({ message: "Favorite list not found for user." });
        }

        res.status(200).send(myFavoriteList);
    }catch(e){
        console.log(e)
        res.status(500).send({message:"Internal server error."})
    }
}

const addToFavoriteList = async (req,res) => {
    try {
    await FavoriteList.create(req.body)
    res.status(200).send(req.body)
    }catch(e){
        console.log(e)
        res.status(500).send({message:e.message})
    }
}
const deleteFromList = async(req,res) => {
    try {
        const {id} = req.params
        const item = await FavoriteList.findByIdAndDelete(id)
        if(!item) res.status(404).json({message:"Nepostojeca stavka se ne moze obrisati."})
        else res.status(200).json({message:"Uspesno brisanje stavke."});

    }catch(e){
        console.log(e)
        res.status(500).send({message:e.message})
    }
}

module.exports = {
    getByUser,
    addToFavoriteList,
    deleteFromList
}
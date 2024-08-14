const Estate = require('./../models/estate.model.js')

const getAll = async(req,res) => {
    try {
        var estates = await Estate.find({}).populate("owner")
        res.status(200).json(estates)
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}
const getById = async(req,res) => {
    try {
        const {id} = req.params;
        const es = await Estate.findById(id).populate("owner")
        if(!es) res.status(404).json({message:"Nekretnina ne postoji u bazi."})
        else res.status(200).json(es);
    }catch(e) {
        res.status(500).json({message:e.message})
    }
}
const add = async(req,res) => {
try {
    const es = await Estate.create(req.body);
    res.status(200).json(es)

}catch(e){
    res.status(500).json({message:e.message})
}
}
const deletee = async(req,res) => {
try {
    const {id} = req.params;
    const es = await Estate.findByIdAndDelete(id);
    if(!es) res.status(404).json({message:"Nepostojeca nekretnina se ne moze obrisati."})
    else res.status(200).json({message:"Uspesno brisanje nekretnine."});
}catch(e){
    res.status(500).json({message:e.message})
}
}
const update = async(req,res) => {
    try {
        const {id} = req.params;
        const estate = await Estate.findByIdAndUpdate(id,req.body)
        if(!estate) res.status(404).json({message:"Ne postoji nekretnina u bazi!"})
        else {
            const es = await Estate.findById(id)
            res.status(200).json({message:"Uspesna izmena nekretnine."})
        }
    }catch(e){
        res.status(500).json({message:e.message})
    }
}
const filter = async(req,res) => {
    try {
        const {type,rooms,category,minPrice,maxPrice,location} = req.query;
        const filter = {};
        if(type) filter.type = type;
        if(rooms) filter.rooms = rooms;
        if(category) filter.category = category;
        if(minPrice) filter.pricePerM2 = {$gte: minPrice};
        if(maxPrice) filter.pricePerM2 = {$lte: maxPrice};
        if(location) filter.location = location;
        const estates = await Estate.find(filter);
        res.json(estates)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

module.exports = {
    getAll,
    getById,
    add,
    deletee,
    update,filter
}
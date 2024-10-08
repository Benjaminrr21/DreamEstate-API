const res = require('express/lib/response')
const User = require('../models/user.model.js')
const {createToken,verifyToken} = require('../jwt.js')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user:process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});



const sendMail = async(transporter, mailOptions) => {
    try{
        await transporter.sendMail(mailOptions)
        console.log("Email je poslat!")
    }catch(error){
        console.log(error)
    }
}



const getAllUsers = async (req, res) => {
    try {
        var users = await User.find({}).populate("estates")
        res.status(200).json(users)
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

const getCustomers = async(req,res) => {
    try {
    const customers = await User.find({role:"Customer"})
    res.status(200).json(customers)
    }
    catch(e) {
        res.status(500).json({message:e.message})
    }
}

const getOwners = async (req,res) => {
    try {
        const owners = await User.find({role:"Owner"})
        res.status(200).json(owners)
        }
        catch(e) {
            res.status(500).json({message:e.message})
        }
}
const getById = async(req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id)
        if(!user) res.status(404).json({message:"Korisnik ne postoji u bazi."})
        else res.status(200).json(user);
    }catch(e) {
        res.status(500).json({message:e.message})
    }
}

const register = async (req,res) => {
        try {
        const {firstName,lastName,email,phone,role,username,password,code} = req.body;
        bcrypt.hash(password,10)
        .then((hash) => {
            User.create({
                firstName:firstName,
                lastName:lastName,
                email:email,
                phone:phone,
                role:role,
                username:username,
                password:hash,
                verificationCode:code
            }).then(() => {
                const mailOptions = {
                    from: {
                        name:"Dream Estate",
                        address:process.env.APP_USER
                    }, // sender address
                    to: email, // list of receivers
                    subject: "DreamEstate registracija", // Subject line
                    text: "Dobrodosli!", // plain text body
                    html: "<b>Dobrodosli! Vas kod za registraciju je: "+code+"</b>", // html body
                }
                sendMail(transporter, mailOptions)
                res.status(200).json("Uspesna registracija!");
            }).catch((e) => {
                res.status(400).json({message:e.message})
            })
        })
    }catch(e){
        res.status(500).json({message:e.message});
    }
}

const login = async (req,res) => {
    const {username,password} = req.body;
    const u = await User.findOne({username:username})
    if(!u) res.status(404).json({message:"Korisnik nije pronadjen!"})
    else {
        const pwd = u.password;
        bcrypt.compare(password,pwd)
        .then((isSame)=>{
            if(!isSame) res.status(400).json({message:"Pogresna lozinka!"})
            else {
                const token = createToken(u);
                res.cookie("token",token,{
                    maxAge:864000000,
                    httpOnly:true
                })
                res.status(200).json({message:"Uspesno logovanje!",token:token,role:u.role})
            }
        })
    }

}

const deleteUser = async(req,res) => {
    try {
        const {id} = req.params;
        const p = await Estate.findByIdAndDelete(id);
        if(!p) {
            return res.status(404).json({message:"Estate not found."});

        }
        res.status(200).json({message:"Deleted successfullty!"});
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

module.exports = {
    getAllUsers,
    getCustomers,
    getOwners,
    getById,
    register,
    login,
    deleteUser
}
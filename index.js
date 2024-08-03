const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user.route.js')
const estateRouter = require('./routes/estate.route.js')
const app = express();
app.use(express.json())


mongoose.connect("mongodb+srv://benjaminramovic02:dreamestatedb@dreamestatedb.sjfwqb3.mongodb.net/DreamEstate?retryWrites=true&w=majority&appName=DreamEstateDB")
.then(()=>{
    console.log("Connected to DreamEstate database!");
    app.listen(5000, () => {
        console.log("Server is running on port 5000.");
    });
});

app.use('/api/users',userRouter);
app.use('/api/estates',estateRouter);

app.get("/",(req,res)=>{
    res.send("HELLO !!!");
});

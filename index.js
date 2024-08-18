const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/user.route.js')
const estateRouter = require('./routes/estate.route.js')
const favoritelistRouter = require('./routes/favoritelist.route.js')
const http = require('http')
const {Server} = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8081", // ili '*'
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
})
const cors = require('cors')
app.use(cors())


app.use(express.json())


mongoose.connect("mongodb+srv://benjaminramovic02:dreamestatedb@dreamestatedb.sjfwqb3.mongodb.net/DreamEstate?retryWrites=true&w=majority&appName=DreamEstateDB")
.then(()=>{
    console.log("Connected to DreamEstate database!");
    server.listen(5000, () => {
        console.log("Server is running on port 5000.");
    });
});

io.on("connection", (socket) => {
    console.log("User connected")
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

app.post("/api/notify",(req,res) => {
    const message = req.body.message;
    io.emit('notification', message);
    res.send('Notification sent!');
})

app.use('/api/users',userRouter);
app.use('/api/estates',estateRouter);
app.use('/api/favoritelist',favoritelistRouter);

app.get("/",(req,res)=>{
    res.send("HELLO !!!");
});

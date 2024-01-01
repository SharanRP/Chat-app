const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors");
const {chats} = require("./data/data")
const connectDb = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

dotenv.config()
connectDb()
app.use(express.json())
app.use(cors());



app.get('/', (req , res) => {
    res.send("API is running")
})
// app.get('/api/chat', (req , res) => {
//     res.send(chats)
// })

app.use('/api/user' , userRoutes);
app.use('/api/chat' , chatRoutes);
app.use('/api/message' , messageRoutes);

app.use(notFound)
app.use(errorHandler)



app.get("/api/chat/:id" , (req , res) => {
    const singleChat = chats.find((c) => {
        c._id === req.params.id
    })
    res.send(singleChat)
    console.log(singleChat)
})


const PORT = process.env.PORT || 5000

const server = app.listen(PORT , console.log("Server is running on port 5000"))

const io = require('socket.io')(server , {
    pingTimeOut : 70000,
    cors: {
        origin:"http//localhost:3000"
    }
});
io.on("connected" , (socket) => {
    console.log("connected to socket.io")

    socket.on("setup" , (userData) => {
        socket.join(userData._id);
        console.log(userData._id)
        socket.emit("connected");
    })

    socket.on("join chat" , (room) => {
        socket.join(room);
        console.log("User Joined Room: "+room);
    })

    socket.on("typing" , (room)=>{
        socket.in(room).emit('typing')
    })

    socket.on("stop typing" , (room)=>{
        socket.in(room).emit('stop typing')
    })

    server.on('new message' , (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if(!chat.users) return console.log("chat.users not defined");
        
        chat.users.forEach(user => {
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received" , newMessageReceived)
        })
    })

    socket.off("setup" , ()=> {
        console.log("User Disconnected");
        socket.leave(userData._id);
    })
})

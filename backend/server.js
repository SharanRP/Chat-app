const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors");
const {chats} = require("./data/data")
const connectDb = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
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

app.listen(PORT , console.log("Server is running on port 5000"))

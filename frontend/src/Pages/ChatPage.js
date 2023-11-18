import React, { useEffect , useState } from "react"
import axios from 'axios'

const ChatPage = () => {

    const [chats , setChats] = useState([]);

    const fetchData = async () => {
        const {data} = await axios.get('/api/chat')
        setChats(data)
        console.log(data)
    }
    useEffect(()=>{

        fetchData()

    })
    return (
        <div >
           {chats.map((c)=> (
            <div key ={ c._id}>
            {c.chatName}
            </div>
            ))}
        </div>
    )
}

export default ChatPage
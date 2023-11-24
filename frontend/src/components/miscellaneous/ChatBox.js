import React from "react";
import { ChatState } from "../../Context/chatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import DarkImage from '../../Images/Dark.jpg'

const ChatBox = ({fetchAgain , setFetchAgain}) => {

    const {user ,selectedChat , setSelectedChat, chats , setChats } = ChatState()

    return (
        <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        p = {1}
        m={2}
        bgColor='black'
        w={{ base: "100vh", md: "68%" }}
        borderWidth="1px"
        position="relative"
        >
       <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        style={{
            backgroundImage: `url(${DarkImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.6,
            zIndex:1
        }}
    />
        <Box style={{zIndex:1 , padding:'6px' , width:'100%'}}  >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
        </Box>
    )
}

export default ChatBox
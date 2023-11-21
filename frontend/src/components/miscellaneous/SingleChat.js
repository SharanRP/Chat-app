import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/chatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "../../index.css"
import { getSender, getSenderDetails } from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";

const SingleChat =({fetchAgain , setFetchAgain}) => {

    const {user ,selectedChat , setSelectedChat, chats , setChats } = ChatState()

    return (
        <div style={{width:'100vh'}} >
            { selectedChat ? (
                <>
                <Text
                fontSize={{ base : '28px' , md:"30px" }}
                pb ={3}
                px ={2}
                width = '100vh'
                fontFamily='Nunito Sans'
                display = 'flex'
                justifyContent={{ base :'space-between'}}
                alignItems="center"
                color='white'
                opacity='1'
                zIndex={1}
                style={{zIndex:5}}
                
              //  position='relative'
                >
                 <IconButton
              display={{ base: "flex", md: "none" }}
             // position='absolute'
              //left='0'
             // ml='0px'
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {/* {messages && */}

              {!selectedChat.isGroupChat ? (
                <Box
                width='100vh'
                style={{opacity:'10' , width:'100vh'}}
                p={2}
                bgColor='black'
                justifyContent='space-between'>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderDetails(user, selectedChat.users)}
                  />
                </Box>
              ) : (
                <Box>
                  {selectedChat.chatName.toUpperCase()}
                  {/* <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
                </Box>
              )}
              {/* } */}
                </Text>
                <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            width="100vh"
            height="83vh"
            borderRadius="lg"
            overflowY="hidden"
            style={{}}
          ></Box>
          </>

            ) :(
                <Box 
                display='flex'
                alignItems='center'
                justifyContent='center'
                height='100%' 
            >
                <Text 
                    pb={3}
                    color='gray.100'
                    fontSize='3xl'
                    fontFamily='Nunito Sans'
                //    style={{height:'100%'}}
                >
                  <p class= 'animated'> Click on User to Start Chatting </p>
                </Text>
            </Box>
            ) }
        </div>
    )
}

export default SingleChat
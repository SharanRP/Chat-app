import React, { useEffect, useState } from "react";
import { Box, IconButton, Spinner, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import { ChatState } from "../../Context/chatProvider";
import { getSender, getSenderDetails } from "../../config/ChatLogics";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [messages , setMessages] = useState([])
  const [loading , setLoading] = useState(false)
  const [newMessages , setNewMessages] = useState()
  const [joke, setJoke] = useState(null);

  const fetchJoke = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=religious,racist,sexist'
      );
      const data = await response.json();
      console.log(data)
      const formattedJoke = `${data.setup} ${data.delivery}`;
      setJoke(formattedJoke);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClick = () => {
    fetchJoke();
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  //handleJoke();

  return (
    <div style={{ width: '100%' }}>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: "30px" }}
            pb={3}
            px={2}
            width={{ base: '100%', md: '100vh' }}
            fontFamily='Nunito Sans'
            display='flex'
            justifyContent={{ base: 'space-between' }}
            alignItems='center'
            color='white'
            opacity='1'
            zIndex={1}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              justifyContent='flex-start'
              alignItems='center'
              bgColor='transparent'
              icon={<ArrowBackIcon color='white' height='7' width='7' />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <Box
                width={{ base: '100%', md: '100vh' }}
                p={2}
                display='flex'
                bgColor='black'
                justifyContent='space-between'
                style={{justifyContent:'space-between'}}
              >
                {getSender(user, selectedChat.users)}
                <ProfileModal
                  user={getSenderDetails(user, selectedChat.users)}
                />
              </Box>
            ) : (
              <Box display='flex' justifyContent='space-between' width='100%' >
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
              </Box>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bgColor="transparent"
            backdropFilter="auto" 
            backdropBlur="3px"
            border='2px'
            borderColor='blue.200'
            width={{ base: '100%', md: '100vh' }}
            height={{ base: '83vh', md: '100vh' }}
            borderRadius="lg"
            overflowY="auto"
          >
            {!loading ? (
               <Box> <Spinner color="white" position='absolute' top="50%" right='50%' h={20} w={20} size='lg' margin='auto' display='flex' justifyContent='center' /></Box>
            ) : (
             ''
            )}
          </Box>
        </>
      ) : (
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
          >
            <p className='animated'> Click on User to Start Chatting </p>
            {joke && 
            <Box 
            onClick={handleClick}
            _hover={{ cursor: 'pointer' }}
            display='flex'  
            fontSize='4xl' 
            fontWeight='bold' 
            fontFamily='Comic Neue'
            justifyContent='center' 
            backdropFilter="auto" 
            backdropBlur="3px"
            border='1px'
            borderColor='blue.200'
            borderRadius='2xl'
            padding={7} 
            mt={36}>
            {joke}
            </Box>}
          </Text>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;

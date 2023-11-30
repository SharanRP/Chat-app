import React, { useEffect, useState } from "react";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import { ChatState } from "../../Context/chatProvider";
import { getSender, getSenderDetails, getSenderPic } from "../../config/ChatLogics";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ScrollableChat from './ScrollableChat'
import '../../App.css'
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import '../../index.css'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [messages , setMessages] = useState([])
  const [loading , setLoading] = useState(false)
  const [newMessage , setNewMessage] = useState()
  const [joke, setJoke] = useState(null);

  const toast = useToast();

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);
      console.log(messages)
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const sendTheMessage = async(e) => {

        if (e.key === "Enter" && newMessage) {
            try {
              const config = {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${user.token}`,
                },
              };
              setNewMessage("");
              const { data } = await axios.post(
                "/api/message",
                {
                  content: newMessage,
                  chatId: selectedChat,
                },
                config
              );
              console.log('data', data)
              setMessages([...messages, data]);
            } catch (error) {
              toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              });
            }
          }

  }

  const fetchJoke = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=religious,racist,sexist'
      );
      const data = await response.json();
      console.log(data)
      const formattedJoke = `${data.setup} 
                             ${data.delivery}`;
      setJoke(formattedJoke);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClick = () => {
    fetchJoke();
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    fetchJoke();
  }, []);

  //handleJoke();

  return (
    <div style={{ width: '100%'  }}>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: "30px" }}
            py={3}
            px={2}
            width={{ base: '100%', md: '100%' }}
            fontFamily='Nunito Sans'
            display='flex'
            alignContent='center'
            alignItems='center'
            justifyContent={{ base: 'space-between',md:'center' }}
            color='white'
            opacity='1'
            bgGradient='linear(to-l, gray.900, cyan.900)'
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
                width={{ base: '100%', md: '100%' }}
                p={2}
                display='flex'
                justifyContent='space-between'
                style={{justifyContent:'space-between'}}
              ><Box display='flex' px={2}>
                <img src={getSenderPic(user , selectedChat.users)} style={{height:'3rem' , width:'3rem', borderRadius:'50%', marginRight:6 , paddingRight:'2'}} />
                {getSender(user, selectedChat.users)}
                </Box>
                <ProfileModal
                  user={getSenderDetails(user, selectedChat.users)}
                />
              </Box>
            ) : (
              <Box display='flex' justifyContent='space-between' width='100%' >
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
              </Box>
            )}
          </Text>
          {/* <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bgColor="transparent"
            backdropFilter="auto" 
            backdropBlur="3px"
            border='2px'
            borderColor='blue.200'
            width={{ base: '100%', md: '100%' }}
            height={{ base: '83vh', md: '80vh' }}
            borderRadius="lg"
            overflowY="auto"
          > */}
            {loading ? (
               <Box> <Spinner color="white"  position='absolute' top='50%' right="50%" h={20} w={20} size='lg' margin='auto' display='flex' justifyContent='center' /></Box>
            ) : (
             <div  className="messages"> <ScrollableChat messages={messages} /> </div>
            )}
            <FormControl
            display="flex"
            justifyContent="space-between"
            flexDirection="row" 
            position="absolute"
            bg="gray.600"
            borderRadius='0'
            bottom="0"
            left="0"
            right="0"
            p={2.2}
            my={0}
            alignItems="center" 
            onKeyDown={sendTheMessage}
            isRequired
            >
            <Input
                variant="filled"
                bgColor="gray.600"
                color="white"
                borderRadius='0'
                border='0'
                placeholder="Click to start typing"
                onChange={typingHandler}
                value={newMessage}
                flex="1" 
            />
            <IconButton
                icon={<i class="fi fi-ss-paper-plane-top" style={{height:'9' , width:'9'}} ></i>}
                color="gray.100"
                _hover={{ color : 'gray.900' }}
                alignItems='center'
                bgColor='transparent'
                aria-label="Send Message"
                onClick={sendTheMessage} 
            />
            </FormControl>
          {/* </Box> */}
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
            margin={6}
            marginTop={24}
            color='gray.100'
            fontSize='3xl'
            fontFamily='Nunito Sans'
          >
            <p className='animated' style={{margin:5}}> Click on User to Start Chatting </p>
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
            mt={36}
            mx={6}
            >
            {joke}
            </Box>}
          </Text>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;

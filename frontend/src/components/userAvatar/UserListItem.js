import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../../Context/chatProvider";
import { MenuDivider , Divider } from "@chakra-ui/react";

const UserListItem = ({ user , handleFunction }) => {

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      _hover={{
        borderWidth:'1px',
        borderColor: 'cyan',
        
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      my={4}

      borderRadius="lg"
      style={{backgroundImage: 'linear-gradient(120deg, #616161 0%, #9bc5c3 100%)' , display:"flex" , alignItems:'center'}}
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
        // borderWidth='0.9px'
        // borderColor='black'
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
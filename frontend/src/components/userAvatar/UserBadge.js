import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadge = ({userSelected , handleFunction , key}) => {

    return (
        <Box
        p='1.5'
        m={1}
        borderRadius='2xl'
        bgColor='gray.300'
        color='gray.800'
        fontSize={{ base: 'xs', md: 'sm' }}
        variant='solid'
        cursor='pointer'
        fontStyle='italic'
        fontWeight='bold'
        onClick = {handleFunction}
        >
        {userSelected.name}
        <CloseIcon pl='2' height='5' width='5' />
        </Box>
    )

}

export default UserBadge
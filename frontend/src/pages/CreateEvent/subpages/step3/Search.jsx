import React from 'react'
import { Box, Input, FormControl, InputGroup, InputLeftElement, Select, Flex } from '@chakra-ui/react'
import { SearchIcon, } from '@chakra-ui/icons'

const Search = () => {
    return (
        <Box mb='5'>
            <FormControl>
                <Flex justifyContent={'space-between'}>
                    <InputGroup w='100%'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='#8C8C8C' />}
                        />
                        <Input type='text' outline='none' placeholder='Search anything in events' bg='white' border='none' fontSize={13} color='#8C8C8C' letterSpacing={0.5} />
                    </InputGroup>
                </Flex>
            </FormControl>
        </Box>
    )
}

export default Search
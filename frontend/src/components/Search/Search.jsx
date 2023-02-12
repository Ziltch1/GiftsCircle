import React from 'react'
import {Box, Input, FormControl, InputGroup, InputLeftElement, Select, Flex} from '@chakra-ui/react'
import {SearchIcon,} from '@chakra-ui/icons'

const Search = () => {
    return (
        <Box>
            <FormControl>
                <Flex justifyContent={'space-between'}>
                    <InputGroup w='87%'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='#8C8C8C' />}
                        />
                        <Input type='tel' placeholder='Search anything in events' bg='white' border='none' fontSize={13} color='#8C8C8C' letterSpacing={1} />
                    </InputGroup>

                    <Select placeholder='Filter' variant={'flushed'} bg='#555555' w='10%' color='white' textAlign={'center'} borderRadius='5px'>
                        <option value="aa" color='black'>aadddd</option>
                        <option value="aa">aadddd</option>
                        <option value="aa">aadddd</option>
                        <option value="aa">aadddd</option>
                    </Select>
                </Flex>
            </FormControl>
        </Box>
    )
}

export default Search
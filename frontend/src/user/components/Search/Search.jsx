import React from 'react'
import {Box, Input, FormControl, InputGroup, InputLeftElement, Select, } from '@chakra-ui/react'
import {SearchIcon,} from '@chakra-ui/icons'

const Search = () => {
    return (
        <Box>
            <FormControl>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='#8C8C8C' />}
                    />
                    <Input type='tel' placeholder='Search anything in events6' bg='white' border='none' />
                </InputGroup>

                <Select placeholder='Filter' variant={'flushed'} bg='#555555'>
                    <option value="aa">aadddd</option>
                    <option value="aa">aadddd</option>
                    <option value="aa">aadddd</option>
                    <option value="aa">aadddd</option>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Search
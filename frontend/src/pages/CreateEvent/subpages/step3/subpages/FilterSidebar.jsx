import { AddIcon, ChevronDownIcon, CloseIcon,} from '@chakra-ui/icons'
import { Box, Select, FormControl, Divider, Button, Text, Flex } from '@chakra-ui/react'
import React, {useState} from 'react'
import {FiSliders} from 'react-icons/fi'


const FilterSidebar = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const showFilter = () => {
    setToggleFilter(!toggleFilter);
  }
  return (
    <Box>
      <Button bg='#555555' fontSize='14px' color='white' w='130px' textAlign='center' onClick={showFilter}>
        <Text mr='2'>Filter</Text>
        <ChevronDownIcon fontSize={25} />
      </Button>
      {toggleFilter && <Filters />}
    </Box>
  )
}

export default FilterSidebar

export const Filters = () => {
  return (
    <>
      <Box w='293px' h='900px' bg='white' mt='7' position='absolute' zIndex='2' borderRadius={10}>
        <Box py='3' px='5'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
            <FiSliders style={{fontWeight: 'bold', fontSize: '22px'}} />
             <Text fontWeight='semibold'>Filter</Text>
          </Box>
          <CloseIcon fontSize={14} />
          </Flex>
        </Box>
        <Divider />

        <Box py='3' px='5' mt='2' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>

        <Box py='3' px='5' mb='3'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text>Categories</Text>
            <AddIcon />
          </Flex>
        </Box>
      </Box>
    </>
  )
}


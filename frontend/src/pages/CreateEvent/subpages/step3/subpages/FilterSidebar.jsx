import { Box, Select, FormControl } from '@chakra-ui/react'
import React from 'react'

const FilterSidebar = () => {
  return (
    <Box>
      <FormControl>
        <Select placeholder='Filter' bg='#555555' fontSize='14px' color='white' w='130px' textAlign='center'>
          <option value=""></option>
        </Select>
      </FormControl>
    </Box>
  )
}

export default FilterSidebar

export const Filters = () => {
  return (
    <>
    </>
  )
}
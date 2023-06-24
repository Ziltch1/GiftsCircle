import React from 'react';
import {
  Box,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Search = ({ setSearchQuery, searchQuery, setFilter, filter }) => {
  return (
    <Box>
      <FormControl>
        <Flex justifyContent={'space-between'}>
          <InputGroup w="78%">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="#8C8C8C" />}
            />
            <Input
              type="text"
              onChange={e => setSearchQuery(e.target.value)}
              value={searchQuery}
              outline="none"
              placeholder="Search anything in events"
              bg="white"
              border="none"
              fontSize={13}
              color="#8C8C8C"
              letterSpacing={0.5}
            />
          </InputGroup>

          {/* <Box w='20%'>
            <DropdownList
              value={filter}
              defaultValue={"Filter"}
              onChange={value => setFilter(value)}
              // style={{ width: '15%' }}
              // placeholder='Filter'
              // defaultValue="Filter"
              data={["Birthday", "Naming", "Retirement", "Graduation", "Induction", "Wedding", "Funeral"]}
            />
          </Box> */}

          <Select
            variant={'flushed'}
            bg="#555555"
            w="17%"
            borderRadius="5px"
            onChange={e => setFilter(e.target.value)}
            value={filter}
            color="white"
            textAlign="center"
            border="none"
            outline="none"
            placeholder="Filter"
            gap="8px"
          >
            <option value="Birthday" style={{ color: 'black' }}>
              Birthday
            </option>
            <option value="Naming Ceremony" style={{ color: 'black' }}>
              Naming Ceremony
            </option>
            <option value="Retirement Ceremony" style={{ color: 'black' }}>
              Retirement Ceremony
            </option>
            <option value="Graduation" style={{ color: 'black' }}>
              Graduation Ceremony
            </option>
            <option value="Induction" style={{ color: 'black' }}>
              Induction Ceremony
            </option>
            <option value="Wedding" style={{ color: 'black' }}>
              Wedding Ceremony
            </option>
            <option value="Funeral" style={{ color: 'black' }}>
              Funeral Ceremony
            </option>
          </Select>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Search;

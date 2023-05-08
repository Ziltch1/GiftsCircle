import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
  Box,
  FormLabel,
  Input,
  Button,
  FormControl,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import AsoebiMarket from './AsoebiMarket';
import Cart from './Cart';
import BackButton from '../../../../../components/Buttons/BackButton';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../../redux/store';
import { GetEventAsoebis } from '../../../../../redux/features/events/service';
import DesignViewModal from './DesignViewModal';

export const AsoebiContext = createContext(null);

const Index = ({ setShowProducts }) => {
  const {  eventAsoebis } = useSelector(state => state.event);
  const [AsoebiItems, setAsoebiItems] = useState([]);
  const [addedAsoebiItems, setAddedAsoebiItems] = useState([]);
  const [data, setData] = useState([...AsoebiItems, ...eventAsoebis]);
  const [amount, setAmount] = useState(0);
  const [addForGuest, setAddforGuest] = useState(false);
  const [designModal, setDesignModal] = useState(false);

  const contextValue = useMemo(
    () => ({
      data: [...AsoebiItems, ...eventAsoebis],
      AsoebiItems,
      addedAsoebiItems,
      amount,
      addForGuest,
    }),
    [AsoebiItems, addedAsoebiItems, amount, eventAsoebis, addForGuest]
  );

  const [eventId, setEventId] = useState('');
  const [showAsoebi, setShowAsoebi] = useState(false);
  const toast = useToast();


  const handleClick = () => {
    if (eventId !== '') {
      dispatch(GetEventAsoebis(eventId));
      setDesignModal(true);
    } else {
      toast({
        title: 'Error',
        description: 'Please enter the event id',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      {!showAsoebi ? (
        <Box w={{ base: '350px', md: '500px', lg: '500px' }} mx="auto" h="auto">
          <BackButton action={() => setShowProducts(false)} />
          <DesignViewModal
            setShowModal={setDesignModal}
            setAddForGuest={setAddforGuest}
            setShowAsoebi={setShowAsoebi}
            modalOpen={designModal}
          />
          <Heading
            textAlign="center"
            my="8"
            fontWeight="medium"
            fontSize={25}
            textTransform="capitalize"
          >
            Add Asoebi to event
          </Heading>

          <FormControl>
            <Box mb="5">
              <FormLabel>Enter Event Id</FormLabel>
              <Input
                placeholder="Please enter the event id"
                bg="#F4F4F4"
                fontSize={14}
                _placeholder={{ color: '#A8A8A8' }}
                value={eventId}
                onChange={e => setEventId(e.target.value)}
              />
            </Box>

            <Text fontSize={14} mb="5" fontWeight="medium">
              By clicking "Add Asoebi", you agree to our Terms of Services and
              Privacy Statement
            </Text>
            <Box textAlign="center">
              <Button
                w="100%"
                bg="#00BFB2"
                fontWeight="medium"
                fontSize={14}
                color="white"
                onClick={() => handleClick()}
              >
                Proceed to marketplace
              </Button>
            </Box>
          </FormControl>
        </Box>
      ) : (
        <AsoebiContext.Provider
          value={{
            ...contextValue,
            setAddedAsoebiItems,
            setAsoebiItems,
            setData,
            setAmount,
          }}
        >
          <>
            <AsoebiMarket setShowProducts={setShowProducts} eventId={eventId} />
          </>
        </AsoebiContext.Provider>
      )}
    </>
  );
};

export default Index;

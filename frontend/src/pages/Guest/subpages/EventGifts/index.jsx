import React, { useState, createContext, useMemo, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ComplimentaryModal from './subpages/ComplimentaryModal';
import GiftListDrawer from './subpages/GiftListDrawer';
import DisplayCard from '../../../../components/Card';
import ContributionModal from './subpages/ContributionModal';
import { Zones } from '../../../../Utils/data/ZONES';
import Checkout from './Checkout';
import Prompt from './subpages/Prompt';


export const CartContext = createContext(null);

const Index = ({setShowCheckout, setGiftDetails, setCheckContribution, checkContribution}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [contributionModal, setContributionModal] = useState(false);
  const [data, setData] = useState([]);
  const { eventGifts, eventDeliveryDetails } = useSelector(
    state => state.event
  );
  const { giftItems, complimentaryGifts } = useSelector(state => state.gift);
  const [GiftItems, setGiftItems] = useState([]);
  const [ComplimentaryItems, setComplimentaryItems] = useState([]);
  const [addedGiftItems, setAddedGiftItems] = useState([]);
  const [addedComplimentaryGiftItems, setAddedComplimentaryGiftItems] =
    useState([]);
  const [amount, setAmount] = useState(0);
  const [giftAmount, setGiftAmount] = useState(0);
  const [complimentaryGiftAmount, setComplimentaryGiftAmount] = useState(0);
  const [contributionAmount, setContributionAmount] = useState(0);
  const [deliveryPercent, setDeliveryPercent] = useState(0);
  const [currentItem, setCurrentItem] = useState(null);
  const [position, setPosition] = useState(0);
  const [contributionGifts, setContributionGifts] = useState([]);
  const [fullPaymentGifts, setFullPaymentGifts] = useState([]);
  const [fullPaymentGift, setFullPaymentGift] = useState([]);
  const [contributionGift, setContributionGift] = useState([])
  const [showPrompt, setShowPrompt] = useState(false);

  const addGift = id => {
    let newItem = eventGifts.find(x => x.giftItemId === id);
    let itemData = giftItems.find(x => x.id === id);
    if (itemData.amount > 20000) {
      setContributionModal(true);
      setCurrentItem(newItem);
    } else {
      if (!addedGiftItems.includes(newItem.id)) {
        setGiftItems([...GiftItems, newItem]);
        setAddedGiftItems([...addedGiftItems, newItem.id]);
      }
    }
  };


  useEffect(() => {
    const newGift = giftItems.filter(x => x?.amount < 20000);
    setFullPaymentGifts(newGift);
  }, [eventGifts]);

  useEffect(() => {
    const newGift = giftItems.filter(x => x?.amount > 20000);
    setContributionGifts(newGift);
  }, [eventGifts]);

  const contextValue = useMemo(
    () => ({
      data: [...eventGifts],
      GiftItems,
      ComplimentaryItems,
      addedGiftItems,
      addedComplimentaryGiftItems,
      giftItems,
      complimentaryGifts,
      amount,
      giftAmount,
      complimentaryGiftAmount,
      contributionAmount,
      currentItem,
      deliveryPercent,
    }),
    [
      eventGifts,
      GiftItems,
      ComplimentaryItems,
      addedGiftItems,
      addedComplimentaryGiftItems,
      giftItems,
      complimentaryGifts,
      amount,
      giftAmount,
      complimentaryGiftAmount,
      contributionAmount,
      currentItem,
      deliveryPercent,
    ]
  );

  useEffect(() => {
    if (eventDeliveryDetails) {
      Object.keys(Zones).forEach(val => {
        const states = Object.keys(Zones[val]);
        if (states.includes(eventDeliveryDetails.state)) {
          const percent = Zones[val][eventDeliveryDetails.state];
          setDeliveryPercent(percent);
        }
      });
    }
  }, [eventDeliveryDetails]);

  useEffect(() => {
    const filterGift = fullPaymentGifts?.filter(x => eventGifts.map((item) => item.giftItemId).includes(x.id))
    setFullPaymentGift(filterGift)
  }, [fullPaymentGifts])

  useEffect(() => {
    const filterGift = contributionGifts?.filter(x => eventGifts.map((item) => item.giftItemId).includes(x.id))
    setContributionGift(filterGift)
  }, [contributionGifts])

  return (
    <Box>
      <CartContext.Provider
        value={{
          ...contextValue,
          setAddedComplimentaryGiftItems,
          setAddedGiftItems,
          setAmount,
          setData,
          setComplimentaryItems,
          setGiftItems,
          setGiftAmount,
          setContributionAmount,
          setComplimentaryGiftAmount,
          setCurrentItem,
          setShowPrompt,
          setShowCheckout,
          setCheckContribution, showPrompt
        }}
      >
        <>
          {showPrompt && <Prompt setShowPrompt={setShowPrompt} setShowListDrawer={setShowListDrawer} setOpenDrawer={setOpenDrawer} />}
          <ContributionModal
            setOpenModal={setContributionModal}
            isOpen={contributionModal}
            // setShowPrompt={setShowPrompt}
          />
          <ComplimentaryModal setOpenDrawer={setOpenDrawer} isOpen={openDrawer} />
          <GiftListDrawer
            setShowListDrawer={setShowListDrawer}
            isOpen={showListDrawer}
            checkContribution={checkContribution}
          />

          <GiftHeader
            setOpenDrawer={setOpenDrawer}
            setShowListDrawer={setShowListDrawer}
            position={position} 
            setPosition={setPosition}
          />

          <Box>
            {position === 0 && (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {fullPaymentGift.map(item => {
                  const giftItem = eventGifts.find(x => x.giftItemId === item.id);
                  return (
                    <DisplayCard
                      id={item?.id}
                      data={item}
                      action={addGift}
                      disabled={
                        addedGiftItems.includes(giftItem?.id) ||
                        giftItem.amountPaid >= item?.amount * giftItem?.quantity
                      }
                      purchased={giftItem?.amountPaid >= item?.amount * giftItem?.quantity}
                      text={'Purchase'}
                    />
                  );
                })}
              </Flex>
            )}
           
            {position === 1 && (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {contributionGift.map(item => {
                  const giftItem = eventGifts.find(x => x.giftItemId === item.id);
                  return (
                    <DisplayCard
                      id={item?.id}
                      data={item}
                      action={addGift}
                      disabled={
                        addedGiftItems.includes(giftItem?.id) ||
                        giftItem.amountPaid >= item?.amount * giftItem?.quantity
                      }
                      purchased={giftItem?.amountPaid >= item?.amount * giftItem?.quantity}
                      text={'Purchase'}
                      contribute={giftItem.enableContribution}
                      amountPaid={giftItem.amountPaid}
                    />
                  );
                })}
              </Flex>
            )}
          </Box>
          
        </>
      </CartContext.Provider>
    </Box>
  );
};

export default Index;

import React, { useState, createContext, useMemo, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ComplimentaryModal from './subpages/ComplimentaryModal';
import GiftListDrawer from './subpages/GiftListDrawer';
import DisplayCard from '../../../../components/Card';
import ContributionModal from './subpages/ContributionModal';
import { Zones } from '../../../../Utils/data/ZONES';
import Prompt from './subpages/Prompt';

export const CartContext = createContext(null);

const Index = ({
  setShowCheckout,
  setGiftDetails,
  setCheckContribution,
  checkContribution,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [contributionModal, setContributionModal] = useState(false);
  const [data, setData] = useState([]);
  const { eventDeliveryDetails, eventGifts } = useSelector(
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
  const [contributionGift, setContributionGift] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isComplimentary, setIsComplimentary] = useState(false);

  const addGift = id => {
    let newItem = eventGifts.find(x => x.giftitemId === id);
    setIsComplimentary(false);
    if (newItem.enableContribution === true) {
      setContributionModal(true);
      setCurrentItem(newItem);
    } else {
      setShowPrompt(true);
      if (!addedGiftItems.includes(newItem.id)) {
        setGiftItems([...GiftItems, newItem]);
        setAddedGiftItems([...addedGiftItems, newItem.id]);
      }
    }
  };

  useEffect(() => {
    const newGift = eventGifts.filter(x => x?.enableContribution === false);
    setFullPaymentGifts(newGift);
  }, [eventGifts]);

  useEffect(() => {
    const newGift = eventGifts?.filter(x => x?.enableContribution === true);
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
    const filterGift = giftItems?.filter(x =>
      fullPaymentGifts.map(item => item.giftitemId).includes(x.id)
    );
    setFullPaymentGift(filterGift);
  }, [fullPaymentGifts]);

  useEffect(() => {
    const filterGift = giftItems?.filter(x =>
      contributionGifts.map(item => item.giftitemId).includes(x.id)
    );
    setContributionGift(filterGift);
  }, [contributionGifts]);

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
          setCheckContribution,
          showPrompt,
          isComplimentary,
          setIsComplimentary,
        }}
      >
        <>
          {showPrompt && (
            <Prompt
              setShowPrompt={setShowPrompt}
              setShowListDrawer={setShowListDrawer}
              setOpenDrawer={setOpenDrawer}
              openDrawer={openDrawer}
              isComplimentary={isComplimentary}
              contributionModal={contributionModal}
            />
          )}
          <ContributionModal
            setOpenModal={setContributionModal}
            isOpen={contributionModal}
            setCheckContribution={setCheckContribution}
            // setShowPrompt={setShowPrompt}
          />
          <ComplimentaryModal
            setOpenDrawer={setOpenDrawer}
            isOpen={openDrawer}
          />
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
                minH="400px"
              >
                {fullPaymentGift.map(item => {
                  const giftItem = eventGifts?.find(
                    x => x.giftitemId === item.id
                  );
                  return (
                    <DisplayCard
                      id={item?.id}
                      data={item}
                      action={addGift}
                      disabled={
                        addedGiftItems.includes(giftItem?.id) ||
                        giftItem?.amountPaid >=
                          item?.amount * giftItem?.quantity
                      }
                      purchased={
                        giftItem?.amountPaid >=
                        item?.amount * giftItem?.quantity
                      }
                      text={'Purchase'}
                      showPrompt={showPrompt}
                      setShowPrompt={setShowPrompt}
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
                minH="400px"
              >
                {contributionGift.map(item => {
                  const giftItem = eventGifts?.find(
                    x => x.giftitemId === item.id
                  );
                  return (
                    <DisplayCard
                      id={item?.id}
                      data={item}
                      action={addGift}
                      disabled={
                        addedGiftItems.includes(giftItem?.id) ||
                        giftItem.amountPaid >= item?.amount * giftItem?.quantity
                      }
                      purchased={
                        giftItem?.amountPaid >=
                        item?.amount * giftItem?.quantity
                      }
                      text={'Purchase'}
                      contribute={giftItem?.enableContribution}
                      amountPaid={giftItem?.amountPaid}
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

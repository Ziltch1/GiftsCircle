import { Box, Text, Image, Heading, Button, Flex } from '@chakra-ui/react';
import React, {useState} from 'react';
import WithdrawalDrawer from './WithdrawalDrawer';

const FundraisingCard = ({ openModal, setOpenModal, fundRaising }) => {

  const [openDrawer, setOpenDrawer] = useState(false)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  const percentagePaid = (fundRaising?.amountPaid * 100) / fundRaising?.amount;
  const StopFundraising = () => {
    if(fundRaising.active === false){
      return
    }
    setOpenModal(true);
  };

  return (
    <Box bg="white" borderRadius={5} p="5" w="100%" mb="8">
      {openDrawer && <WithdrawalDrawer setOpenDrawer={setOpenDrawer} amount={fundRaising?.amountPaid} />}
      <Flex gap={4}>
        <Box w="180px" h="140px">
          <Image
            src={fundRaising?.image}
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius={5}
          />
        </Box>

        <Box w="800px">
          <Box mb="3">
            <Flex justifyContent="space-between">
              <Box w="440px">
                <Heading fontSize={18} fontWeight={500} mb="2">
                  {fundRaising?.title}
                </Heading>
                <Text fontSize={14}>{fundRaising?.description}</Text>
              </Box>
              <Box>
                <Text
                  color={fundRaising?.active ? "#237804" : '#000'}
                  bg={fundRaising?.active ? '#D9F7BE' : 'red.300'}
                  py="5px"
                  px="10px"
                  fontSize={13}
                  borderRadius="100px"
                >
                  {fundRaising?.active ? 'Active' : 'InActive'}
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Box>
                <Box w="450px">
                  <Box w="100%" bg="#EEEEEE" h="8px" borderRadius={5} mb="3">
                    <Box
                      w={`${percentagePaid}%`}
                      bg="#00BFB2"
                      h="8px"
                      borderRadius={5}
                    ></Box>
                  </Box>
                </Box>
                <Text fontSize={14}>
                  <strong>{formatter.format(fundRaising?.amountPaid)}</strong>{' '}
                  raised out of{' '}
                  <strong>{formatter.format(fundRaising?.amount)}</strong>
                </Text>
              </Box>
              <Box>
                {fundRaising?.active ?
                  <Button
                    bg="#00BFB2"
                    color="white"
                    fontWeight="normal"
                    fontSize={13}
                    onClick={() => StopFundraising()}
                  >
                    {/* {fundRaising?.active
                      ? 'Stop Fundraising'
                      : 'FundRaising Ended'} */}
                      Stop Fundraising
                  </Button>
                  :
                  <Button
                    bg="#00BFB2"
                    color="white"
                    fontWeight="normal"
                    fontSize={13}
                    onClick={() => setOpenDrawer(true)}
                  >
                    {/* {fundRaising?.active
                      ? 'Stop Fundraising'
                      : 'FundRaising Ended'} */}
                      Make withdrawal
                  </Button>
                }
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default FundraisingCard;

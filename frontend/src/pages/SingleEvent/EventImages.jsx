import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import copyIcon from '../../components/assets/copy.svg';
import facebook from '../../components/assets/facebook.svg';
import instagram from '../../components/assets/instagram.svg';
import whatsapp from '../../components/assets/whatsapp.svg';
import linkedin from '../../components/assets/linkedin.svg';
import twitter from '../../components/assets/twitter.svg';
import defaultImage from '../../components/assets/default-image.svg';
import { CheckIcon } from '@chakra-ui/icons';

const EventImages = ({ newEvent }) => {
  const image = newEvent.image;
  const imageUrl = image;
  const [copyElement, setCopyElement] = useState('');

  const HandleCopy = async (target, text) => {
    switch (target) {
      case 'EVENTID':
        setCopyElement('EVENTID');
        await navigator.clipboard.writeText(text);
        break;

      case 'COHOST_CODE':
        setCopyElement('COHOST_CODE');
        await navigator.clipboard.writeText(text);
        break;

      case 'COHOST_LINK':
        setCopyElement('COHOST_LINK');
        await navigator.clipboard.writeText(text);
        break;

      case 'GUEST_CODE':
        setCopyElement('GUEST_CODE');
        await navigator.clipboard.writeText(text);
        break;
      case 'GUEST_LINK':
        setCopyElement('GUEST_LINK');
        await navigator.clipboard.writeText(text);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Box mb="6" mt="5">
        <Flex justifyContent={'space-between'} alignItems="center">
          <Box
            bg="#EEEEEE"
            w="68%"
            h="474px"
            borderRadius={5}
            display="flex"
            alignItems={'center'}
            justifyContent="center"
            boxShadow={'md'}
          >
            {newEvent.image ? (
              <Image
                src={imageUrl}
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius={5}
              />
            ) : (
              <Image src={defaultImage} />
            )}
          </Box>

          <Box
            w="30%"
            h="474px"
            bg="#EEEEEE"
            borderRadius={5}
            p="6"
            boxShadow="md"
          >
            <Box mb="4">
              <Text fontSize={14} mb="1">
                Event ID
              </Text>
              <Flex justifyContent={'space-between'} alignItems="center">
                <Heading fontWeight={'medium'} fontSize="14">
                  {newEvent.id}
                </Heading>
                {copyElement === 'EVENTID' ? (
                  <CheckIcon onClick={() => setCopyElement('')} />
                ) : (
                  <Image
                    src={copyIcon}
                    w="20px"
                    h="20px"
                    onClick={() => HandleCopy('EVENTID', newEvent.id)}
                  />
                )}
              </Flex>
            </Box>

            <Box mb="4">
              <Text fontSize={14} mb="1">
                Co-host Code
              </Text>
              <Flex justifyContent={'space-between'} alignItems="center">
                <Heading fontWeight={'medium'} fontSize="14">
                  {newEvent.coHostCode}
                </Heading>
                {copyElement === 'COHOST_CODE' ? (
                  <CheckIcon onClick={() => setCopyElement('')} />
                ) : (
                  <Image
                    src={copyIcon}
                    w="20px"
                    h="20px"
                    onClick={() =>
                      HandleCopy('COHOST_CODE', newEvent.coHostCode)
                    }
                  />
                )}
              </Flex>
            </Box>

            <Box mb="4">
              <Text fontSize={14} mb="1">
                Co-host link
              </Text>
              <Flex justifyContent={'space-between'} alignItems="center">
                <Heading
                  fontWeight={'medium'}
                  fontSize="12"
                  w="220px"
                  lineHeight={5}
                >{`https://giftscircle.netlify.app/event/join/${newEvent.id}`}</Heading>
                {copyElement === 'COHOST_LINK' ? (
                  <CheckIcon onClick={() => setCopyElement('')} />
                ) : (
                  <Image
                    src={copyIcon}
                    w="20px"
                    h="20px"
                    onClick={() =>
                      HandleCopy(
                        'COHOST_LINK',
                        `https://giftscircle.netlify.app/event/join/${newEvent.id}`
                      )
                    }
                  />
                )}
              </Flex>
            </Box>

            <Box mb="4">
              <Text fontSize={14} mb="1">
                Event Guest Code
              </Text>
              <Flex justifyContent={'space-between'} alignItems="center">
                <Heading fontWeight={'medium'} fontSize="14">
                  {newEvent.guestCode}
                </Heading>
                {copyElement === 'GUEST_CODE' ? (
                  <CheckIcon onClick={() => setCopyElement('')} />
                ) : (
                  <Image
                    src={copyIcon}
                    w="20px"
                    h="20px"
                    onClick={() => HandleCopy('GUEST_CODE', newEvent.guestCode)}
                  />
                )}
              </Flex>
            </Box>

            <Box mb="4">
              <Text fontSize={14} mb="1">
                Event Guest link
              </Text>
              <Flex justifyContent={'space-between'} alignItems="center">
                <Heading
                  fontWeight={'medium'}
                  fontSize="12"
                  w="220px"
                  lineHeight={5}
                >{`https://giftscircle.netlify.app/event/join/${newEvent.id}`}</Heading>
                {copyElement === 'GUEST_LINK' ? (
                  <CheckIcon onClick={() => setCopyElement('')} />
                ) : (
                  <Image
                    src={copyIcon}
                    w="20px"
                    h="20px"
                    onClick={() =>
                      HandleCopy(
                        'GUEST_LINK',
                        `https://giftscircle.netlify.app/event/join/${newEvent.id}`
                      )
                    }
                  />
                )}
              </Flex>
            </Box>

            <Box mb="5" fontSize={14}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="medium">Share on: </Text>
                <Box>
                  <Flex gap={3}>
                    <Box>
                      <Image src={facebook} />
                    </Box>
                    <Box>
                      <Image src={twitter} />
                    </Box>
                    <Box>
                      <Image src={whatsapp} />
                    </Box>
                    <Box>
                      <Image src={instagram} />
                    </Box>
                    <Box>
                      <Image src={linkedin} />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Button
              bg="#00BFB2"
              color="white"
              w="100%"
              fontWeight="medium"
              fontSize="14px"
              boxShadow="md"
            >
              Edit Event
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default EventImages;

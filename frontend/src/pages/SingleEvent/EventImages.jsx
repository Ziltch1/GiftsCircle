import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Heading, Flex, Button } from '@chakra-ui/react';
import copyIcon from '../../components/assets/copy.svg';
import facebook from '../../components/assets/facebook.svg';
import instagram from '../../components/assets/instagram.svg';
import whatsapp from '../../components/assets/whatsapp.svg';
import linkedin from '../../components/assets/linkedin.svg';
import twitter from '../../components/assets/twitter.svg';
import defaultImage from '../../components/assets/default-image.svg';
import { CheckIcon } from '@chakra-ui/icons';
import { dispatch } from '../../redux/store';
import { setEditEvent } from '../../redux/features/events/eventSlice';
import { useNavigate } from 'react-router-dom';

const EventImages = ({ newEvent, eventGuests }) => {
  const navigate = useNavigate();
  const image = newEvent.image;
  const imageUrl = image;
  const [copyElement, setCopyElement] = useState('');

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (eventGuests) {
      if (eventGuests.length < 1) {
        setShowEdit(true);
      } else {
        setShowEdit(false);
      }
    }
  }, [eventGuests]);

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
        <Flex justifyContent="space-between" alignItems="center">
          <Box
            bg="#EEEEEE"
            w={newEvent.published ? '68%' : '100%'}
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
                objectFit="contain"
                borderRadius={5}
              />
            ) : (
              <Image src={defaultImage} />
            )}
          </Box>

          {newEvent.published && (
            <Box
              w="30%"
              h="474px"
              bg="#EEEEEE"
              borderRadius={5}
              py="5"
              px="6"
              boxShadow="md"
              display="flex"
              flexDirection="column"
              gap={showEdit ? '16px' : '25px'}
            >
              <Box>
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

              {newEvent.coHostCode !== '' && (
                <Box>
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
              )}

              {newEvent.coHostCode !== '' && (
                <Box>
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
              )}

              <Box>
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
                      onClick={() =>
                        HandleCopy('GUEST_CODE', newEvent.guestCode)
                      }
                    />
                  )}
                </Flex>
              </Box>

              <Box>
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

              <Box fontSize={14}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight="medium" fontSize={13}>
                    Share on:{' '}
                  </Text>

                  <Flex>

                    <ShareOnTwitter 
                      title={newEvent.title} 
                      icon={twitter} 
                      link={`https://giftscircle.netlify.app/dashboard/event_details/${newEvent.id}`} 
                      details='Follow this link to jon my event'
                    />

                    <ShareOnWhatsApp 
                      title={newEvent.title} 
                      icon={whatsapp}
                      link={`https://giftscircle.netlify.app/dashboard/event_details/${newEvent.id}`}
                      details='Follow this link to jon my event'
                    />

                    <ShareOnInstagram 
                      title={newEvent.title}
                      icon={instagram}
                      link={`https://giftscircle.netlify.app/dashboard/event_details/${newEvent.id}`}
                      details='Follow this link to jon my event'
                    />

                    <ShareOnFacebook
                      title={newEvent.title}
                      icon={facebook}
                      link={`https://giftscircle.netlify.app/dashboard/event_details/${newEvent.id}`}
                      details='Follow this link to jon my event'
                    />

                    <ShareOnLinkedIn
                      title={newEvent.title}
                      icon={linkedin}
                      link={`https://giftscircle.netlify.app/dashboard/event_details/${newEvent.id}`}
                      details='Follow this link to jon my event'
                    />
                    
                  </Flex>
                </Flex>
              </Box>

              {showEdit ? (
                <Button
                  width="100%"
                  fontSize={16}
                  bg="#00BFB2"
                  color="#FAFAFA"
                  borderRadius={5}
                  p="5"
                  onClick={() => {
                    dispatch(setEditEvent(true));
                    navigate('/create_event');
                  }}
                >
                  Edit Event
                </Button>
              ) : (
                <></>
              )}
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default EventImages;


export const ShareOnTwitter = ({ title, link, details, icon }) => {
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `
      ${title} 
      ${details}\n${link}
    `
  )}`;
  return (
    <Button onClick={() => window.open(shareUrl, '_blank')} bg='none' p='0'>
      <Image src={icon} />
    </Button>
  );
};


export const ShareOnWhatsApp = ({ title, link, details, icon }) => {
  const shareUrl = `https://api.whatsapp.com/send?text=${title}: ${details}\n${link}`;

  return (
    <Button onClick={() => window.open(shareUrl, '_blank')} bg='none' p='0'>
      <Image src={icon} />
    </Button>
  );
};

export const ShareOnInstagram = ({ title, link, details, icon }) => {
  const shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(
    `
      ${link}\n\n${title}\n\n${details}
    `
  )}`;
  return (
    <Button onClick={() => window.open(shareUrl, '_blank')} bg='none' p='0'>
      <Image src={icon} />
    </Button>
  );
};


export const ShareOnFacebook = ({ title, link, details, icon }) => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    link
  )}&quote=${encodeURIComponent(`${title}: ${details}`)}`;

  return (
    <Button onClick={() => window.open(shareUrl, '_blank')} bg='none' p='0'>
      <Image src={icon} />
    </Button>
  );
};


export const ShareOnLinkedIn = ({ title, link, details, icon }) => {
  const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    link
  )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
    details
  )}&source=${encodeURIComponent(window.location.href)}`;

  return (
    <Button onClick={() => window.open(shareUrl, '_blank')} bg='none' p='0'>
      <Image src={icon} />
    </Button>
  );
};









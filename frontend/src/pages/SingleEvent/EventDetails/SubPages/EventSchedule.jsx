import React from 'react'
import {Box, Text, Heading, Button, Flex, Image} from '@chakra-ui/react'
import clock from '../../../../components/assets/clock.svg'
import location from '../../../../components/assets/map-pin.svg'

const EventSchedule = () => {
  return (
    <Box mb='6'>
        <Flex justifyContent='space-between' alignItems='flex-start'>
            <Box w='610px'>
                <Heading fontWeight={500} fontSize='24px' mb='4'>Wedding of Adejumo Adedayo and Peace Adepeju</Heading>
                <Text fontSize={14} lineHeight='27px' mb='4'>
                      Become a pro copywriter in 4 weeks. <br />

                      The NYC School of Copywriting is the only copy and content writing masterclass designed to teach writers, marketers, small business owners, startup founders and anyone else wanting to pick up one of the most invaluable and sought out skills in the modern workplace. <br />

                      This course focuses on the craft of conversational copywriting—writing in a human voice that’s non-salesy, jargon and buzzword free and ultimately styled to create and maintain authentic connections with readers and customers. <br />

                      Organized and led by Corey Rosenberg, one of the most successful marketing copywriters in Silicon Valley, the course is broken out into 4 90 minute classes: <br />

                      Class #1: Introduction to copywriting
                      Class #2: Brands, brand voice and the digital marketing ecosystem
                      Class #3: Writing websites and emails
                      Class #4: Writing for social and video scripts <br />

                      By the end of our course, you’ll be a bona fide copywriter, fully equipped with the skill needed to launch like-able brands, write sales and marketing assets for every marketing channel, grow your business and quadruple your sales. <br />

                      This course costs $1,000.00 per attendee.
                </Text>

                <Box w='610px' bg='#EEEEEE' h='270px' borderRadius={10} mb='7'>

                </Box>

                <Text fontSize={14} lineHeight='27px'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et ut sodales semper consectetur sem. Commodo tristique eu ultrices eleifend commodo amet id. In orci, odio in eget viverra fermentum arcu. Lacus ultrices enim amet consequat dolor.
                      Nibh nisl vel at morbi massa aliquet. Vitae porttitor felis feugiat turpis. Ut risus tortor, erat semper augue vel sit nisl, commodo. Sit sed urna mi, purus. Dui amet praesent et non morbi tincidunt tincidunt integer commodo. Eget turpis platea vitae tempor eget.
                </Text>
            </Box>

            <Box w='295px' h='auto'>
                <Button w='100%' mb='4' fontWeight={550} bg='#EEEEEE' fontSize={14}>Start a fund raising</Button>
                <Box fontSize={14} mb='5' bg='#EEEEEE' borderRadius={5} p='5'>
                    <Image src={clock} mb='2' />
                    <Text>Mon, October 31, 2022</Text>
                    <Text>7:00 PM – 10:00 PM WAT</Text>
                </Box>

                <Box fontSize={14} mb='5' bg='#EEEEEE' borderRadius={5} p='5'>
                    <Image src={location} mb='2' />
                    <Text lineHeight='25px' fontSize='14px'>Thursday, October 20, 2022 at 10:30 PM to Friday, October 21, 2022 at 12:30 AM WAST</Text>
                </Box>
            </Box>
        </Flex>
    </Box>
  )
}

export default EventSchedule
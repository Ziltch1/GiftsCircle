import React, {useState, useEffect, useDebugValue} from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { GetEventApi } from '../../redux/axios/apis/events';
import { GetFundraisingApi } from '../../redux/axios/apis/fundraising';
import { GetEventAsoebis } from '../../redux/features/events/service';
import { GetAddedAsoebiItemsApi } from '../../redux/axios/apis/asoebi';


const Tabs = ({navPosition, setNavPosition, event}) => {

    const links = ['About event', 'Gift List', 'Media', 'Asoebi'];
    const [fundraising, setFundraising] = useState(false)
    const [asoebi, setAsoebi] = useState(false)
    const {eventAsoebis} = useSelector(state => state.event)

    const checkFundraising = async() => {
        try {
            const checkFundraising = await GetFundraisingApi(event.id);
            if (checkFundraising.data) {
                setFundraising(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        checkFundraising()
    }, [])

    useEffect(() => {
        if(eventAsoebis.length > 0){
            setAsoebi(true)
        }
        
    }, [eventAsoebis])

    const handleClick = (index) => {
        setNavPosition(index);
    }

    if (fundraising) {
        links.push('Fundraising');
    }else if(asoebi){
        links.push('Asoebi')
    }

    return (
        <Box>
            <Box borderBottom='1.5px solid lightgrey' w='100%' mb='7'>
                <Flex gap={8} fontSize='14px'>
                    {links.map((link, index) => <Button key={index} onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2', fontWeight: 'bold' } : { color: '#717171'}} bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>{link}</Button>)}
                </Flex>
            </Box>
        </Box>
    )
}

export default Tabs
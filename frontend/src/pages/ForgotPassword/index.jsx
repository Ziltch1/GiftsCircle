import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  Button, useToast
} from '@chakra-ui/react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/event-circle.svg';
import { SendResetPasswordLink } from '../../redux/axios/apis/auth';
import ErrorHandler from '../../redux/axios/Utils/ErrorHandler';
import AlertBox from '../../components/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [emailTest, setEmailTest] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const EmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (EmailRegex.test(email)) {
      setEmailTest(true);
    } else {
      setEmailTest(false);
    }
  }, [email]);

  const handleSubmit = async () => {
    if (emailTest) {
      localStorage.setItem('forgotUser', email);
      const formBody = { email };
      try {
        await SendResetPasswordLink(formBody);
        navigate('/forgot_password_mail');
      } catch (e) {
        console.log(e);
        setError(ErrorHandler(e));
      }
    }else{
      toast({
        title: 'Error!',
        description: "Please fill all fields",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }
  };

  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h={error ? "520px": "467px"}
      w={['350px','559px']}
      direction="column"
      gap="30px"
      zIndex="99"
    >
      <Box bgColor="#0F172A" h="104.25px" p="30px 60px">
        <Flex justifyContent="center">
          <Box>
            <img src={Logo} alt="logo" />
          </Box>
        </Flex>
      </Box>

      <Box px={[5, 20]}>
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="10px" width={['330px', '373px']}>
            <Text
              fontSize={[25, 30]}
              color="#000000"
              letterSpacing="-0.02em"
              lineHeight="40px"
              fontWeight="500"
            >
              Forgot password?
            </Text>

            <Text
              fontSize="14px"
              color="#383838"
              lineHeight="22px"
              fontWeight="500"
            >
              Enter the email address you used to register with.
            </Text>
          </Flex>
          <Flex direction="column" gap="20px">
            {error && <AlertBox message={error.message} setError={setError} />}
            <FormControl gap="6px">
              <FormLabel
                fontSize="14px"
                color="#12141D"
                lineHeight="22px"
                fontWeight="500"
              >
                Enter email address
              </FormLabel>
              <Input
                borderRadius="10px"
                bgColor="#F4F4F4"
                h="46px"
                p="12px"
                gap="10px"
                type="email"
                name="email"
                fontSize="14px"
                lineHeight="22px"
                fontWeight="400"
                color="#A8A8A8"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g dayo.abdullahi@gmail.com"
                _placeholder={{
                  color: '#A8A8A8',
                  opacity: 0.4,
                  fontSize: '14px',
                }}
              />
            </FormControl>
          </Flex>
          <Flex justifyContent="right">
            <Text
              fontSize="14px"
              color="#0C4C84"
              lineHeight="22px"
              fontWeight="600"
            >
              <Link to="/signin">Back to sign in?</Link>
            </Text>
          </Flex>

          <Button
            boxShadow="0px 8px 30px rgba(0, 191, 178, 0.1)"
            bgColor="#00BFB2"
            borderRadius="5px"
            gap="10px"
            h="50px"
            p="14px 28px"
            fontSize="14px"
            color="#FFFFFF"
            lineHeight="22px"
            fontWeight="500"
            _hover={{ bgColor: '55D4CC' }}
            onClick={() => handleSubmit()}
          >
            Send Reset Link <HiOutlineArrowNarrowRight />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ForgotPassword;

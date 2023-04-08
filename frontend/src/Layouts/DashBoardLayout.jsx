import React, {useEffect} from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header/Header';
import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import Response from '../components/ResponseToast';
import Navbar from '../components/Navbar/Navbar'

const DashboardLayout = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token, navigate]);

  return (
    <>
      {token && (
        <Box>
          <Response />
          <Header />
          <Navbar />
          <Outlet />
        </Box>
      )}
    </>
  );
};

export default DashboardLayout;

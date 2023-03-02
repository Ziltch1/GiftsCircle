import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import Response from '../components/ResponseToast';

const DashboardLayout = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

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
          <Outlet />
        </Box>
      )}
    </>
  );
};

export default DashboardLayout;

import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import Response from '../components/ResponseToast';
import Navbar from '../components/Navbar/Navbar';
import Gifts from '../pages/Gift'
import Marketplace from '../pages/Marketplace'

const DashboardLayout = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [navPosition, setNavPosition] = useState(0)

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
          <Navbar navPosition={navPosition} setNavPosition={setNavPosition} />
          {navPosition === 0 && <Outlet />}
          {navPosition === 1 && <Gifts />}
          {navPosition === 2 && <Marketplace />}
        </Box>
      )}
    </>
  );
};

export default DashboardLayout;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box, Select, MenuItem } from '@mui/material';

function Header() {
  const router = useRouter();
  const theme = useTheme();

  const [dropdownValue, setDropdownValue] = useState('order');

  useEffect(() => {
    if (router.pathname === '/orders') {
      setDropdownValue('orders');
    } else {
      setDropdownValue('order');
    }
  }, [router.pathname]);

  const handleChange = (event) => {
    const value = event.target.value;
    setDropdownValue(value);

    if (value === 'order' && router.pathname !== '/') {
      router.push('/');
    } else if (value === 'orders' && router.pathname !== '/orders') {
      router.push('/orders');
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: theme.palette.text.secondary }}
    >
      <Toolbar>
        <Typography
          onClick={handleLogoClick}
          value="order"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
        >
          Mesh-Retail
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <Select
            value={dropdownValue}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            style={{ color: '#fff' }}
          >
            <MenuItem value="order">Order</MenuItem>
            <MenuItem value="orders">Orders</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

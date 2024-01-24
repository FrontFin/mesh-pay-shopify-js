import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  BottomNavigation,
} from '@mui/material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';
import CheckoutFlow from '../components/CheckoutFlow';
const IndexPage = () => {
  const theme = useTheme();

  const [activeTab, setActiveTab] = React.useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProductDetails(data);
    };
    getProductDetails();
  }, []);

  const toggleCheckoutModal = () => {
    setIsCheckoutModalOpen(!isCheckoutModalOpen);
  };

  const handleBuyNow = () => {
    toggleCheckoutModal(); // Open the CheckoutModal
  };

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Function to handle buy now action

  return (
    <Box
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <AppBar position="static">
        <Header />
      </AppBar>
      <Box style={{ flex: 1, overflow: 'auto', padding: theme.spacing(2) }}>
        <Grid container spacing={2} style={{ display: 'flex', flexGrow: 1 }}>
          <Grid item xs={12} md={6} style={{ display: 'flex' }}>
            <Paper
              style={{
                padding: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flexGrow: 1, // Added to make the Paper fill the flex container height
              }}
            >
              <img
                src="https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Speedster Toy Car"
                style={{ width: '100%', height: 'auto' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex' }}>
            <Paper
              style={{
                padding: theme.spacing(2),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1, // Ensures Paper fills the flex container height
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  style={{ marginBottom: theme.spacing(2) }}
                >
                  {productDetails?.product?.title}
                </Typography>
                <Typography
                  component="div"
                  variant="body1"
                  style={{ color: theme.palette.text.secondary }}
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.product.body_html,
                  }}
                />
                <Typography
                  variant="subtitle1"
                  style={{
                    marginTop: theme.spacing(2),
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  Amount: {productDetails?.product?.variants[0]?.price}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: theme.spacing(2) }}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <CheckoutFlow
                open={isCheckoutModalOpen}
                handleClose={toggleCheckoutModal}
                productDetails={productDetails}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <BottomNavigation
        style={{
          backgroundColor: theme.palette.text.secondary,
          color: theme.palette.primary.contrastText,
          marginTop: theme.spacing(2),
        }}
      ></BottomNavigation>
    </Box>
  );
};

export default IndexPage;

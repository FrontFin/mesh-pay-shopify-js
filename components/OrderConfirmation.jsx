import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const OrderConfirmation = ({ orderDetails, closeModal }) => {
  const { order } = orderDetails;
  const router = useRouter();

  useEffect(() => {
    closeModal();
  }, [closeModal]);

  const routeToOrders = () => {
    router.push('/orders');
  };
  return (
    <Paper
      sx={{
        padding: 3,

        margin: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        Order Confirmation
      </Typography>

      <Box sx={{ marginBottom: 2, paddingLeft: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: 1 }}>
          Order ID: {order?.id}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: 1 }}>
          Date: {format(new Date(order?.created_at), 'PPP')}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: 1 }}>
          Status: {order?.financial_status}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: 1 }}>
          Amount: ${order?.total_price}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#555', marginBottom: 1 }}>
          Item: {order?.line_items[0].name}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={routeToOrders}>
          View Orders
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderConfirmation;

OrderConfirmation.propTypes = {
  orderDetails: PropTypes.shape({
    order: PropTypes.shape({
      id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      financial_status: PropTypes.string.isRequired,
      total_price: PropTypes.string.isRequired,
      line_items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  handlePayment: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

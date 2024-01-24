import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

const CheckoutPreview = ({ formData, onEdit, onConfirm, loading }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Placing your order to Shopify...</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>
        Order Preview
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1">
          Quantity: {formData.quantity}
        </Typography>
        <Typography variant="subtitle1">Size: {formData.size}</Typography>
        <Typography variant="subtitle1">Color: {formData.color}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={onConfirm}>
          Confirm Order
        </Button>
      </Box>
    </Paper>
  );
};

CheckoutPreview.propTypes = {
  formData: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CheckoutPreview;

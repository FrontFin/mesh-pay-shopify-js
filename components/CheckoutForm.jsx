import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const CheckoutForm = ({ onSubmit }) => {
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  const availableSizes = ['Small', 'Medium', 'Large'];
  const availableColors = ['Red', 'Green', 'Blue'];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ quantity, size, color });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="quantity"
        label="Quantity"
        name="quantity"
        autoComplete="quantity"
        autoFocus
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        InputProps={{ inputProps: { min: 1 } }} // Set the minimum quantity to 1
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="size-label">Size</InputLabel>
        <Select
          labelId="size-label"
          id="size"
          value={size}
          label="Size"
          onChange={(e) => setSize(e.target.value)}
        >
          {availableSizes.map((sizeOption) => (
            <MenuItem key={sizeOption} value={sizeOption}>
              {sizeOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="color-label">Color</InputLabel>
        <Select
          labelId="color-label"
          id="color"
          value={color}
          label="Color"
          onChange={(e) => setColor(e.target.value)}
        >
          {availableColors.map((colorOption) => (
            <MenuItem key={colorOption} value={colorOption}>
              {colorOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
  onSubmit: PropTypes.func,
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
};

import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import CheckoutModal from './CheckoutFlow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CommerceModal({ open, handleClose, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Checkout
        </Typography>
        <CheckoutModal />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>

        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}

CommerceModal.propTypes = {
  open: PropTypes?.bool,
  handleClose: PropTypes?.func,
  children: PropTypes?.node,
};

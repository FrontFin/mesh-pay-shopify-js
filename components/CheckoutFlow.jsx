import React, { useState, useEffect } from 'react';
import CommerceModal from './CommerceModal';
import CheckoutForm from './CheckoutForm';
import CheckoutPreview from './CheckoutPreview';
import OrderConfirmation from './OrderConfirmation';
import { handleOpenMeshModal } from '../utils/meshUtils';
import MeshModal from './MeshModal';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';


const CheckoutFlow = ({ open, handleClose, productDetails }) => {
  const [currentStep, setCurrentStep] = useState('checkout');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openMeshModal, setOpenMeshModal] = useState(false);
  const [catalogLink, setCatalogLink] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (currentStep === 'payment') {
      handleOpenMeshModal(setCatalogLink, setOpenMeshModal);
    }
  }, [currentStep]);
  const nextStep = () => {
    // Logic to advance to the next step
  };

  const previousStep = () => {
    // Logic to go back to the previous step
  };

  const handleFormSubmit = (formData) => {
    setFormData(formData);
    // Then go to the next step
    handlePayment();
  };

  const transferFinished = async () => {
    try {
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!orderResponse.ok) {
        throw new Error(`HTTP error! status: ${orderResponse.status}`);
      }

      const response = await orderResponse.json();
      setOrderDetails(response);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Error confirming order:', error);
    } finally {
      setLoading(false);
      setCurrentStep('confirmation');
    }
  };

  const meshExit = () => {
    console.info('Checkout EXIT');
    setOpenMeshModal(false) && handleClose();
    console.log('router hit');
  };

  const confirmOrder = async () => {
    setLoading(true);
    setCurrentStep('preview');
  };

  const handlePayment = async () => {
    const amount = productDetails?.product?.variants[0]?.price;
    await handleOpenMeshModal(setCatalogLink, setOpenMeshModal, amount);
  };

  let ComponentToShow;
  switch (currentStep) {
    case 'checkout':
      ComponentToShow = (
        <CheckoutForm
          onNext={nextStep}
          onSubmit={handleFormSubmit}
          productDetails={productDetails}
        />
      );
      break;
    case 'preview':
      ComponentToShow = (
        <CheckoutPreview
          onNext={nextStep}
          onPrevious={previousStep}
          formData={formData}
          onConfirm={confirmOrder}
          loading={loading}
        />
      );
      break;
    case 'confirmation':
      ComponentToShow = (
        <OrderConfirmation
          orderDetails={orderDetails}
          setCurrentStep={setCurrentStep}
          closeModal={() => {
            setOpenMeshModal(false) && handleClose();
          }}
        />
      );
      break;

    default:
      ComponentToShow = <CheckoutForm onNext={nextStep} />;
  }

  return (
    <>
      <CommerceModal open={open} handleClose={handleClose}>
        {ComponentToShow}
      </CommerceModal>
      <MeshModal
        open={openMeshModal}
        handleClose={() => {
          setOpenMeshModal(false);
        }}
        link={catalogLink}
        transferFinished={transferFinished}
        meshExit={meshExit}
      />
    </>
  );
};

export default CheckoutFlow;

CheckoutFlow.propTypes = {
  onBuyNow: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  productDetails: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
        })
      ).isRequired,
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          price: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
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

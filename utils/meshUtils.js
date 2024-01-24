export const handleOpenMeshModal = async (
  setCatalogLink,
  setOpenMeshModal,
  amount = 10
) => {
  let url = `/api/transfers/linkToken?&amount=${amount}`;

  try {
    const link = await fetch(url);

    const response = await link.json();
    if (response) {
      setCatalogLink(response.content.linkToken);
      setOpenMeshModal(true);
    }
  } catch (error) {
    return `Something went wrong: ${error.message}`;
  }
};

// utils file
// export const handleExit = (error, setOpenModal) => {
//   console.log('Broker connection closed:', error);
//   setOpenModal(false);
// };

export const handleMeshSuccess = (newAuthData) => {
  localStorage.setItem('authData', JSON.stringify(newAuthData));
};

export const handleTransferFinished = (handleTransferFinished) => {
  console.log(handleTransferFinished);
};

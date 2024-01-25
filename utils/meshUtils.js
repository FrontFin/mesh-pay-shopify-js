export const handleOpenMeshModal = async (
  setCatalogLink,
  setOpenMeshModal,
  amount = 10,
  setLinkResponse,
) => {
  let url = `/api/transfers/linkToken?&amount=${amount}`;

  try {
    const link = await fetch(url);

    const response = await link.json();
    if (response) {
      setCatalogLink(response.getCatalogLink.content.linkToken);
      setLinkResponse(response.transferOptions)
      setOpenMeshModal(true);
      
    }
  } catch (error) {
    return `Something went wrong: ${error.message}`;
  }
};


export const handleMeshSuccess = (newAuthData) => {
  localStorage.setItem('authData', JSON.stringify(newAuthData));
};

export const handleTransferFinished = (handleTransferFinished) => {
  console.log(handleTransferFinished);
};

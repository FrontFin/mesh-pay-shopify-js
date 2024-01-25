import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import Mixpanel from 'mixpanel-browser';


import {
  createLink,
  Link,
  LinkPayload
} from '@meshconnect/web-link-sdk';

const MeshModal = ({
  open,
  onClose,
  link,
  meshExit,
  transferFinished,
  pageLoaded,
  authData,
  linkToken
}) => {
  const [linkConnection, setLinkConnection] = useState(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_PORTAL_CLIENT_KEY;
  const Mix_Token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

  
  Mixpanel.init(Mix_Token)

  useEffect(() => {


    const connectionOptions = {
      clientId: CLIENT_ID,
      Connected: (authData) => {
        console.info('FRONT SUCCESS', authData);
      },
      onEvent: (event) => {
        console.info('Mesh EVENT', event);
        if (event.type === 'close') {
          console.log('Close event occurred in Mesh modal');
        }

        
        Mixpanel.track(event.type, {
          txnId: linkToken.transferOptions.transactionId,
          userId: linkToken.UserId,
          amountInFiat: linkToken.transferOptions.amountInFiat,
          symbol: linkToken.transferOptions.toAddresses[0].symbol,
          networkId: linkToken.transferOptions.toAddresses[0].networkId
        });
        

      },
      onExit: (error) => {
        if (error) {
          console.error(`[Mesh ERROR] ${error}`);
        }
        console.info('Mesh closed EXIT');
        meshExit();
      },
      onTransferFinished: (transfer) => {
        console.info('TRANSFER FINISHED', transfer);
        transferFinished(transfer);
      },
    };

    if (
      authData &&
      authData.accessToken &&
      authData.accessToken.accountTokens &&
      authData.accessToken.accountTokens.length > 0
    ) {
      connectionOptions.accessTokens = [
        {
          accountId: authData.accessToken.accountTokens[0].account.accountId,
          accountName: authData.accessToken.accountTokens[0].account.accountName,
          accessToken: authData.accessToken.accountTokens[0].accessToken,
          brokerType: authData.accessToken.brokerType,
          brokerName: authData.accessToken.brokerName,
        },
      ];
    }

    const createdLink = createLink(connectionOptions);
    setLinkConnection(createdLink);

    if (open && createdLink) {
      createdLink.openLink(link);
    }

  }, [open, link, authData,]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth></Dialog>
  );
};

MeshModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  onExit: PropTypes.func,
  transferFinished: PropTypes.func,
  setPageLoaded: PropTypes.func,
  pageLoaded: PropTypes.bool.isRequired,
  authData: PropTypes.object,
};

export default MeshModal;

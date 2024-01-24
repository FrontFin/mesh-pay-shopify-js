import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';

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
}) => {
  const [linkConnection, setLinkConnection] = useState(null);
  const CLIENT_ID = process.env.NEXT_PUBLIC_PORTAL_CLIENT_KEY;

  useEffect(() => {
    const connectionOptions = {
      clientId: CLIENT_ID,
      Connected: (authData) => {
        console.info('FRONT SUCCESS', authData);
      },
      onEvent: (event) => {
        console.info('FRONT EVENT', event);
        if (event.type === 'close') {
          console.log('Close event occurred in Mesh modal');
        }
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

  }, [open, link, authData, meshExit, transferFinished]);

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

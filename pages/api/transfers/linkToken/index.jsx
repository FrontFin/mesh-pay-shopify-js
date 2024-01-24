import { FrontApi } from '@front-finance/api';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const {
    MESH_API_KEY,
    MESH_API_URL,
    MESH_CLIENT_ID,
    NEXT_PUBLIC_MESH_NETWORK_ADDRESS,
    NEXT_PUBLIC_SOL_DESTINATION_ADDRESS,
    NEXT_PUBLIC_USERID,
    NEXT_PUBLIC_SYMBOL,
  } = process.env;
  const { authModal, amount } = req.query;

  const transactionId = uuidv4();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bodyObject = {
    UserId: NEXT_PUBLIC_USERID,
  };

  if (authModal === 'false' || authModal === undefined) {
    bodyObject.transferOptions = {
      toAddresses: [
        {
          symbol: NEXT_PUBLIC_SYMBOL, 
          address: NEXT_PUBLIC_SOL_DESTINATION_ADDRESS, 
          networkId: NEXT_PUBLIC_MESH_NETWORK_ADDRESS, 
        },
      ],
      amountInFiat: amount,
      transactionId,
      clientFee: 0.0, //if you want to tack on a deposit fee.
      fundingOptions: {
        Enabled: true,
      },
    };
  }

  console.log('bodyObject', bodyObject);
  const api = new FrontApi({
    baseURL: MESH_API_URL,  
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Id': MESH_CLIENT_ID,
      'X-Client-Secret': MESH_API_KEY,
    },
  });

  try {
    const getCatalogLink =
      await api.managedAccountAuthentication.v1LinktokenCreate(bodyObject);

    if (getCatalogLink.status !== 200) {
      const errorMessage = `Failed to retrieve or generate catalogLink. Status: ${getCatalogLink.status} - ${getCatalogLink.statusText}. Message: ${getCatalogLink.message}`;
      throw new Error(errorMessage.displayMessage);
    }
    return res.status(200).json(getCatalogLink.data);
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong: ${error.message}`,
    });
  }
}

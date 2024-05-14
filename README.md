Mesh Pay with Shopify

This application provides sample code that showcases Mesh Link, Mesh RESTful APIs with Shopify APIs to showcase Mesh Pay- an API/SDK to transfer assets from 10+ Exchanges and 100's of deFi wallets by attaching transaction Id's and specific amounts, to any crypto transfer.  We also use MixPanel to log all Mesh page views as a user goes through Modal screens.

The application was built using React, NEXT JS (for Server side), and TailWind CSS.

Requires Node.js 16.x+

Clone the repo git clone https://github.com/FrontFin/mesh-pay-shopify-js.git Getting started Init via npm:

cd mesh-pay-shopify-js npm install

Access credentials
Navigate to the Mesh Dashboard Settings page and pull the API credentials:

https://dashboard.meshconnect.com/company/keys


Navigate to Portal Dashboard to grab API keys:

https://app.portalhq.io/settings

Click 'New Test Client API Key' and copy both values

### Set environment variables:

##### Add the following environment variables to a .env file in base of the repository:

Shopify Credentials:

```bash
SHOPIFY_STOREFRONT_ACCESS_TOKEN={{your Shopify Token }} 
SHOPIFY_STORE_DOMAIN=={{your shopify store domain}} 
SHOPIFY_PRODUCT_ID={{amy configured Shopify ID}}
NEXT_PUBLIC_SHOPIFY_ADMIN_DOMAIN={{your Shopify admin domain}}
```

Mesh Credentials

```bash
NEXT_PUBLIC_MESH_API_URL=https://integration-api.getfront.com
MESH_API_URL=https://integration-api.getfront.com
MESH_API_KEY={{{Mesh API Secret Key}}}
MESH_CLIENT_ID={{Mesh ClientId}}
NEXT_PUBLIC_MESH_NETWORK_ADDRESS=0291810a-5947-424d-9a59-e88bb33e999d  #SOLANA
```

The above is is only for SOL. To change, call our GET networks endpoint https://docs.meshconnect.com/reference/get_api-v1-transfers-managed-networks and modify the below

Withdrawal Credentials (change as you see fit.)

```bash
NEXT_PUBLIC_CHAIN=solana
NEXT_PUBLIC_SYMBOL=SOL
NEXT_PUBLIC_USERID={{any UUID }}

```

Optional  Using Mix Panel:

If you're not using using MixPanel, please comment out any reference on MeshModal.jsx

```bash
NEXT_PUBLIC_MIXPANEL_TOKEN={{your MixPanel Token}}

```


Validate the values contained in the .env file:

```bash
source .env 
echo NEXT_PUBLIC_CLIENT_ID 
```

Run the application:

```bash
npm run dev
 ```

Navigate to localhost:{{yourPort}}. You should see the app running.


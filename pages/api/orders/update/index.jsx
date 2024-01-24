export default async function handler(req, res) {
  const { SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } = process.env;
  const orderId = '5193068675254'; // Replace with the actual order ID
  const orderAmount = '10.00'; // Replace with the actual order amount

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const transactionPayload = JSON.stringify({
    transaction: {
      kind: 'capture',
      status: 'success',
      amount: orderAmount,
    },
  });

  try {
    const response = await fetch(
      `${SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders/${orderId}/transactions.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: transactionPayload,
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const errorDetails = JSON.stringify(responseData.errors, null, 2);
      console.error('Shopify response:', responseData);
      throw new Error(
        `HTTP error! Status: ${response.status}. Message: ${errorDetails}`
      );
    }

    return res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
}

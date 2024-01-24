export default async function handler(req, res) {
  const { SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } = process.env;
  const { method } = req;

  const payload = JSON.stringify({
    query: `
    query {
      orders(first: 150, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            name
            createdAt
            totalPrice
            displayFinancialStatus
          }
        }
      }
    }
  `,
  });

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const endpoint = `${SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/graphql.json`; // Replace with your actual endpoint

  try {
    const getOrders = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: payload,
    });

    const responseData = await getOrders.json();

    if (getOrders.status !== 200) {
      throw new Error(`Failed to get orders. Status: ${getOrders.status}`);
    }

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error from Mesh:', error);
    return res
      .status(500)
      .json({ error: `Something went wrong: ${error.message}` });
  }
}

/**
 * Copyright 2023-present Mesh Connect, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default async function handler(req, res) {
  const { method } = req;
  const { SHOPIFY_STOREFRONT_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN } = process.env;

  const payload = JSON.stringify({
    order: {
      line_items: [
        {
          title: 'Toy Car',
          price: 10.0,
          grams: 10,
          quantity: 1,
          tax_lines: [
            {
              price: 0.0,
              rate: 0.0,
              title: 'State tax',
            },
          ],
        },
      ],
      total_tax: 0.0,
      currency: 'USD',
      note_attributes: [
        {
          name: 'mesh_account_id',
          value: '987653421',
        },
      ],
      financial_status: 'paid',
    },
  });

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const createOrder = await fetch(
      `${SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: payload,
      }
    );

    if (createOrder.status !== 201) {
      const errorMessage = `Failed to create order. Status: ${createOrder.status} - ${createOrder}. Message: ${createOrder}`;
      throw new Error(errorMessage);
    }
    const responseData = await createOrder.json();

    return res.status(201).json(responseData);
  } catch (error) {
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
}

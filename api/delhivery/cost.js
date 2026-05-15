// Vercel Serverless Function — /api/delhivery/cost
// Called by OrderSummaryPage to calculate shipping charges

const costCache = {};
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { d_pin, count } = req.query;
  const productCount = parseInt(count || '1', 10);

  if (!d_pin) {
    return res.status(400).json({ error: 'Destination pincode (d_pin) is required' });
  }

  const cacheKey = `${d_pin}-${productCount}`;
  if (costCache[cacheKey] && (Date.now() - costCache[cacheKey].timestamp < CACHE_TTL)) {
    console.log(`Serving cost from cache for ${cacheKey}`);
    return res.status(200).json(costCache[cacheKey].data);
  }

  const token = process.env.DELHIVERY_API_TOKEN;
  const originPincode = process.env.DELHIVERY_ORIGIN_PINCODE;

  if (!token || !originPincode) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  // 150g per card
  const totalWeightInGrams = productCount * 150;

  try {
    const url = new URL('https://track.delhivery.com/api/kinko/v1/invoice/charges/.json');
    url.searchParams.append('md', 'E');
    url.searchParams.append('ss', 'Delivered');
    url.searchParams.append('o_pin', originPincode);
    url.searchParams.append('d_pin', d_pin);
    url.searchParams.append('cgm', totalWeightInGrams.toString());
    url.searchParams.append('pt', 'Pre-paid');

    const delhiveryResponse = await fetch(url.toString(), {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await delhiveryResponse.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: 'No shipping data returned' });
    }

    const estimate = data[0];

    if (estimate.status === 'Failure') {
      return res.status(404).json({ error: estimate.remarks || 'Shipping not available for this pincode' });
    }

    const resultData = {
      total_amount: estimate.total_amount,
      expected_delivery: estimate.expected_package_delivery_date,
    };

    costCache[cacheKey] = { data: resultData, timestamp: Date.now() };

    return res.status(200).json(resultData);
  } catch (error) {
    console.error('Delhivery Cost Error:', error);
    return res.status(500).json({ error: 'Failed to calculate shipping' });
  }
}

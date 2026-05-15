// Vercel Serverless Function — /api/delhivery/pincode
// Called by DeliveryDetailsPage to validate if a pincode is serviceable

const pincodeCache = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { pincode } = req.query;

  if (!pincode) {
    return res.status(400).json({ error: 'Pincode is required' });
  }

  // Serve from cache if fresh
  if (pincodeCache[pincode] && (Date.now() - pincodeCache[pincode].timestamp < CACHE_TTL)) {
    return res.status(200).json(pincodeCache[pincode].data);
  }

  // Fallback to hardcoded value if Vercel env var is not yet set
  const API_TOKEN = process.env.DELHIVERY_API_TOKEN || '3ccd700e0970590c64175f0a7a4acd4e0921f0ac';

  try {
    const response = await fetch(
      `https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=${pincode}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Token ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    const isServiceable = data.delivery_codes && data.delivery_codes.length > 0;
    const details = isServiceable ? data.delivery_codes[0].postal_code : null;

    const resultData = {
      serviceable: isServiceable,
      data: details
        ? {
            city: details.city,
            state: details.state_code,
            pincode: details.pin,
            district: details.district,
          }
        : null,
    };

    pincodeCache[pincode] = { data: resultData, timestamp: Date.now() };

    return res.status(200).json(resultData);
  } catch (error) {
    console.error('Delhivery Pincode Error:', error);
    return res.status(500).json({ error: 'Failed to validate pincode' });
  }
}

import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
  event_type,
  visitor_id,
  page,
  element,
  product,
  referrer
} = req.body || {};
    if (!event_type) {
      return res.status(400).json({
        error: 'event_type is required'
      });
    }

    const { data, error } = await supabase
      .from('website_events')
      .insert({
  event_type,
  visitor_id: visitor_id || null,
  page: page || null,
  element: element || null,
  product: product || null,
  referrer: referrer || null
})
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      data
    });

  } catch (err) {
    console.error('Events API error:', err);

    return res.status(500).json({
      error: err.message
    });
  }
}
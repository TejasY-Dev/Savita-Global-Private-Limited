import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { company, name, email, phone, country, product, incoterm, quantity, message } = req.body || {};
      if (!company || !name || !email || !country || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const { data, error } = await supabase
        .from('enquiries')
        .insert({ company, name, email, phone: phone || null, country, product: product || null, incoterm: incoterm || null, quantity: quantity || null, message })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('id', { ascending: false })
        .limit(200);
      if (error) throw error;
      return res.status(200).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

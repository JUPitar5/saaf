import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('subscribers').select('id, email, frequency, product_handle, created_at').order('id', { ascending: false }).limit(20);
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { name = '', email, frequency = 'Every 4 weeks', productHandle = 'boite-decouverte' } = req.body;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
      const { data, error } = await supabase.from('subscribers').insert({ name: name.trim(), email: email.toLowerCase().trim(), frequency, product_handle: productHandle }).select().single();
      if (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'This email is already subscribed.' });
        throw error;
      }
      return res.status(201).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Newsletter API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

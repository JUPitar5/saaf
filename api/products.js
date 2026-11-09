import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    let query = supabase.from('products').select('*').order('sort_order', { ascending: true });
    if (req.query.handle) query = query.eq('handle', req.query.handle);
    const { data, error } = await query;
    if (error) throw error;
    return res.status(200).json(req.query.handle ? (data[0] || null) : data);
  } catch (err) {
    console.error('Products API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

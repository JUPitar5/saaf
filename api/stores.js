import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const search = String(req.query.search || '').trim();
    let query = supabase.from('stores').select('*').order('city', { ascending: true }).order('name', { ascending: true }).limit(200);
    if (search) query = query.or(`name.ilike.%${search}%,address.ilike.%${search}%,city.ilike.%${search}%,postal_code.ilike.%${search}%`);
    const { data, error } = await query;
    if (error) throw error;
    return res.status(200).json(data);
  } catch (err) {
    console.error('Stores API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

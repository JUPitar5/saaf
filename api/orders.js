import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-session-id');
  if (req.method === 'OPTIONS') return res.status(204).end();
  const session = req.headers['x-session-id'] || req.body?.session;
  if (!session) return res.status(400).json({ error: 'A cart session is required.' });
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('orders').select('*').eq('session_id', session).order('id', { ascending: false }).limit(10);
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { name, email, address, city, postalCode } = req.body;
      if (!name?.trim() || !email?.includes('@') || !address?.trim() || !city?.trim() || !postalCode?.trim()) return res.status(400).json({ error: 'Complete all shipping fields.' });
      const { data: items, error: cartError } = await supabase.from('cart_items').select('*, products(name, handle)').eq('session_id', session);
      if (cartError) throw cartError;
      if (!items.length) return res.status(400).json({ error: 'Your cart is empty.' });
      const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
      const orderNumber = `MANA-${Date.now().toString().slice(-8)}`;
      const { data, error } = await supabase.from('orders').insert({ order_number: orderNumber, session_id: session, name: name.trim(), email: email.trim(), address: address.trim(), city: city.trim(), postal_code: postalCode.trim(), items, total, status: 'order_request_received' }).select().single();
      if (error) throw error;
      const { error: deleteError } = await supabase.from('cart_items').delete().eq('session_id', session);
      if (deleteError) throw deleteError;
      return res.status(201).json(data);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Orders API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

import supabase from './db-client.js';

const sessionOf = (req) => req.headers['x-session-id'] || req.query.session || req.body?.session;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-session-id');
  if (req.method === 'OPTIONS') return res.status(204).end();
  const session = sessionOf(req);
  if (!session) return res.status(400).json({ error: 'A cart session is required.' });
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('cart_items').select('*, products(*)').eq('session_id', session).order('id', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { productId, variant = '12 x 355ml', quantity = 1 } = req.body;
      const qty = Math.max(1, Math.min(48, Number(quantity) || 1));
      if (!productId) return res.status(400).json({ error: 'Choose a product.' });
      const { data: product, error: productError } = await supabase.from('products').select('*').eq('id', productId).single();
      if (productError) throw productError;
      const price = variant.startsWith('24') ? product.price_24 : product.price;
      const { data: existing, error: existingError } = await supabase.from('cart_items').select('*').eq('session_id', session).eq('product_id', productId).eq('variant', variant).maybeSingle();
      if (existingError) throw existingError;
      if (existing) {
        const { data, error } = await supabase.from('cart_items').update({ quantity: Math.min(48, existing.quantity + qty) }).eq('id', existing.id).select('*, products(*)').single();
        if (error) throw error;
        return res.status(200).json(data);
      }
      const { data, error } = await supabase.from('cart_items').insert({ session_id: session, product_id: productId, variant, quantity: qty, price }).select('*, products(*)').single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'PUT') {
      const { id, quantity } = req.body;
      if (!id) return res.status(400).json({ error: 'Cart item is required.' });
      if (Number(quantity) <= 0) {
        const { error } = await supabase.from('cart_items').delete().eq('id', id).eq('session_id', session);
        if (error) throw error;
        return res.status(200).json({ ok: true });
      }
      const { data, error } = await supabase.from('cart_items').update({ quantity: Math.min(48, Math.max(1, Number(quantity) || 1)) }).eq('id', id).eq('session_id', session).select('*, products(*)').single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const id = req.body?.id;
      let query = supabase.from('cart_items').delete().eq('session_id', session);
      if (id) query = query.eq('id', id);
      const { error } = await query;
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Cart API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { name, email, message } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: 'Your name is required.' });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
    if (!message?.trim() || message.trim().length < 10) return res.status(400).json({ error: 'Tell us a little more (at least 10 characters).' });
    const { data, error } = await supabase.from('contact_messages').insert({ name: name.trim(), email: email.trim(), message: message.trim() }).select().single();
    if (error) throw error;
    return res.status(201).json(data);
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

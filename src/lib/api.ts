import type { CartItem } from '../types';

export function cartSession() {
  const key = 'mana-cart-session';
  let value = localStorage.getItem(key);
  if (!value) {
    value = `web-${crypto.randomUUID()}`;
    localStorage.setItem(key, value);
  }
  return value;
}

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-session-id': cartSession(), ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data as T;
}

export const getCart = () => apiFetch<CartItem[]>('/api/cart');
export const money = (value: number) => `$${Number(value).toFixed(2)}`;
export const openCart = () => window.dispatchEvent(new Event('mana-cart-open'));

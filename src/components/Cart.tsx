import { useCallback, useEffect, useState } from 'react';
import type { CartItem } from '../types';
import { apiFetch, cartSession, getCart, money } from '../lib/api';
import { CloseIcon } from './Icons';

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    try { setError(''); setItems(await getCart()); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to load cart.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    refresh();
    const show = () => { setOpen(true); refresh(); };
    const changed = () => refresh();
    window.addEventListener('mana-cart-open', show);
    window.addEventListener('mana-cart-changed', changed);
    (window as unknown as { openOverlayCart: () => void }).openOverlayCart = show;
    (window as unknown as { closeOverlayCart: () => void }).closeOverlayCart = () => setOpen(false);
    return () => { window.removeEventListener('mana-cart-open', show); window.removeEventListener('mana-cart-changed', changed); };
  }, [refresh]);
  useEffect(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.pastille').forEach(el => { el.textContent = String(count); el.classList.toggle('off', count === 0); });
  }, [items]);
  const update = async (item: CartItem, quantity: number) => {
    try { await apiFetch('/api/cart', { method: 'PUT', body: JSON.stringify({ id: item.id, quantity, session: cartSession() }) }); await refresh(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to update cart.'); }
  };
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  return <>
    <button className={`fondTransparent f closeCartCredits ${open ? 'on' : ''}`} aria-label="Close cart" onClick={() => setOpen(false)}></button>
    <aside className={`oCart r ${open ? 'on' : ''} ${!items.length ? 'empty' : ''}`} aria-label="Shopping cart">
      <div className="fondC a"></div><div className="innerCart">
        <div className="oCart__head flex flexSb flexCe"><h2 className="h5">Cart</h2><button className="closeCartCredits btnRond4 bounce" onClick={() => setOpen(false)} aria-label="Close cart"><span className="elBounce elBounceNoir flex flexCe flexJCe"><CloseIcon /></span></button></div>
        <div className="oCart__items">
          {loading ? <p className="cart-message">Loading your cart…</p> : error ? <p className="cart-message error">{error}</p> : !items.length ? <p className="cart-message">Your cart is empty.</p> : items.map(item => <div className="oCart__item" key={item.id}>
            <button className="i_close a" onClick={() => update(item, 0)} aria-label="Remove item"><CloseIcon /></button>
            <div className="oCart__image"><img src={item.products.image} alt={item.products.name} /></div>
            <div className="oCart__description"><div className="haut"><div className="oCart__itemName">{item.products.name}</div><div className="oCart__itemSize">{item.variant}</div></div>
              <div className="oCart__itemQuantity flex flexSb flexCe bas"><div className="oCart__itemQuantity_gauche"><button onClick={() => update(item, item.quantity - 1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => update(item, item.quantity + 1)} aria-label="Increase quantity">+</button></div><div className="oCart__itemPrice petitTexte2">{money(item.price)} × {item.quantity}</div></div>
            </div>
          </div>)}
        </div>
        <div className="oCart__total flex flexSb"><p>Subtotal</p><div className="oCart__total--price">{money(total)}</div></div>
        <p className="details">Taxes and shipping costs calculated at checkout</p>
        {!!items.length && <a className="btn btnOmbre btnOmbre60 r" href="/checkout"><span>Payment</span></a>}
      </div>
    </aside>
    <aside className="credits f"><div className="fondC a"></div><div className="innerCredits"><div className="oCart__head flex flexSb flexCe"><h2 className="h5">Credits</h2><button className="closeCartCredits btnRond4 bounce" onClick={() => document.querySelector('.credits')?.classList.remove('on')}><span className="elBounce elBounceNoir flex flexCe flexJCe"><CloseIcon /></span></button></div><h3 className="h5 marges">Website</h3><p className="details"><a href="https://twitter.com/lpaquet83" target="_blank" rel="noreferrer">Louis Paquet</a> - design<br/><a href="https://twitter.com/grc_michael" target="_blank" rel="noreferrer">Michaël Garcia</a> - front-end development<br/><a href="https://twitter.com/workbypam" target="_blank" rel="noreferrer">Pam</a> - back-end development</p><h3 className="h5 marges">Illustrations and 3D</h3><p className="details">Janick Rousseau,<br/>Camille Charbonneau,<br/>Catherine Caballero,<br/>Loopkin - illustrations<br/><a href="https://www.jeffclermont.ca" target="_blank" rel="noreferrer">Jeff Clermont</a> - 3D model</p></div></aside>
  </>;
}

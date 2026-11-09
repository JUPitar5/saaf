import { useEffect, useState } from 'react';
import { CloseIcon } from './Icons';

export default function Promo() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem('mana-promo-seen')) return;
    const timer = window.setTimeout(() => setShow(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  const close = () => { setShow(false); sessionStorage.setItem('mana-promo-seen', '1'); };
  if (!show) return null;
  return <div className="leadfox-popup" role="dialog" aria-modal="true" aria-label="Black November offer" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
    <div className="leadfox-content"><button className="leadfox-close" onClick={close} aria-label="Close promotion"><CloseIcon /></button><div className="promo-image"><img src="https://assets.leadfox.co/667f110d82bc1300085267d4/blackfriday_Tam.png" alt="Black November — up to 25% off 36 cans" /></div><div className="promo-action"><a href="/collections/all" onClick={close}>JE FAIS LE PLEIN</a></div></div>
  </div>;
}

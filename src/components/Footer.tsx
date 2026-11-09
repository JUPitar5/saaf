import { useEffect } from 'react';
import { asset } from '../lib/assets';
import { Socials } from './Header';

const jump = () => {
  if ((window as unknown as { __manaGlobalLoaded?: boolean }).__manaGlobalLoaded) return;
  const footer = document.querySelector('footer');
  footer?.classList.add('manual-jump');
  window.setTimeout(() => footer?.classList.remove('manual-jump'), 700);
};

export default function Footer() {
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) { event.preventDefault(); jump(); } };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  return <footer id="shopify-section-footer" className="shopify-section c-Footer negativ">
    <div className="flex socials a"><Socials /></div>
    <p className="titre" aria-hidden="true" id="boost"><span className="mot">{'boost'.split('').map((l, i) => <span key={i} className="c-beige lettre">{l}</span>)}</span></p>
    <p className="titre" aria-hidden="true" id="ark"><span className="mot">{'ark...'.split('').map((l, i) => <span key={i} className="c-beige lettre">{l}</span>)}</span></p>
    <button className="btn btnOmbre btnEspace a startGame btnEspaceDesktop" onClick={jump}><span>Press Space to jump</span></button>
    <button className="btn btnOmbre btnEspace a startGameMobile btnEspaceMobile" onClick={jump}><span>Jump key</span></button>
    <div className="flex flexSb details wrap"><p className="basGauche">{new Date().getFullYear()} © Mana Yerba Maté</p><div className="basDroite flex"><ul className="flex liste"><li><a href="/pages/conditions-dutilisation">Terms of use</a></li><li><a href="/pages/politique-de-remboursement">Refund policy</a></li></ul><button className="toCredits" onClick={() => document.querySelector('.credits')?.classList.add('on')}>Credits</button></div></div>
    <img className="a nuage nuage1" src={asset('nuage.svg?v=163894660680217809311675452546')} alt="" /><img className="a nuage nuage2" src={asset('nuage.svg?v=163894660680217809311675452546')} alt="" />
    <div className="innerPaysage"></div>
    <div className="innerJeu"><div className="walk"></div><div className="sad off"></div><div className="happy off"></div><div className="jump off"></div></div>
    <div className="denree"><div className="innerDenree"><div className="bad">{[1,2,3,4,5,6,7].map(n => <img key={n} className="obstacle" src={asset(`obs${n}.svg`)} alt="" />)}</div><img className="canette" src={asset('canette.svg?v=118934674395227702821675452541')} alt="" /></div></div>
  </footer>;
}

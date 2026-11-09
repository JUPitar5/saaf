import { useState } from 'react';
import type { Product } from '../types';
import { asset, FILES } from '../lib/assets';
import Logo from './Logo';
import { CartIcon, Chevron, CloseIcon, PlusIcon, UserIcon } from './Icons';
import { openCart } from '../lib/api';

const learnItems = [
  { href: '/pages/points-de-vente', label: 'Points of sale', fr: 'Points de vente', image: 'Rectangle19_340x280_crop_center.jpg?v=1673106205' },
  { href: '/pages/yerba-mate', label: 'Yerba Mate', fr: 'Yerba Maté', image: 'Rectangle_20_1cd86e90-220b-43f8-bdbf-389953830b47_340x280_crop_center.jpg?v=1673106127' },
  { href: '/pages/faq', label: 'FAQ', fr: 'FAQ', image: 'Rectangle_21_969a0ca3-3087-4139-a9a8-23cd6ad8e82e_340x280_crop_center.jpg?v=1673106152' },
  { href: '/pages/contactez-nous', label: 'Contact', fr: 'Contact', image: 'Rectangle_22_067f698c-d7b2-4b59-b7ec-4b556e616fb3_340x280_crop_center.jpg?v=1673106179' },
];

export default function Header({ products, enhanced, french = false }: { products: Product[]; enhanced: boolean; french?: boolean }) {
  const [menu, setMenu] = useState(false);
  const [flavours, setFlavours] = useState(false);
  const [flyout, setFlyout] = useState<'shop' | 'learn' | null>(null);
  const [banner, setBanner] = useState(() => localStorage.getItem('bandeau') !== 'vu');
  const label = (en: string, fr: string) => french ? fr : en;
  const closeBanner = () => { setBanner(false); localStorage.setItem('bandeau', 'vu'); };
  const toggleMenu = () => { if (!enhanced) setMenu(!menu); };

  return <div className="innerHeader f">
    <div id="shopify-section-announcement" className="shopify-section">
      {banner && <div className={`bandeau r ${enhanced ? '' : 'visible'}`} onClick={enhanced ? undefined : closeBanner}>
        {label('Free shipping on all purchases of $35 or more Quebec and Ontario', 'Livraison gratuite sur les achats de 35 $ et plus au Québec et en Ontario')}
        <button className="closeBandeau a" aria-label="Close announcement" onClick={closeBanner}><CloseIcon /></button>
      </div>}
    </div>
    <header id="shopify-section-header" className="shopify-section c-Header">
      <div className={`overlay f ${flyout === 'learn' ? 'bleu' : 'jaune'}`}></div>
      <div className="header flex flexSb flexCe">
        <a href={french ? '/fr' : '/'} className="gauche flex"><Logo /></a>
        <div className="droite flex">
          <div className="hoverSousmenu flex" onMouseLeave={() => !enhanced && setFlyout(null)}>
            <a href="/collections/all" className="toVolet btn btn50h offMob bounce" data-menu="itemsBoutique" onMouseEnter={() => !enhanced && setFlyout('shop')}>
              <span className="elBounce flex flexCe"><span>{label('Shop', 'Boutique')}</span><Chevron /></span>
            </a>
            <button className="toVolet btn btn50h offMob bounce" data-menu="itemsApprendre" onMouseEnter={() => !enhanced && setFlyout('learn')}>
              <span className="elBounce flex flexCe"><span>{label('Learn', 'Apprendre')}</span><Chevron /></span>
            </button>
            <div className={`sousMenu a ${flyout ? 'manual-on' : ''}`}>
              <div className="innerSML a flex flexCe"><a href={french ? '/fr' : '/'} className="sousMenuLogo"><Logo /></a></div>
              <div className="fondM a"></div>
              <ul className={`flex items itemsBoutique ${enhanced || flyout === 'shop' ? 'manual-items' : ''}`}>
                {products.map(p => <li key={p.id}><a href={`/products/${p.handle}`} className="h5 bounce2"><div className="border r"><span className="a"><img src={p.menu_image} width="340" height="280" alt={p.name} /></span></div>{french ? p.name_fr : p.name}</a></li>)}
              </ul>
              <ul className={`flex items itemsApprendre ${!enhanced && flyout === 'learn' ? 'manual-items' : ''}`}>
                {learnItems.map(item => <li key={item.href}><a href={item.href} className="h5 bounce2"><div className="border r"><span className="a"><img src={`${FILES}${item.image}`} alt="" /></span></div>{french ? item.fr : item.label}</a></li>)}
              </ul>
              <div className="innerBtnMenu flex flexJCe"><a href="/collections/all" className="btn btnOmbre r current toAllProd"><span>{label('All our products', 'Tous nos produits')}</span></a></div>
            </div>
          </div>
          <a className="btn btn50h offMob r bounce" href="/pages/abonnement"><span className="elBounce flex flexCe flexJCe">{label('Subscription', 'Abonnement')}</span></a>
          <a className="btn btnRond4 flex flexCe flexJCe offMob bounce" href={french ? '/' : '/fr'}><span className="elBounce flex flexCe flexJCe">{french ? 'En' : 'Fr'}</span></a>
          <a href="/account" className="btn btnRond4 bounce" aria-label="Account"><span className="elBounce flex flexCe flexJCe"><UserIcon /></span></a>
          <button className="c-Header__cart btn openCart btnRond4 r bounce" aria-label="Open cart" onClick={enhanced ? undefined : openCart}>
            <span className="elBounce flex flexCe flexJCe"><CartIcon /></span><span className="pastille a flex flexCe flexJCe off"></span>
          </button>
          <button className="btn btnRond4 openMenu r" aria-label="Toggle menu" onClick={toggleMenu}>
            <span className="innerIcon innerIcon1 flex flexCe flexJCe"><svg className="svgBurger" width="28" height="11" viewBox="0 0 28 11"><path d="M1 1h26M1 9h26" stroke="currentColor" /></svg></span>
            <span className="innerIcon innerIcon2 flex flexCe flexJCe"><CloseIcon /></span>
          </button>
        </div>
      </div>
      <section className={`innerMenuMob f ${menu ? 'on' : ''}`}>
        <div className="menuMobile r"><div className="fondMenuMobile a"></div><div className="contentMenuMob">
          <ul>
            <li><a href="/collections/all">{label('Shop', 'Boutique')}</a></li>
            <li><button className="flex flexSb flexCe toSaveurs" onClick={() => !enhanced && setFlavours(!flavours)}><span>{label('Flavours', 'Saveurs')}</span><PlusIcon /></button>
              <ul className={`saveurs flexSb ${flavours ? 'on' : ''}`}>{products.map(p => <li key={p.id}><a href={`/products/${p.handle}`} className="h5"><img src={p.menu_image} alt="" />{french ? p.name_fr : p.name}</a></li>)}</ul>
            </li>
            <li><a href="/pages/abonnement">{label('Subscription', 'Abonnement')}</a></li>
            {learnItems.map(item => <li key={item.href}><a href={item.href} className="h5">{french ? item.fr : item.label}</a></li>)}
          </ul>
          <div className="flex basMenuMob"><div className="innerPetitLien"><a href={french ? '/' : '/fr'} className="petitLien">{french ? 'English' : 'Français'}</a></div><Socials /></div>
        </div></div>
      </section>
    </header>
  </div>;
}

export function Socials() {
  return <div className="flex socials">
    <a className="btn btnOmbre btnRond3 r" href="https://www.facebook.com/manayerbamate/" target="_blank" rel="noreferrer" aria-label="Facebook"><span className="flex flexCe flexJCe"><img src={asset('i_fb.svg?v=68381587284036742181658072963')} alt="" /></span></a>
    <a className="btn btnOmbre btnRond3 r" href="https://www.linkedin.com/company/mana-yerba-mate/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="flex flexCe flexJCe"><img src={asset('i_li.svg?v=43608505387911094571658151063')} alt="" /></span></a>
    <a className="btn btnOmbre btnRond3 r" href="https://www.instagram.com/manayerbamate/" target="_blank" rel="noreferrer" aria-label="Instagram"><span className="flex flexCe flexJCe"><img src={asset('i_ig.svg?v=10282452835697765731658072964')} alt="" /></span></a>
  </div>;
}

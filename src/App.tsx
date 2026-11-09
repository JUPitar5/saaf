import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { Product } from './types';
import { apiFetch } from './lib/api';
import { asset, bodyAssets } from './lib/assets';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import { AccountPage, CheckoutPage, CollectionPage, ContactPage, FaqPage, LegalPage, NotFound, PointsPage, ProductPage, SubscriptionPage, YerbaPage } from './pages/Pages';

function Intro() {
  const text = ['Infused','of Bio','energy'];
  return <><div id="transition" className="f"><div id="firstCercle"></div></div><section id="intro" className="h100 f flex flexCe"><div className="innerTitre innerEtoiles etoilesDebut r wrap"><p className="titre rainbow rainbowDebut">{text.map((line,i) => <span className="mot" key={line}>{line.split('').map((l,j) => <span key={j} className="c-beige lettre">{l===' '?'\u00a0':l}</span>)}{i<2&&<br/>}</span>)}</p><div className="a flex flexSb sousTitre yerbaMate"><span>Yerba</span><span>Mate</span></div>{Array.from({length:9}).map((_,i)=><img key={i} className="etoile a" src={asset('etoile.svg?v=158195823969694826041671187959')} alt=""/>)}</div></section></>;
}

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/fr';
  const french = location.pathname === '/fr';
  const [products,setProducts]=useState<Product[]>([]);
  const [loading,setLoading]=useState(true);
  const [loadError,setLoadError]=useState('');
  useEffect(()=>{apiFetch<Product[]>('/api/products').then(setProducts).catch(err=>setLoadError(err.message)).finally(()=>setLoading(false));},[]);
  useEffect(()=>{
    document.documentElement.lang=french?'fr':'en';
    Object.entries(bodyAssets).forEach(([key,value])=>{document.body.dataset[key]=value});
    document.body.className=isHome?'template-index':'template-page';
    document.body.dataset.boisson='melon-et-menthe';
    if(!isHome)document.body.classList.add('mana-ready');
    const intercept=(event:MouseEvent)=>{
      const anchor=(event.target as HTMLElement).closest('a') as HTMLAnchorElement|null;
      if(!anchor||anchor.target==='_blank'||anchor.hasAttribute('download'))return;
      const href=anchor.getAttribute('href');
      if(!href||href.startsWith('mailto:')||href.startsWith('tel:'))return;
      const url=new URL(anchor.href,window.location.origin);
      if(url.origin!==window.location.origin)return;
      event.preventDefault();event.stopImmediatePropagation();
      if(url.pathname===location.pathname&&url.hash){document.querySelector(url.hash)?.scrollIntoView({behavior:'smooth'});return;}
      window.location.assign(`${url.pathname}${url.search}${url.hash}`);
    };
    document.addEventListener('click',intercept,true);
    return()=>document.removeEventListener('click',intercept,true);
  },[isHome,french,location.pathname]);
  useEffect(()=>{
    if(!isHome||loading||!products.length)return;
    let fallback=window.setTimeout(()=>{document.querySelector('#intro')?.classList.add('off');document.body.classList.add('mana-ready')},7000);
    const existing=document.getElementById('mana-global-script');
    if(!existing){
      const hadTouch='ontouchstart' in window;
      if(!hadTouch)Object.defineProperty(window,'ontouchstart',{value:null,configurable:true});
      const restoreTouch=()=>{if(!hadTouch)Reflect.deleteProperty(window,'ontouchstart')};
      const script=document.createElement('script');script.id='mana-global-script';script.src='https://manayerbamate.com/cdn/shop/t/18/assets/global.js?v=70175767351616846921743419969';script.defer=true;
      script.onload=()=>{restoreTouch();(window as unknown as {__manaGlobalLoaded?:boolean}).__manaGlobalLoaded=true;window.dispatchEvent(new Event('DOMContentLoaded'));window.setTimeout(()=>{document.querySelector('#intro')?.classList.add('off');document.body.classList.add('mana-ready')},4500)};
      script.onerror=()=>{restoreTouch();document.querySelector('#intro')?.classList.add('off');document.body.classList.add('mana-ready')};
      document.body.appendChild(script);
    }
    return()=>window.clearTimeout(fallback);
  },[isHome,loading,products.length]);
  return <>
    <Intro/>
    <Header products={products} enhanced={isHome} french={french}/>
    {loadError&&<div className="global-error">{loadError}</div>}
    <main id="MainContent" className="content-for-layout focus-none" role="main">
      <Routes>
        <Route path="/" element={<Home products={products} french={false}/>}/>
        <Route path="/fr" element={<Home products={products} french/>}/>
        <Route path="/collections/all" element={<CollectionPage products={products} loading={loading}/>}/>
        <Route path="/products/:handle" element={<ProductPage products={products} loading={loading}/>}/>
        <Route path="/pages/yerba-mate" element={<YerbaPage/>}/>
        <Route path="/pages/faq" element={<FaqPage/>}/>
        <Route path="/pages/points-de-vente" element={<PointsPage/>}/>
        <Route path="/pages/abonnement" element={<SubscriptionPage products={products}/>}/>
        <Route path="/pages/contactez-nous" element={<ContactPage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/pages/conditions-dutilisation" element={<LegalPage/>}/>
        <Route path="/pages/politique-de-remboursement" element={<LegalPage refund/>}/>
        <Route path="/cart" element={<Navigate to="/checkout" replace/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
    <Footer/><Cart/>
  </>;
}

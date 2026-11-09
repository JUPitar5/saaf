import type { Product } from '../types';
import { asset } from '../lib/assets';
import ProductCard from '../components/ProductCard';
import { Arrow } from '../components/Icons';

const flavors = [
  { key: 'pamp', fond: 'fond1.png?v=149618323740220866231671187960', name: 'Grapefruit', fr: 'Pamplemousse', handle: 'pamplemousse', color: '#f15b40' },
  { key: 'hibi', fond: 'fond2.png?v=41305183148587079751671440160', name: 'Blackberry & Hibiscus', fr: 'Mûre & Hibiscus', handle: 'mure-et-hibiscus', color: '#2b3d73' },
  { key: 'trop', fond: 'fond3.png?v=175780116538271127791671187961', name: 'Tropical', fr: 'Tropicale', handle: 'punch-tropical', color: '#e72f63' },
  { key: 'melo', fond: 'fond4.png?v=179275072314952925911717784947', name: 'Melon & Mint', fr: 'Melon & Menthe', handle: 'melon-et-menthe', color: '#195e1c' },
];
const steps = [0,1,2,3,0,1,2,3];
const benefits = [
  ['Without the crash', 'A gentle wave of energy. To get you going without the crash.'],
  ['Natural caffeine', 'This certified organic caffeine comes from the plant. A gift from Mother Nature.'],
  ['Antioxidant', 'Richer in antioxidants than tea. Not bad.'],
  ['Vegan', 'A plant-based drink that tastes like heaven. Who could ask for more?'],
];
const letters = (text: string) => text.split('').map((letter, i) => <span className="c-beige lettre" key={`${letter}-${i}`}>{letter === ' ' ? '\u00a0' : letter}</span>);

function FlavorArt({ index, step }: { index: number; step: number }) {
  const f = flavors[index];
  return <div className={`step step${step} flex flexJCe a`}><div className="stepChild h100 r flex">
    <img className={`a fond ${step === 3 ? 'first' : ''}`} src={asset(f.fond)} alt="" />
    <div className="gauche r">
      {f.key === 'melo' ? <div className="introGauche a"><img className="a fleur" src={asset('home_fleur.svg?v=5991018211529823811717768806')} alt="" /><div className="lottie_melo_1 a"></div></div> : <>
        <div className={`lottie_${f.key}_1 a`}>{f.key === 'pamp' && <img className="a bulles" src={asset('home_bulles.svg?v=72037103063440429561671187963')} alt="" />}{f.key === 'hibi' && <img className="a star" src={asset('home_star.svg?v=8304272578825160451671187964')} alt="" />}{f.key === 'trop' && <img className="a eau" src={asset('home_eau.svg?v=98947984976318104491671187963')} alt="" />}</div>
        <div className={`lottie_${f.key}_2 a`}>{f.key === 'hibi' && <img className="a star" src={asset('home_star.svg?v=8304272578825160451671187964')} alt="" />}</div>
        {f.key === 'trop' && <img src={asset('mangue.svg?v=79688881911116548501671187970')} className="mangue a" alt="" />}
      </>}
    </div>
    <div className="droite r">
      {f.key === 'melo' ? <div className="introDroite a"><div className="lottie_melo_2 a"></div><div className="lottie_melo_3 a"></div></div> : <>
        {f.key === 'pamp' && <img src={asset('woman.svg?v=91715481647345174191671187973')} className="woman a" alt="" />}
        {f.key === 'pamp' && <div className="lottie_pamp_4 a"></div>}
        {f.key === 'trop' && <div className="lottie_trop_4 a"></div>}
        {f.key === 'hibi' && <div className="lottie_hibi_3 a"><img className="a planet" src={asset('home_planet.svg?v=54849484887763892781671187964')} alt="" /><img className="a star" src={asset('home_star.svg?v=8304272578825160451671187964')} alt="" /></div>}
      </>}
    </div>
  </div></div>;
}

export default function Home({ products, french = false }: { products: Product[]; french?: boolean }) {
  return <div className="minHeight home-page">
    <section className="shopify-section c-HomeHero"><section className="c-HomeHero-fond jaune">
      <h1 className="sr-only">Mana - Drinking tea</h1>
      <section className="c-HomeHero--part1 r">
        <div className="innerCercle f lotties">{steps.map((index, step) => <FlavorArt key={step} index={index} step={step} />)}</div>
        <div className="mainCanvas f flex flexCe"></div>
        <div className="slider-navigation flex flexFe flexJCe r"><div className="flex r flexSb flexCe">
          <button className="btnRond r heroPrev bounce" aria-label="Previous flavour"><span className="elBounce flex flexCe flexJCe"><Arrow /></span></button>
          <div className="innerBtn">{flavors.map((f, i) => <a key={f.key} href={`/products/${f.handle}`} className={`btn btnOmbre r ${i === 3 ? 'current btnOmbreVert' : i === 1 ? 'btnOmbreBleu' : i === 2 ? 'btnOmbreRouge' : ''}`}><span style={{ backgroundColor: f.color }}><span className="premier">{french ? f.fr : f.name}</span><span className="a second">{french ? f.fr : f.name}</span></span></a>)}</div>
          <button className="btnRond r heroNext bounce" aria-label="Next flavour"><span className="elBounce flex flexCe flexJCe"><Arrow rotate /></span></button>
        </div></div>
      </section>
      <div className="margeNeg negativ"><div className="sectionCercle sectionCercleH h100 r">
        <svg className="a arc" width="1517" height="93" viewBox="0 0 1517 93" fill="none"><path d="M0 92.0674C528.5 -28.9327 977.5 -32.4328 1516.5 92.0674H0Z" fill="#FEF7E6"/></svg>
        <div className="innerCercle innerCercleCartes innerCercleH a">
          <div className="cercle a"><div className="etape h100 flex flexCe flexJCe etapeText"><div><h2>{french ? <>Mana ? Yerba Maté ?<br/>De quoi on parle ?</> : <>Mana ? Yerba Maté ?<br/>What are we talking about?</>}</h2><p className="h5">{french ? "(on va se dire les vraies affaires)" : "(we're going to tell each other the real things)"}</p></div></div></div>
          {benefits.map(([title, text]) => <div className="cercle a" key={title}><div className="etape h100 flex flexCe flexJCe etapeBenefice"><div className="data"><div className="haut">{title}</div><div className="bas r"><p className="petitTexte2">{text}</p></div></div></div></div>)}
          <div className="cercle a"><div className="etape etapeSpe h100 flex flexCe flexJCe r"><div className="innerEtoiles"><div className="rainbow rainbowSpe best-rainbow">{letters(french ? 'QUE DU BON' : 'ONLY THE BEST')}</div>{Array.from({length:6}).map((_,i) => <img key={i} className="etoile etoileBulle a" src={asset('bulle.svg?v=58686890748238671401671187957')} alt="" />)}</div></div></div>
        </div>
      </div></div>
    </section><div className="offCanvas"></div></section>
    <section className="shopify-section c-imagesDuo"><div className="imgDuo r"><div className="parallax flex"><img src="https://manayerbamate.com/cdn/shop/files/left_5a17133c-fc16-4907-af73-f964dc926e47_700x750_crop_center.jpg?v=1672091045" alt="MANA cans and illustration"/><img src="https://manayerbamate.com/cdn/shop/files/right_f9e5bdd5-3bee-41c9-996c-ee432de1bd0a_700x750_crop_center.jpg?v=1672091066" alt="Enjoying a MANA yerba mate"/></div></div></section>
    <section className="shopify-section c-wordParagraph negativ"><section className="c-HomeHero--part3"><div className="innerEtoiles r"><h2 className="grosTitre grosTitreSpe rainbow">{letters(french ? 'SAVEURS' : 'FLAVORS')}</h2><div className="parallaxEtoile">{Array.from({length:7}).map((_,i) => <img key={i} className="etoile a" src={asset('etoile.svg?v=158195823969694826041671187959')} alt=""/>)}</div></div><div className="wrap"><p className="petitTexte">{french ? 'Fraîches, fruitées, pétillantes, de belles couleurs, réveillez vos papilles.' : 'Fresh, fruity, sparkling, beautiful colours, awaken your taste buds.'}</p></div></section></section>
    <section className="shopify-section c-productsSlider"><div className="innerSlider"><div className="wrap flex flexSb flexCe r infosProducts negativ"><SliderNav mobile/><h2 className="produitsReco a">{french ? 'Produits recommandés' : 'Recommended products'}</h2><a className="btn btn60 voirTout bounce" href="/collections/all"><span className="elBounce elBounceNoir flex">{french ? 'Voir tous nos produits' : 'See all our products'}</span></a></div><div className="c-Collection__products productSlider flex flexWr"><SliderNav/><div className="swiper-wrapper flex">{products.map(p => <ProductCard key={p.id} product={p} french={french}/>)}</div></div></div></section>
    <section className="shopify-section c-newsletterSubscribe negativ"><div className="r"><div className="tenBoirais rainbow ten-boirais-text" aria-hidden="true">{letters(french ? 'T’EN BOIRAIS TOUS LES JOURS' : 'YOU COULD DRINK IT EVERY DAY')}</div><p className="inscrisToi">{french ? 'Abonnez-vous à la livraison automatique* et économisez 10 %.' : 'Sign up for automatic delivery* and save 10%.'}</p><div className="flex flexJCe"><a href="/pages/abonnement" className="btn btnOmbre r current"><span>{french ? 'S’abonner' : 'Subscribe'}</span></a></div><div className="innerFleur a flex flexCe flexJCe"><img src={asset('fleur.png?v=52118480355285910701659712886')} alt=""/><p className="a">{french ? <>On a<br/>ce qu’il<br/>vous faut</> : <>We have<br/>what<br/>you need</>}</p></div><div className="lottieFusee"></div><small className="details a">{french ? '* On ne livre pas encore dans l’espace, mais qui sait…' : "* We don't deliver in space yet, but who knows..."}</small><svg className="arrondi" width="1517" height="93" viewBox="0 0 1517 93"><path d="M1516.89 0.182373C988.391 121.182 539.391 124.682 0.390633 0.18224L1516.89 0.182373Z" fill="#FEF7E6"/></svg></div></section>
    <section className="shopify-section c-instagramPush"><div className="innerInsta r">{['Mana6064_250x250_crop_center.jpg?v=1661177117','Mana6031_250x250_crop_center.jpg?v=1661177198','Mana6004_250x250_crop_center.jpg?v=1661177127','Mana5969_250x250_crop_center.jpg?v=1661177108'].map((img,i) => <img key={img} className={`pushInsta a pushInsta${i}`} src={`https://manayerbamate.com/cdn/shop/files/${img}`} alt="MANA community" loading="lazy"/>)}<div className="flex flexJCe datasInsta"><div><p className="h5">@manayerbamate</p><h2 className="h2">{french ? 'Une dose d’énergie dans votre fil.' : 'For a dose of energy in your feed.'}</h2><div><a className="btn btnOmbre btnRond3 r" href="https://www.instagram.com/manayerbamate/" target="_blank" rel="noreferrer"><span className="flex flexCe flexJCe"><img src={asset('i_ig.svg?v=10282452835697765731658072964')} alt="Instagram"/></span></a></div></div></div></div><svg className="arrondi" width="1517" height="93" viewBox="0 0 1517 93"><path d="M1516.89 0.182373C988.391 121.182 539.391 124.682 0.390633 0.18224L1516.89 0.182373Z" fill="#FFD372"/></svg></section>
  </div>;
}

function SliderNav({ mobile = false }: { mobile?: boolean }) {
  return <div className={`nav ${mobile ? 'nav-mobile' : 'nav-desktop'} flex`}><button className="btn btnRond2 toPrevSlide bounce r" aria-label="Previous products"><span className="elBounce flex flexCe flexJCe"><Arrow/></span></button><button className="btn btnRond2 toNextSlide bounce r" aria-label="Next products"><span className="elBounce flex flexCe flexJCe"><Arrow rotate/></span></button></div>;
}

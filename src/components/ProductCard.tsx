import type { Product } from '../types';
import { PlusIcon } from './Icons';

export default function ProductCard({ product, french = false }: { product: Product; french?: boolean }) {
  return <article className="productThumb r swiper-slide" style={{ backgroundColor: product.color }}>
    <a href={`/products/${product.handle}`} data-product={product.handle} className="a">
      <span className="sousTitre r">{french ? product.name_fr : product.name}</span>
      <img className="base a" src={product.image} width="827" height="980" alt={product.name} />
      <img className="hover a" src={product.hover_image} alt="" loading="lazy" />
      <svg className="svgMaskThumb a" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><clipPath><circle cx="50%" cy="50%" r="65%"/><circle cx="50%" cy="50%" r="65%"/><circle cx="50%" cy="50%" r="65%"/></clipPath></defs></svg>
      <span className="btn decouvrez a">{french ? 'Découvrir ce produit' : 'Discover this product'}</span>
      <span className="btn btnRond a flex flexCe flexJCe"><PlusIcon /></span>
    </a>
  </article>;
}

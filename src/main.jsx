import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import './styles.css';

import logoImg from './assets/nvrmnd-logo.jpeg';
import tagsImg from './assets/nvrmnd-tags.jpeg';
import whiteTee from './assets/white-tee.png';
import greenTee from './assets/green-tee.png';
import blackTee from './assets/black-tee.png';
import jeansImg from './assets/cross-jeans.png';

const MODEL_WHITE = 'https://images.pexels.com/photos/39915423/pexels-photo-39915423.jpeg?auto=compress&cs=tinysrgb&w=1600';
const MODEL_DARK = 'https://images.pexels.com/photos/38953444/pexels-photo-38953444.jpeg?auto=compress&cs=tinysrgb&w=1600';
const MODEL_URBAN = 'https://images.pexels.com/photos/28994265/pexels-photo-28994265.jpeg?auto=compress&cs=tinysrgb&w=1600';
const FASHION_VIDEO = 'https://videos.pexels.com/video-files/34013116/14428163_1920_1080_24fps.mp4';

const iconPaths = {
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  x: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bag: <><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  minus: <path d="M5 12h14"/>,
  trash: <><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m7 7 1 13h8l1-13"/><path d="M10 11v5"/><path d="M14 11v5"/></>,
  upload: <><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 15v5h16v-5"/></>,
  pencil: <><path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"/><path d="m14 7 3 3"/></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-5"/></>,
  dashboard: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></>,
  package: <><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 7 8 4 8-4"/><path d="M4 7v10l8 4 8-4V7"/><path d="M12 11v10"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 19.1 2.1-2.1"/><path d="m17 7 2.1-2.1"/></>,
  logout: <><path d="M10 5H5v14h5"/><path d="M14 8l4 4-4 4"/><path d="M9 12h9"/></>,
  star: <path d="m12 3 2.7 5.6 6.2.9-4.5 4.4 1.1 6.1-5.5-2.9L6.5 20l1.1-6.1-4.5-4.4 6.2-.9L12 3Z"/>,
  sparkle: <><path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"/><path d="m19 3 .7 2.3L22 6l-2.3.7L19 9l-.7-2.3L16 6l2.3-.7L19 3Z"/></>,
  play: <path d="m9 7 8 5-8 5V7Z"/>,
  pause: <><path d="M9 7v10"/><path d="M15 7v10"/></>,
  camera: <><path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z"/><circle cx="12" cy="13" r="3.5"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>
};

function Icon({ name, size = 20, className = '' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const starterProducts = [
  { id: 'nvr-tee-001', name: 'Essential White Tee', category: 'T-Shirts', price: 149, oldPrice: 179, image: whiteTee, description: 'Heavyweight premium cotton tee with a clean boxy silhouette and a soft textured finish.', sizes: ['S','M','L','XL','XXL'], color: 'Optic White', featured: true, stock: 18, badge: 'NEW' },
  { id: 'nvr-tee-002', name: 'Forest Core Tee', category: 'T-Shirts', price: 159, oldPrice: 189, image: greenTee, description: 'Deep forest green everyday tee in breathable cotton with understated texture.', sizes: ['S','M','L','XL','XXL'], color: 'Forest Green', featured: true, stock: 12, badge: 'DROP 01' },
  { id: 'nvr-tee-003', name: 'After Dark Tee', category: 'T-Shirts', price: 159, oldPrice: null, image: blackTee, description: 'Minimal black streetwear essential cut with a relaxed premium fit.', sizes: ['S','M','L','XL','XXL'], color: 'Jet Black', featured: true, stock: 22, badge: 'CORE' },
  { id: 'nvr-den-001', name: 'Crossfade Flare Denim', category: 'Jeans', price: 289, oldPrice: 329, image: jeansImg, description: 'Washed light-blue flare denim with stitched cross details and distressed cross patchwork.', sizes: ['28','30','32','34','36'], color: 'Ice Blue Wash', featured: true, stock: 9, badge: 'LIMITED' }
];

const defaultSettings = {
  currency: 'AED',
  announcement: 'FREE DELIVERY ON ORDERS ABOVE AED 299',
  instagram: '@nvrmnd',
  email: 'hello@nvrmnd.store'
};

const StoreContext = createContext(null);

function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('nvrmnd_products_v1');
      return saved ? JSON.parse(saved) : starterProducts;
    } catch { return starterProducts; }
  });
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('nvrmnd_settings_v1');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch { return defaultSettings; }
  });
  const [cart, setCart] = useState([]);

  useEffect(() => localStorage.setItem('nvrmnd_products_v1', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('nvrmnd_settings_v1', JSON.stringify(settings)), [settings]);

  const addProduct = p => setProducts(prev => [{ ...p, id: `nvr-${Date.now()}` }, ...prev]);
  const updateProduct = p => setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProduct = id => setProducts(prev => prev.filter(item => item.id !== id));
  const addToCart = (product, size) => setCart(prev => {
    const key = `${product.id}-${size}`;
    const found = prev.find(x => x.key === key);
    return found ? prev.map(x => x.key === key ? { ...x, qty: x.qty + 1 } : x) : [...prev, { key, product, size, qty: 1 }];
  });
  const cartCount = cart.reduce((n, item) => n + item.qty, 0);

  return <StoreContext.Provider value={{ products, settings, setSettings, cart, setCart, cartCount, addProduct, updateProduct, deleteProduct, addToCart }}>{children}</StoreContext.Provider>;
}

const useStore = () => useContext(StoreContext);
const money = (n, currency) => `${currency} ${Number(n).toFixed(0)}`;

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>{children}</div>;
}

function Header({ onCart }) {
  const { cartCount } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn(); window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return <>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="wordmark">NVRMND<span>✦</span></Link>
      <nav className="desktop-nav">
        <a href="#drop">DROP 01</a><a href="#shop">SHOP</a><a href="#lookbook">LOOKBOOK</a><a href="#film">FILM</a>
      </nav>
      <div className="header-actions">
        <a href="#shop" className="icon-btn" aria-label="Search"><Icon name="search" size={18}/></a>
        <button className="bag-btn" onClick={onCart}><Icon name="bag" size={18}/><span>{cartCount}</span></button>
        <button className="icon-btn mobile-only" onClick={() => setOpen(!open)}>{open ? <Icon name="x"/> : <Icon name="menu"/>}</button>
      </div>
    </header>
    <div className={`mobile-drawer ${open ? 'open' : ''}`}>
      <a href="#drop" onClick={()=>setOpen(false)}>DROP 01</a>
      <a href="#shop" onClick={()=>setOpen(false)}>SHOP</a>
      <a href="#lookbook" onClick={()=>setOpen(false)}>LOOKBOOK</a>
      <a href="#film" onClick={()=>setOpen(false)}>FILM</a>
      <Link to="/admin" onClick={()=>setOpen(false)}>ADMIN</Link>
    </div>
  </>;
}

function Hero() {
  return <section className="hero-v2" id="drop">
    <div className="hero-noise" />
    <div className="hero-model">
      <img src={MODEL_DARK} alt="Streetwear editorial model"/>
      <div className="hero-model-shade"/>
      <div className="model-index">01 / 04</div>
    </div>
    <div className="hero-content">
      <div className="micro-row"><span>EST. 2026</span><span>SHARJAH / DUBAI</span></div>
      <p className="kicker">NVRMND — DROP 01</p>
      <h1><span>NEVER</span><span>MIND</span><em>THE NOISE.</em></h1>
      <p className="hero-lead">Premium everyday silhouettes, statement denim and pieces made for people who would rather set the tone than follow it.</p>
      <div className="hero-actions">
        <a href="#shop" className="btn-metal">SHOP THE DROP <Icon name="arrow" size={18}/></a>
        <a href="#lookbook" className="btn-ghost">VIEW CAMPAIGN</a>
      </div>
      <div className="hero-stats">
        <div><strong>01</strong><span>LIMITED DROP</span></div>
        <div><strong>04</strong><span>CORE PIECES</span></div>
        <div><strong>∞</strong><span>OWN YOUR STYLE</span></div>
      </div>
    </div>
    <div className="hero-product-float float-tee"><img src={blackTee} alt="Black NVRMND tee"/><span>CORE / BLACK</span></div>
    <div className="hero-cross">✦</div>
    <div className="vertical-copy">STREETWEAR FOR THE REAL ONES — NVRMND</div>
  </section>;
}

function Ticker() {
  return <div className="ticker"><div><span>NVRMND</span> NOT MADE TO FOLLOW ✦ PREMIUM ESSENTIALS ✦ LIMITED DROP ✦ STATEMENT DENIM ✦ <span>NVRMND</span> NOT MADE TO FOLLOW ✦ PREMIUM ESSENTIALS ✦ LIMITED DROP ✦ STATEMENT DENIM ✦</div></div>;
}

function ProductCard({ product, onView }) {
  const { settings } = useStore();
  return <article className="product-card-v2">
    <button className="product-media" onClick={() => onView(product)}>
      <img src={product.image} alt={product.name}/>
      <div className="product-media-gloss"/>
      {product.badge && <span className="product-badge-v2">{product.badge}</span>}
      <div className="product-hover"><span>QUICK VIEW</span><Icon name="arrow" size={16}/></div>
    </button>
    <div className="product-meta-v2">
      <div><span>{product.category}</span><h3>{product.name}</h3><small>{product.color}</small></div>
      <div className="product-price-v2"><strong>{money(product.price, settings.currency)}</strong>{product.oldPrice && <s>{money(product.oldPrice, settings.currency)}</s>}</div>
    </div>
  </article>;
}

function ShopSection({ onView }) {
  const { products } = useStore();
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return <section className="shop-v2" id="shop">
    <Reveal className="section-title-row">
      <div><span className="section-code">/ 02 — SHOP</span><h2>THE <i>DROP.</i></h2></div>
      <p>Clean foundations. Strong proportions. Sharp details. Every piece earns its place.</p>
    </Reveal>
    <div className="filter-strip">
      {categories.map(c => <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>)}
    </div>
    <div className="product-grid-v2">
      {filtered.map((p, i) => <Reveal key={p.id} className={`delay-${Math.min(i,3)}`}><ProductCard product={p} onView={onView}/></Reveal>)}
    </div>
  </section>;
}

function Lookbook() {
  return <section className="lookbook" id="lookbook">
    <div className="lookbook-head">
      <span className="section-code">/ 03 — CAMPAIGN</span>
      <h2>NO RULES.<br/><i>JUST PRESENCE.</i></h2>
    </div>
    <div className="lookbook-grid">
      <Reveal className="look tall"><img src={MODEL_WHITE} alt="Editorial fashion model"/><div className="look-overlay"><span>LOOK 01</span><strong>MONOCHROME<br/>DISCIPLINE</strong></div></Reveal>
      <Reveal className="look wide delay-1"><img src={MODEL_URBAN} alt="Urban streetwear editorial"/><div className="look-overlay"><span>LOOK 02</span><strong>DAYLIGHT<br/>REBELLION</strong></div></Reveal>
      <Reveal className="look product-look delay-2"><img src={greenTee} alt="Forest green NVRMND tee"/><div className="look-overlay dark"><span>DROP 01</span><strong>FOREST<br/>CORE</strong></div></Reveal>
      <Reveal className="look dark-look delay-3"><img src={MODEL_DARK} alt="Dark studio streetwear model"/><div className="look-overlay"><span>LOOK 03</span><strong>AFTER<br/>DARK</strong></div></Reveal>
    </div>
    <div className="lookbook-caption"><span>EDITORIAL SERIES / 2026</span><p>Model imagery is campaign inspiration. Shop the actual NVRMND pieces in the product grid above.</p></div>
  </section>;
}

function FashionFilm() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) { video.play(); setPlaying(true); }
    else { video.pause(); setPlaying(false); }
  };

  return <section className="film" id="film">
    <video ref={ref} src={FASHION_VIDEO} autoPlay muted loop playsInline poster={MODEL_URBAN}/>
    <div className="film-scanlines"/>
    <div className="film-shade"/>
    <div className="film-copy">
      <span>NVRMND / MOTION 001</span>
      <h2>MOVE LIKE<br/><i>NOBODY'S WATCHING.</i></h2>
      <p>A cinematic street-fashion interlude built into the store experience.</p>
    </div>
    <button className="film-control" onClick={toggle}><Icon name={playing ? 'pause' : 'play'} size={18}/><span>{playing ? 'PAUSE FILM' : 'PLAY FILM'}</span></button>
    <div className="rec-dot">● REC</div>
  </section>;
}


function ManifestoSection() {
  return <section className="manifesto-v3" aria-label="NVRMND manifesto">
    <div className="manifesto-grain" aria-hidden="true"/>
    <div className="manifesto-glow" aria-hidden="true"/>
    <div className="manifesto-orbit orbit-a" aria-hidden="true"/>
    <div className="manifesto-orbit orbit-b" aria-hidden="true"/>
    <div className="manifesto-orbit orbit-c" aria-hidden="true"/>
    <div className="manifesto-inner">
      <span className="manifesto-kicker">NVRMND / 2026 / STREETWEAR SYSTEM</span>
      <Reveal className="manifesto-reveal">
        <h2 className="manifesto-title">
          <span className="manifesto-outline">NOT MADE</span>
          <span className="manifesto-metal">TO FOLLOW.</span>
        </h2>
      </Reveal>
    </div>
  </section>;
}

function BrandStory() {
  return <section className="brand-story">
    <Reveal className="story-copy">
      <span className="section-code">/ 04 — THE CODE</span>
      <h2>BUILT FOR<br/>THE <i>REAL ONES.</i></h2>
      <p>NVRMND is about individuality without noise: premium-feel fabrics, confident proportions and pieces that become more personal the more you wear them.</p>
      <div className="story-values">
        <div><Icon name="sparkle"/><strong>PREMIUM FEEL</strong><span>Material and finish first.</span></div>
        <div><Icon name="star"/><strong>LIMITED ENERGY</strong><span>Less common. More yours.</span></div>
        <div><Icon name="shield"/><strong>BUILT TO STAY</strong><span>Beyond one season.</span></div>
      </div>
    </Reveal>
    <Reveal className="story-visual delay-1">
      <img src={tagsImg} alt="NVRMND clothing tags"/>
      <div className="story-logo"><img src={logoImg} alt="NVRMND logo"/></div>
      <span className="story-stamp">NVRMND<br/>AUTHENTIC / 2026</span>
    </Reveal>
  </section>;
}

function ProductModal({ product, onClose }) {
  const { addToCart, settings } = useStore();
  const [size, setSize] = useState(product?.sizes?.[0] || 'M');
  useEffect(() => setSize(product?.sizes?.[0] || 'M'), [product]);
  if (!product) return null;
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="product-modal-v2">
      <button className="modal-x" onClick={onClose}><Icon name="x"/></button>
      <div className="modal-product-image"><img src={product.image} alt={product.name}/><span>{product.badge || 'NVRMND'}</span></div>
      <div className="modal-product-copy">
        <p className="section-code">{product.category} / NVRMND</p>
        <h2>{product.name}</h2>
        <div className="modal-price">{money(product.price, settings.currency)} {product.oldPrice && <s>{money(product.oldPrice, settings.currency)}</s>}</div>
        <p>{product.description}</p>
        <div className="detail-line"><span>COLOR</span><strong>{product.color}</strong></div>
        <div className="size-head"><span>SELECT SIZE</span><small>{product.stock} IN STOCK</small></div>
        <div className="sizes">{product.sizes.map(s => <button key={s} className={size === s ? 'active' : ''} onClick={() => setSize(s)}>{s}</button>)}</div>
        <button className="btn-metal full" onClick={() => { addToCart(product, size); onClose(); }}><Icon name="bag" size={18}/> ADD TO BAG <Icon name="arrow" size={18}/></button>
        <div className="secure-note"><Icon name="shield" size={17}/> SECURE CHECKOUT / EASY EXCHANGES</div>
      </div>
    </div>
  </div>;
}

function CartDrawer({ open, onClose }) {
  const { cart, setCart, settings } = useStore();
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const qty = (key, delta) => setCart(prev => prev.map(x => x.key === key ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  const remove = key => setCart(prev => prev.filter(x => x.key !== key));

  return <div className={`cart-backdrop ${open ? 'show' : ''}`} onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <aside className={`cart-v2 ${open ? 'show' : ''}`}>
      <div className="cart-head"><div><span>YOUR BAG</span><h2>{cart.length ? `${cart.length} STYLE${cart.length > 1 ? 'S' : ''}` : 'EMPTY'}</h2></div><button onClick={onClose}><Icon name="x"/></button></div>
      <div className="cart-scroll">
        {!cart.length && <div className="cart-empty"><Icon name="bag" size={42}/><p>No pieces yet. The drop is waiting.</p><button onClick={onClose}>RETURN TO SHOP</button></div>}
        {cart.map(item => <div className="cart-item" key={item.key}>
          <img src={item.product.image} alt={item.product.name}/>
          <div><h4>{item.product.name}</h4><span>SIZE {item.size} / {item.product.color}</span><strong>{money(item.product.price, settings.currency)}</strong><div className="qty"><button onClick={()=>qty(item.key,-1)}><Icon name="minus" size={13}/></button><b>{item.qty}</b><button onClick={()=>qty(item.key,1)}><Icon name="plus" size={13}/></button></div></div>
          <button className="trash" onClick={()=>remove(item.key)}><Icon name="trash" size={16}/></button>
        </div>)}
      </div>
      {!!cart.length && <div className="cart-foot"><div><span>SUBTOTAL</span><strong>{money(subtotal, settings.currency)}</strong></div><button className="btn-metal full">CHECKOUT <Icon name="arrow" size={17}/></button><small>Payment gateway can be connected in the production version.</small></div>}
    </aside>
  </div>;
}

function Footer() {
  const { settings } = useStore();
  return <footer className="footer-v2">
    <div className="footer-big">NVRMND<span>✦</span></div>
    <div className="footer-grid">
      <div><p>NOT MADE TO FOLLOW.</p><small>Streetwear for the real ones.</small></div>
      <div><b>SHOP</b><a href="#shop">T-SHIRTS</a><a href="#shop">SHIRTS</a><a href="#shop">JEANS</a></div>
      <div><b>CONNECT</b><a href="https://instagram.com/" target="_blank" rel="noreferrer"><Icon name="instagram" size={15}/> {settings.instagram}</a><a href={`mailto:${settings.email}`}>{settings.email}</a></div>
      <div><b>ACCESS</b><Link to="/admin">ADMIN PANEL</Link><a href="#film">CAMPAIGN FILM</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 NVRMND. ALL RIGHTS RESERVED.</span><span>EDITORIAL MODEL MEDIA: PEXELS / USED AS CAMPAIGN INSPIRATION</span></div>
  </footer>;
}

function Home() {
  const { settings } = useStore();
  const [view, setView] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  return <div className="site-shell">
    <div className="announcement-v2"><span>{settings.announcement}</span><b>✦</b><span>DROP 01 — LIMITED RELEASE</span></div>
    <Header onCart={() => setCartOpen(true)}/>
    <Hero/>
    <Ticker/>
    <ShopSection onView={setView}/>
    <Lookbook/>
    <FashionFilm/>
    <ManifestoSection/>
    <BrandStory/>
    <Footer/>
    <ProductModal product={view} onClose={() => setView(null)}/>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}/>
  </div>;
}

const emptyProduct = { name:'', category:'T-Shirts', price:'', oldPrice:'', image:'', description:'', sizes:['S','M','L','XL'], color:'', featured:true, stock:10, badge:'NEW' };

function compressImage(file, maxSide = 1600, quality = .82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function AdminLogin({ onLogin }) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const exists = !!localStorage.getItem('nvrmnd_admin_pin');
  const submit = e => {
    e.preventDefault(); setError('');
    if (!exists) {
      if (pin.length < 4) return setError('Use at least 4 characters.');
      if (pin !== confirmPin) return setError('PINs do not match.');
      localStorage.setItem('nvrmnd_admin_pin', pin);
      sessionStorage.setItem('nvrmnd_admin_ok', '1'); onLogin(); return;
    }
    if (pin === localStorage.getItem('nvrmnd_admin_pin')) { sessionStorage.setItem('nvrmnd_admin_ok','1'); onLogin(); }
    else setError('Incorrect admin PIN.');
  };

  return <div className="admin-login-v2">
    <div className="login-visual"><img src={MODEL_DARK} alt="NVRMND editorial"/><div/><span>NVRMND / PRIVATE CONTROL</span></div>
    <div className="login-panel">
      <Link to="/" className="admin-wordmark">NVRMND<span>✦</span></Link>
      <div className="login-form-wrap"><span className="section-code">PRIVATE ACCESS</span><h1>{exists ? 'ADMIN\nCONTROL.' : 'CREATE\nACCESS.'}</h1><p>{exists ? 'Enter your private PIN to manage the NVRMND catalog.' : 'First setup: create a private PIN for this browser.'}</p>
      <form onSubmit={submit}><label>ADMIN PIN<input type="password" value={pin} onChange={e=>setPin(e.target.value)} autoFocus/></label>{!exists && <label>CONFIRM PIN<input type="password" value={confirmPin} onChange={e=>setConfirmPin(e.target.value)}/></label>}{error && <div className="form-error">{error}</div>}<button className="btn-metal full">{exists ? 'ENTER CONTROL ROOM' : 'CREATE & CONTINUE'} <Icon name="arrow" size={17}/></button></form>
      <Link className="back-store" to="/">← BACK TO STORE</Link><small>Products and settings are currently saved in this browser. Use Supabase/Firebase for shared live data.</small></div>
    </div>
  </div>;
}

function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyProduct);
  const [preview, setPreview] = useState(initial?.image || '');
  const [processing, setProcessing] = useState(false);
  useEffect(() => { setForm(initial || emptyProduct); setPreview(initial?.image || ''); }, [initial]);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const readFile = async e => {
    const file = e.target.files?.[0]; if (!file) return;
    try { setProcessing(true); const data = await compressImage(file); set('image', data); setPreview(data); }
    catch { alert('Could not read this image. Please use JPG, PNG or WEBP.'); }
    finally { setProcessing(false); }
  };
  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return alert('Name, price and image are required.');
    onSave({ ...form, price:Number(form.price), oldPrice:form.oldPrice ? Number(form.oldPrice) : null, stock:Number(form.stock)||0, sizes:Array.isArray(form.sizes) ? form.sizes : String(form.sizes).split(',').map(s=>s.trim()).filter(Boolean) });
  };

  return <form className="product-form-v2" onSubmit={submit}>
    <div className="form-grid-v2">
      <label>PRODUCT NAME<input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="e.g. Chrome Logo Tee"/></label>
      <label>CATEGORY<select value={form.category} onChange={e=>set('category',e.target.value)}><option>T-Shirts</option><option>Shirts</option><option>Jeans</option><option>Jackets</option><option>Accessories</option></select></label>
      <label>PRICE<input type="number" value={form.price} onChange={e=>set('price',e.target.value)}/></label>
      <label>OLD PRICE / MRP<input type="number" value={form.oldPrice || ''} onChange={e=>set('oldPrice',e.target.value)}/></label>
      <label>COLOR<input value={form.color} onChange={e=>set('color',e.target.value)} placeholder="Jet Black"/></label>
      <label>STOCK<input type="number" value={form.stock} onChange={e=>set('stock',e.target.value)}/></label>
      <label>BADGE<input value={form.badge || ''} onChange={e=>set('badge',e.target.value)} placeholder="NEW / LIMITED"/></label>
      <label>SIZES (comma separated)<input value={Array.isArray(form.sizes) ? form.sizes.join(', ') : form.sizes} onChange={e=>set('sizes',e.target.value)}/></label>
    </div>
    <label>DESCRIPTION<textarea rows="4" value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Fabric, fit, details..."/></label>
    <div className="upload-v2"><input id="upload-v2" type="file" accept="image/*" onChange={readFile}/><label htmlFor="upload-v2">{preview ? <img src={preview} alt="Preview"/> : <div><Icon name="camera" size={30}/><strong>{processing ? 'PROCESSING...' : 'UPLOAD PRODUCT PHOTO'}</strong><span>JPG / PNG / WEBP — automatically optimized</span></div>}</label>{preview && <button type="button" onClick={()=>{set('image','');setPreview('')}}>REMOVE IMAGE</button>}</div>
    <div className="form-actions-v2"><button type="button" className="btn-dark" onClick={onCancel}>CANCEL</button><button className="btn-metal">SAVE PRODUCT <Icon name="arrow" size={16}/></button></div>
  </form>;
}

function AdminDashboard() {
  const { products, addProduct, updateProduct, deleteProduct, settings, setSettings } = useStore();
  const [tab, setTab] = useState('products');
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const totalStock = products.reduce((s,p)=>s+Number(p.stock||0),0);
  const logout = () => { sessionStorage.removeItem('nvrmnd_admin_ok'); location.reload(); };

  return <div className="admin-shell-v2">
    <aside className="admin-side-v2">
      <Link to="/" className="admin-wordmark">NVRMND<span>✦</span></Link>
      <nav><button className={tab==='dashboard'?'active':''} onClick={()=>setTab('dashboard')}><Icon name="dashboard"/> OVERVIEW</button><button className={tab==='products'?'active':''} onClick={()=>setTab('products')}><Icon name="package"/> PRODUCTS</button><button className={tab==='settings'?'active':''} onClick={()=>setTab('settings')}><Icon name="settings"/> SETTINGS</button></nav>
      <div className="admin-side-bottom"><button onClick={()=>navigate('/')}><Icon name="eye"/> VIEW STORE</button><button onClick={logout}><Icon name="logout"/> LOGOUT</button></div>
    </aside>
    <main className="admin-main-v2">
      <div className="admin-top-v2"><div><span>NVRMND CONTROL ROOM</span><h1>{tab==='products'?'CATALOG':tab==='settings'?'STORE SETTINGS':'OVERVIEW'}</h1></div><div className="admin-badge">NV</div></div>

      {tab==='dashboard' && <><div className="stats-v2"><div><Icon name="package"/><span>TOTAL PRODUCTS</span><strong>{products.length}</strong></div><div><Icon name="bag"/><span>TOTAL STOCK</span><strong>{totalStock}</strong></div><div><Icon name="sparkle"/><span>CATEGORIES</span><strong>{new Set(products.map(p=>p.category)).size}</strong></div></div><div className="admin-card-v2"><h2>QUICK ACTIONS</h2><div className="quick-v2"><button onClick={()=>{setTab('products');setCreating(true);setEditing(null)}}><Icon name="plus"/> ADD PRODUCT</button><button onClick={()=>navigate('/')}><Icon name="eye"/> VIEW STOREFRONT</button></div></div></>}

      {tab==='products' && <div className="admin-card-v2"><div className="admin-card-head"><div><h2>PRODUCT CATALOG</h2><p>{products.length} products currently stored</p></div><button className="btn-metal compact" onClick={()=>{setCreating(true);setEditing(null)}}><Icon name="plus" size={16}/> ADD PRODUCT</button></div>
        {(creating || editing) && <div className="editor-v2"><h3>{editing ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h3><ProductForm initial={editing} onCancel={()=>{setCreating(false);setEditing(null)}} onSave={p=>{editing ? updateProduct(p) : addProduct(p); setCreating(false); setEditing(null)}}/></div>}
        <div className="admin-list-v2">{products.map(p=><div className="admin-product-v2" key={p.id}><img src={p.image} alt={p.name}/><div><strong>{p.name}</strong><span>{p.category} / {p.color}</span></div><span className="stock-v2">{p.stock} IN STOCK</span><b>{money(p.price,settings.currency)}</b><div className="row-buttons"><button onClick={()=>{setEditing(p);setCreating(false)}}><Icon name="pencil" size={15}/></button><button className="danger" onClick={()=>window.confirm(`Delete ${p.name}?`)&&deleteProduct(p.id)}><Icon name="trash" size={15}/></button></div></div>)}</div>
      </div>}

      {tab==='settings' && <div className="admin-card-v2 settings-v2"><h2>STORE SETTINGS</h2><label>CURRENCY<select value={settings.currency} onChange={e=>setSettings({...settings,currency:e.target.value})}><option>AED</option><option>INR</option><option>USD</option><option>GBP</option></select></label><label>ANNOUNCEMENT BAR<input value={settings.announcement} onChange={e=>setSettings({...settings,announcement:e.target.value})}/></label><label>INSTAGRAM<input value={settings.instagram} onChange={e=>setSettings({...settings,instagram:e.target.value})}/></label><label>CONTACT EMAIL<input value={settings.email} onChange={e=>setSettings({...settings,email:e.target.value})}/></label><div className="settings-note-v2"><Icon name="shield"/><div><strong>AUTO-SAVED LOCALLY</strong><span>This starter version saves catalog changes in the current browser. Connect a cloud database before public launch if multiple devices must share the same products.</span></div></div></div>}
    </main>
  </div>;
}

function Admin() {
  const [ok, setOk] = useState(() => sessionStorage.getItem('nvrmnd_admin_ok') === '1');
  return ok ? <AdminDashboard/> : <AdminLogin onLogin={()=>setOk(true)}/>;
}

function App() {
  return <StoreProvider><BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<Home/>}/></Routes></BrowserRouter></StoreProvider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

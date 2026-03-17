import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Tv, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook,
  Youtube,
  Menu,
  X,
  Moon,
  SunMedium,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Zap,
  MessageSquare,
  Star,
  ChevronRight,
  ChevronDown,
  Search,
  ArrowLeftRight,
  Quote,
  Sparkles,
  User,
  Cpu,
  Wind,
  Refrigerator,
  Microwave,
  Waves,
  UtensilsCrossed,
  Store,
  Filter,
  Leaf
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Categories', href: '#categories' },
    { name: 'Offers', href: '#offers' },
    { name: 'Stores', href: '#stores' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-xl py-4 shadow-xl' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 20 }}
            className="bg-brand-green p-2 rounded-xl shadow-lg shadow-brand-green/20"
          >
            <Leaf className="text-white w-6 h-6" />
          </motion.div>
          <span className={`text-xl md:text-2xl font-display font-black tracking-tighter ${scrolled || darkMode ? 'text-brand-dark dark:text-white' : 'text-white'}`}>
            GREEN<span className="text-brand-accent">NEST</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[11px] font-black uppercase tracking-[0.2em] relative group transition-colors ${scrolled || darkMode ? 'text-brand-dark/70 hover:text-brand-green dark:text-white/70' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-5 border-l border-gray-200 dark:border-white/10 pl-8">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${scrolled || darkMode ? 'hover:bg-gray-100 dark:hover:bg-gray-800 text-brand-dark dark:text-white' : 'hover:bg-white/10 text-white'}`}
            >
              {darkMode ? <SunMedium size={20} /> : <Moon size={20} />}
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-green text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-green/20"
            >
              Find Store
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button onClick={toggleDarkMode} className={scrolled || darkMode ? 'text-brand-dark dark:text-white' : 'text-white'}>
            {darkMode ? <SunMedium size={22} /> : <Moon size={22} />}
          </button>
          <button className={scrolled || darkMode ? 'text-brand-dark dark:text-white' : 'text-white'} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white dark:bg-brand-dark flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-2">
                <Leaf className="text-brand-green w-8 h-8" />
                <span className="text-2xl font-display font-black dark:text-white">GREEN<span className="text-brand-accent">NEST</span></span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full dark:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="text-4xl font-display font-black text-brand-dark dark:text-white hover:text-brand-green transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <button className="w-full bg-brand-green text-white py-6 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl shadow-brand-green/30">
                Find Store
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const slides = [
    {
      title: "Crystal Clear",
      highlight: "Entertainment.",
      subtext: "Premium Smart TVs with stunning 4K resolution at unbeatable prices.",
      img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1920",
      category: "Television"
    },
    {
      title: "Efficiency Meets",
      highlight: "Affordability.",
      subtext: "Top-tier washing machines and dryers for your modern home.",
      img: "https://images.unsplash.com/photo-1582733775062-eb9217dfd501?auto=format&fit=crop&q=80&w=1920",
      category: "Washing Machine"
    },
    {
      title: "Freshness Redefined",
      highlight: "Every Day.",
      subtext: "Energy-efficient refrigerators designed for modern living spaces.",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920",
      category: "Refrigerator"
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-brand-dark pt-20">
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div style={{ y }} className="absolute inset-0">
              <img 
                src={slides[currentSlide].img} 
                alt={slides[currentSlide].title} 
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 bg-brand-dark/60"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20 }
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-4 mb-6 md:mb-8"
              >
                <span className="w-12 md:w-16 h-[2px] bg-brand-accent"></span>
                <span className="text-brand-accent font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs">
                  {slides[currentSlide].category} • Factory Seconds
                </span>
              </motion.div>

              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.1] mb-6 md:mb-10"
              >
                {slides[currentSlide].title} <br />
                <span className="text-brand-accent">{slides[currentSlide].highlight}</span>
              </motion.h1>

              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-xl leading-relaxed font-medium"
              >
                {slides[currentSlide].subtext}
              </motion.p>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12 md:mb-20"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: '#0c3031' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-green text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl text-sm md:text-lg font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-green/40"
                >
                  Explore Products
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-brand-dark px-8 md:px-12 py-4 md:py-6 rounded-2xl text-sm md:text-lg font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                >
                  Find Store
                  <MapPin size={20} />
                </motion.button>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-6 md:gap-12"
              >
                {[
                  { icon: <ShieldCheck className="text-brand-accent w-5 h-5 md:w-6 md:h-6" />, text: "Warranty Included" },
                  { icon: <CheckCircle className="text-brand-accent w-5 h-5 md:w-6 md:h-6" />, text: "Quality Checked" },
                  { icon: <Zap className="text-brand-accent w-5 h-5 md:w-6 md:h-6" />, text: "Up to 60% Off" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-3 text-white font-bold tracking-wide">
                    {badge.icon}
                    <span className="text-[10px] md:text-sm uppercase tracking-widest">{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-20 hidden md:block">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300"
        >
          <ArrowLeftRight className="rotate-180" size={24} />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-20 hidden md:block">
        <button 
          onClick={nextSlide}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-300"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-12 bg-brand-accent' : 'w-4 bg-white/30'}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

const ValuePropStrip = () => {
  const items = [
    { icon: <Zap />, title: "UP TO 60% OFF", desc: "Unbeatable pricing on surplus stock" },
    { icon: <ShieldCheck />, title: "CERTIFIED QUALITY", desc: "Rigorous 40-point quality testing" },
    { icon: <CheckCircle />, title: "WARRANTY INCLUDED", desc: "Full peace of mind with every purchase" },
    { icon: <Truck />, title: "DIRECT FROM SOURCE", desc: "Sourced directly from manufacturers" }
  ];

  return (
    <section className="py-16 bg-brand-green text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-accent transition-colors duration-500">
                {item.icon}
              </div>
              <div>
                <h4 className="font-display font-black text-sm tracking-[0.1em] mb-1">{item.title}</h4>
                <p className="text-white/60 text-xs font-medium uppercase tracking-widest">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Categories = ({ setCategoryFilter }: { setCategoryFilter: (cat: string) => void }) => {
  const cats = [
    { name: "Washing Machines", icon: <Waves />, img: "https://images.unsplash.com/photo-1582733775062-eb9217dfd501?auto=format&fit=crop&q=80&w=800" },
    { name: "Refrigerators", icon: <Refrigerator />, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
    { name: "AC & Coolers", icon: <Wind />, img: "https://images.unsplash.com/photo-1631545729918-46c9756a7ca7?auto=format&fit=crop&q=80&w=800" },
    { name: "TVs", icon: <Tv />, img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800" },
    { name: "Microwaves", icon: <Microwave />, img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" },
    { name: "Mixer Grinders", icon: <Zap />, img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" }
  ];

  const handleCategoryClick = (catName: string) => {
    setCategoryFilter(catName);
    const element = document.getElementById('offers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-brand-green"></span>
            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.4em] text-brand-green">
              SHOP BY CATEGORY IMAGES
            </h2>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-display font-black text-brand-dark leading-tight"
          >
            Washing Machine / Refrigerator / AC / Microwave / Mixer / Cooler
          </motion.h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {cats.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-2xl shadow-black/5">
                <img 
                  src={cat.img} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/90 backdrop-blur-md flex items-center justify-center text-white mb-3 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {cat.icon}
                  </div>
                  <p className="text-white font-black uppercase tracking-widest text-[10px] leading-tight">
                    {cat.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductShowcase = ({ filter, setFilter }: { filter: string, setFilter: (cat: string) => void }) => {
  const [sortBy, setSortBy] = useState('default');

  const products = [
    { name: "Samsung 55\" 4K UHD Smart TV", category: "TVs", price: "₹34,999", oldPrice: "₹64,900", discount: "46%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800" },
    { name: "LG 8kg Front Load Washing Machine", category: "Washing Machines", price: "₹24,999", oldPrice: "₹42,900", discount: "41%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1582733775062-eb9217dfd501?auto=format&fit=crop&q=80&w=800" },
    { name: "Whirlpool 265L Double Door Fridge", category: "Refrigerators", price: "₹18,999", oldPrice: "₹32,990", discount: "42%", condition: "Refurbished", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
    { name: "Daikin 1.5 Ton 5 Star Inverter AC", category: "AC & Coolers", price: "₹32,999", oldPrice: "₹54,999", discount: "40%", condition: "Open Box", img: "https://images.unsplash.com/photo-1631545729918-46c9756a7ca7?auto=format&fit=crop&q=80&w=800" },
    { name: "Panasonic 27L Convection Microwave", category: "Microwaves", price: "₹12,499", oldPrice: "₹19,990", discount: "37%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" },
    { name: "Prestige 3 Jar Mixer Grinder", category: "Mixer Grinders", price: "₹2,999", oldPrice: "₹5,499", discount: "45%", condition: "Refurbished", img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" },
    { name: "Havells 25L Storage Water Heater", category: "Water Heaters", price: "₹7,499", oldPrice: "₹12,990", discount: "42%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&q=80&w=800" },
    { name: "Crompton High Speed Ceiling Fan", category: "Fans", price: "₹1,899", oldPrice: "₹3,499", discount: "46%", condition: "Open Box", img: "https://images.unsplash.com/photo-1591193516411-960fd76baaf2?auto=format&fit=crop&q=80&w=800" },
    { name: "Symphony 70L Desert Air Cooler", category: "AC & Coolers", price: "₹9,999", oldPrice: "₹15,900", discount: "37%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800" },
    { name: "Sony Bravia 65\" OLED TV", category: "TVs", price: "₹89,999", oldPrice: "₹1,49,900", discount: "40%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&q=80&w=800" },
    { name: "IFB 7kg Fully Automatic Washer", category: "Washing Machines", price: "₹19,499", oldPrice: "₹31,900", discount: "39%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1567113463300-102550d235c5?auto=format&fit=crop&q=80&w=800" }
  ];

  const categories = ['All', 'TVs', 'Washing Machines', 'Refrigerators', 'AC & Coolers', 'Microwaves', 'Mixer Grinders', 'Water Heaters', 'Fans'];

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[₹,]/g, ''));
  const parseDiscount = (discountStr: string) => parseInt(discountStr.replace('%', ''));

  const filteredProducts = useMemo(() => {
    let result = filter === 'All' ? products : products.filter(p => p.category === filter);
    
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'discount') {
      result = [...result].sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
    }
    
    return result;
  }, [filter, sortBy]);

  return (
    <section id="offers" className="py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-accent font-black uppercase tracking-[0.4em] text-xs mb-4 block"
            >
              Exclusive Deals
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-display font-black mb-8 dark:text-white">Featured <span className="text-brand-green">Offers</span></h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 px-4 border-r border-slate-200 dark:border-slate-800">
              <Filter size={16} className="text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort:</span>
            </div>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs font-black uppercase tracking-widest dark:text-white cursor-pointer pr-10"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p, i) => (
              <motion.div 
                layout
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white dark:bg-brand-dark/50 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={p.img} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-brand-accent text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {p.discount} OFF
                    </span>
                    <span className="bg-white/90 backdrop-blur-md text-brand-dark text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      {p.condition}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <span className="text-brand-green font-black uppercase tracking-widest text-[10px] mb-2 block">
                    {p.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-black mb-4 line-clamp-2 dark:text-white group-hover:text-brand-green transition-colors h-14">
                    {p.name}
                  </h3>
                  
                  <div className="flex items-end gap-3 mb-6">
                    <span className="text-2xl md:text-3xl font-display font-black text-brand-dark dark:text-white">{p.price}</span>
                    <span className="text-sm md:text-base text-gray-400 line-through mb-1 font-bold">{p.oldPrice}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-brand-dark dark:bg-white dark:text-brand-dark text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors">
                      Details
                    </button>
                    <a 
                      href={`https://wa.me/919876543210?text=I'm interested in ${p.name}`}
                      target="_blank"
                      className="bg-[#25D366] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
                    >
                      <MessageSquare size={14} fill="currentColor" />
                      Enquire
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const AboutTrust = () => {
  return (
    <section id="about" className="py-32 bg-brand-bg dark:bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl h-[700px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                alt="Green Nest Quality Assurance" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-accent flex items-center justify-center text-white">
                      <ShieldCheck size={28} />
                    </div>
                    <h4 className="text-2xl font-display font-black text-white">Certified Quality</h4>
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed">Every appliance undergoes a rigorous 40-point testing process before it reaches your home.</p>
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl -z-10"></div>
          </div>

          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-accent font-black uppercase tracking-[0.4em] text-xs mb-6 block"
            >
              The Green Nest Standard
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-10 dark:text-white leading-[1.1]">Direct from <br />Manufacturers. <br /><span className="text-brand-green">Honest Pricing.</span></h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed font-medium">
              We source directly from manufacturers and authorized distributors, offering fully functional appliances at significantly reduced prices. Our mission is to provide high-end home comfort without the premium price tag.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
              {[
                { title: "Honest Pricing", desc: "No hidden costs, just pure value." },
                { title: "No Hidden Costs", desc: "Transparent billing every time." },
                { title: "Tested & Verified", desc: "40-point rigorous quality check." },
                { title: "Warranty Support", desc: "Dedicated after-sales service." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-lg dark:text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-green text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-brand-dark transition-all shadow-2xl shadow-brand-green/20"
            >
              Learn More About Us
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoreLocations = () => {
  const stores = [
    { name: "Indiranagar Experience Hub", address: "123, 100 Feet Rd, Indiranagar, Bangalore", timing: "10:00 AM - 9:00 PM", phone: "+91 98765 43210" },
    { name: "Whitefield Mega Store", address: "45, ITPL Main Rd, Whitefield, Bangalore", timing: "10:30 AM - 9:30 PM", phone: "+91 98765 43211" },
    { name: "Jayanagar Outlet", address: "89, 4th Block, Jayanagar, Bangalore", timing: "10:00 AM - 8:30 PM", phone: "+91 98765 43212" }
  ];

  return (
    <section id="stores" className="py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-accent font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Our Presence
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 dark:text-white">Visit Our <span className="text-brand-green">Stores</span></h2>
          <div className="w-24 h-1 bg-brand-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stores.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="bg-brand-bg dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-10 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                <MapPin size={32} />
              </div>
              <h3 className="text-3xl font-display font-black mb-6 dark:text-white leading-tight">{s.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">{s.address}</p>
              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                  <Zap size={16} className="text-brand-accent" />
                  <span>Open: {s.timing}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                  <Phone size={16} className="text-brand-accent" />
                  <span>{s.phone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button className="w-full py-4 rounded-2xl bg-brand-green text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20">
                  <MapPin size={16} />
                  Open in Maps
                </button>
                <button className="w-full py-4 rounded-2xl bg-white dark:bg-slate-800 text-brand-dark dark:text-white font-black uppercase tracking-widest text-xs border border-slate-200 dark:border-slate-700">
                  Call Store
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Rahul Verma", role: "Home Owner", text: "Got a premium Samsung TV at 40% off. The quality is indistinguishable from new. Highly impressed with the service!", img: "https://i.pravatar.cc/150?u=rahul" },
    { name: "Sneha Kapoor", role: "Interior Designer", text: "I recommend Green Nest to all my clients looking for high-end appliances on a budget. Their refrigerators are top-notch.", img: "https://i.pravatar.cc/150?u=sneha" },
    { name: "Amit Patel", role: "Tech Reviewer", text: "The 40-point quality check is no joke. Every appliance I've seen here is in excellent functional condition.", img: "https://i.pravatar.cc/150?u=amit" }
  ];

  return (
    <section className="py-32 bg-brand-bg dark:bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
            </div>
            <span className="font-black text-brand-dark dark:text-white uppercase tracking-widest text-sm">4.9/5 Google Rating</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 dark:text-white">Trusted by <span className="text-brand-green">5000+</span> <br />Happy Customers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-12 bg-white dark:bg-slate-900 rounded-[3.5rem] relative group shadow-xl"
            >
              <Quote className="absolute top-10 right-10 text-brand-green/5 w-24 h-24" />
              <div className="flex items-center gap-5 mb-10">
                <img src={r.img} alt={r.name} className="w-16 h-16 rounded-full object-cover border-4 border-brand-green/10" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xl font-display font-black dark:text-white">{r.name}</h4>
                  <p className="text-xs text-brand-green font-black uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic text-lg font-medium">"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-32 bg-brand-green relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-accent/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-black text-white mb-10 leading-tight"
        >
          Upgrade Your Home <br />for Less Today
        </motion.h2>
        <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
          Don't settle for less. Get the premium appliances you've always wanted at prices you'll love. Visit our store or enquire online.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-brand-green px-12 py-6 rounded-2xl text-lg font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl"
          >
            <Phone size={24} />
            Call Now
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#e65f00' }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-accent text-white px-12 py-6 rounded-2xl text-lg font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl"
          >
            <MessageSquare size={24} />
            WhatsApp
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-6 rounded-2xl text-lg font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all"
          >
            <Store size={24} />
            Visit Store
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    { title: "Best Budget Appliances for Your New Home", date: "Mar 15, 2026", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600" },
    { title: "Refurbished vs New: What You Need to Know", date: "Mar 12, 2026", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
    { title: "Ultimate Buying Guide for Smart Refrigerators", date: "Mar 10, 2026", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <section id="blog" className="py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-accent font-black uppercase tracking-[0.4em] text-xs mb-4 block"
            >
              Expert Advice
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-display font-black dark:text-white leading-tight">Buying <span className="text-brand-green">Guides</span></h2>
          </div>
          <button className="text-brand-green font-black uppercase tracking-widest text-sm flex items-center gap-3 group">
            View All Posts <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((p, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="h-80 rounded-[3rem] overflow-hidden mb-8 shadow-xl">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              </div>
              <p className="text-brand-green font-black uppercase tracking-widest text-xs mb-4">{p.date}</p>
              <h3 className="text-2xl font-display font-black dark:text-white group-hover:text-brand-green transition-colors leading-tight">{p.title}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-brand-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-accent font-black uppercase tracking-[0.4em] text-xs mb-6 block"
            >
              Connect With Us
            </motion.span>
            <h2 className="text-6xl font-display font-black mb-10 leading-tight">Get In <br /><span className="text-brand-green">Touch</span></h2>
            <p className="text-slate-400 text-xl mb-16 max-w-md leading-relaxed font-medium">
              Have a question about a product? Or need help with your order? Our expert team is ready to assist you.
            </p>
            
            <div className="space-y-10">
              {[
                { icon: <Phone />, label: "Call Us", val: "+91 98765 43210" },
                { icon: <Mail />, label: "Email Us", val: "support@greennest.in" },
                { icon: <MapPin />, label: "Visit Our Store", val: "Green Nest Hub, Indiranagar, Bangalore" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{item.label}</p>
                    <p className="text-2xl font-display font-black">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 flex gap-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -5, backgroundColor: '#0F3D3E' }}
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 p-16 rounded-[4rem] text-brand-dark dark:text-white shadow-2xl"
          >
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                  <input type="text" className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-green transition-all font-bold" placeholder="John Doe" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                  <input type="email" className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-green transition-all font-bold" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Enquiry Type</label>
                <select className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-green transition-all font-bold appearance-none">
                  <option>Product Availability</option>
                  <option>Order Status</option>
                  <option>Warranty Claim</option>
                  <option>Bulk/Corporate Enquiry</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Message</label>
                <textarea rows={4} className="w-full px-8 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-green transition-all font-bold" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-brand-green text-white py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-brand-dark transition-all shadow-2xl shadow-brand-green/20">
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-green/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-brand-green p-2 rounded-xl">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-black tracking-tighter">
                GREEN<span className="text-brand-accent">NEST</span>
              </span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm">
              India's most trusted destination for premium refurbished and surplus home appliances. Quality you can feel, prices you'll love.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  whileHover={{ y: -5, backgroundColor: '#00FF94', color: '#0F3D3E' }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-10">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Stores', 'Sustainability', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-white transition-colors font-medium flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-brand-accent mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-10">Shop</h4>
            <ul className="space-y-4">
              {['Televisions', 'Washing Machines', 'Refrigerators', 'Air Conditioners', 'Kitchen'].map(item => (
                <li key={item}>
                  <a href="#categories" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-brand-accent mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-brand-green mb-10">Newsletter</h4>
            <p className="text-slate-400 mb-8 font-medium">Get exclusive early access to our biggest surplus drops and appliance guides.</p>
            <form className="relative group">
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-green transition-all font-bold placeholder:text-slate-600" 
                placeholder="Enter your email" 
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-green text-white px-8 rounded-xl hover:bg-brand-accent transition-all font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-green/20">
                Subscribe
              </button>
            </form>
            <div className="mt-8 flex items-center gap-4 text-slate-500 text-xs font-bold">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span>Join 5,000+ happy subscribers</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © {currentYear} Green Nest Private Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Warranty Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen selection:bg-brand-green selection:text-white ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <ValuePropStrip />
      <Categories setCategoryFilter={setCategoryFilter} />
      <ProductShowcase filter={categoryFilter} setFilter={setCategoryFilter} />
      <AboutTrust />
      <StoreLocations />
      <Testimonials />
      <CTASection />
      <Blog />
      <Contact />
      <Footer />

      {/* Sticky WhatsApp Button */}
      <motion.a 
        href="https://wa.me/919876543210"
        target="_blank"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-10 right-10 z-[100] w-16 h-16 md:w-20 md:h-20 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-900/40"
      >
        <MessageSquare size={32} fill="currentColor" className="md:w-10 md:h-10" />
        <span className="absolute -top-1 -left-1 w-4 h-4 md:w-6 md:h-6 bg-brand-accent rounded-full animate-ping"></span>
      </motion.a>
    </div>
  );
}

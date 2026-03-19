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
  ChevronLeft,
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
  Leaf,
  Home,
  Plus,
  Minus,
  RotateCcw,
  Settings,
  Share2,
  Copy,
  ExternalLink
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// --- Content Imports ---
import heroData from "./content/home/hero-text.json";
import heroSlides from "./content/home/hero-slides.json";
import servicesData from "./content/home/services.json";
import testimonialsData from "./content/home/testimonials.json";
import storesData from "./content/home/stores.json";
import blogData from "./content/home/blog.json";
import navbarData from "./content/home/navbar.json";
import footerData from "./content/home/footer.json";
import productsData from "./content/products/product-list.json";
import whyChooseUsData from "./content/home/why-choose-us.json";
import categoriesData from "./content/home/categories.json";
import ctaData from "./content/home/cta-section.json";
import contactData from "./content/home/contact.json";
import aboutData from "./content/home/about.json";
import galleryData from "./content/home/product-gallery.json";
import showcaseData from "./content/home/product-showcase.json";

// --- Components ---

const ShareMenu = ({ darkMode }: { darkMode: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Green Nest - Premium Home Solutions',
          text: 'Check out Green Nest for premium home appliances!',
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { name: 'WhatsApp', icon: <MessageSquare size={18} />, href: `https://wa.me/?text=${encodeURIComponent('Check out Green Nest: ' + url)}` },
    { name: 'Facebook', icon: <Facebook size={18} />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <div className="relative">
      <button 
        onClick={handleShare}
        className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-theme-card text-theme-text' : 'hover:bg-theme-bg text-theme-text'}`}
      >
        <Share2 size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[190]"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute right-0 mt-4 w-64 rounded-2xl shadow-2xl border p-4 z-[200] bg-theme-card border-theme-border text-theme-text`}
            >
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Share Website</h4>
              <div className="space-y-2">
                {shareOptions.map((option) => (
                  <a 
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-theme-bg`}
                  >
                    {option.icon}
                    <span className="text-sm font-bold">{option.name}</span>
                    <ExternalLink size={14} className="ml-auto opacity-30" />
                  </a>
                ))}
                <button 
                  onClick={copyToClipboard}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-theme-bg`}
                >
                  <Copy size={18} />
                  <span className="text-sm font-bold">{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ darkMode, toggleDarkMode, isOpen, setIsOpen }: { darkMode: boolean, toggleDarkMode: () => void, isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconMap: Record<string, any> = {
    Home: <Home size={20} />,
    ShoppingBag: <ShoppingBag size={20} />,
    Zap: <Zap size={20} />,
    MapPin: <MapPin size={20} />,
    CheckCircle: <CheckCircle size={20} />,
    Mail: <Mail size={20} />,
    MessageSquare: <MessageSquare size={20} />,
    Store: <Store size={20} />
  };

  const navLinks = navbarData.links.map(link => ({
    ...link,
    icon: iconMap[link.icon as string] || <Zap size={20} />
  }));

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-theme-nav/90 backdrop-blur-xl py-4 shadow-xl border-b border-theme-border' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <motion.div 
            whileHover={{ rotate: 20 }}
            className="bg-brand-green p-2 rounded-xl shadow-lg shadow-brand-green/20"
          >
            <Leaf className="text-white w-6 h-6" />
          </motion.div>
          <span className={`text-xl md:text-2xl font-display font-bold tracking-tighter text-theme-text`}>
            {navbarData.brand.first}<span className="text-brand-green">{navbarData.brand.second}</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] relative group transition-colors font-accent text-theme-text/80 hover:text-theme-text`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.div>
          
          <div className="flex items-center gap-5 border-l border-theme-border pl-8">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors hover:bg-theme-card text-theme-text`}
            >
              {darkMode ? <SunMedium size={20} /> : <Moon size={20} />}
            </button>
            <ShareMenu darkMode={darkMode} />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-green text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-green/20 font-accent"
            >
              {navbarData.cta.text}
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button onClick={toggleDarkMode} className="text-theme-text">
            {darkMode ? <SunMedium size={22} /> : <Moon size={22} />}
          </button>
          <ShareMenu darkMode={darkMode} />
          <button className="text-theme-text" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-theme-bg/60 backdrop-blur-sm z-[110] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm z-[120] bg-theme-card shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 flex justify-between items-center border-b border-theme-border">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-green p-1 rounded-lg">
                    <Leaf className="text-white w-4 h-4" />
                  </div>
                  <span className="text-lg font-display font-black text-theme-text tracking-tighter">
                    {navbarData.brand.first}<span className="text-brand-green">{navbarData.brand.second}</span>
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-theme-bg rounded-full text-theme-text hover:bg-theme-card transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <motion.a 
                      key={link.name} 
                      href={link.href} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => setIsOpen(false)} 
                      className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-theme-text hover:bg-brand-green/5 hover:text-brand-green transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-theme-bg flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                        {link.icon}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest">{link.name}</span>
                      <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Drawer Footer / CTA */}
              <div className="p-4 border-t border-theme-border bg-theme-bg/50">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-green text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand-green/20 flex items-center justify-center gap-2"
                >
                  {iconMap[navbarData.cta.icon] || <Store size={16} />}
                  {navbarData.cta.text}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[var(--bg-color)] overflow-hidden pt-20">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-bg to-theme-card z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-12 lg:py-24">
        <div className="relative h-[600px] md:h-[500px] lg:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Side: Text Content */}
              <div className="order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <span className="w-10 h-[2px] bg-brand-green" />
                  <span className="text-brand-green font-accent font-bold uppercase tracking-[0.3em] text-xs">
                    {heroSlides[currentSlide].brand} • {heroSlides[currentSlide].product}
                  </span>
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-theme-text leading-[1.1] mb-6 tracking-tight">
                  {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i} className={i === 2 ? "text-brand-green" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                
                <p className="text-lg md:text-xl text-theme-text/60 mb-10 max-w-lg leading-relaxed font-medium">
                  {heroSlides[currentSlide].subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary px-10 py-5 text-sm"
                  >
                    {heroSlides[currentSlide].cta}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary px-10 py-5 text-sm shadow-sm"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>

              {/* Right Side: Product Image */}
              <div className="order-1 lg:order-2 relative group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="relative aspect-square md:aspect-video lg:aspect-square max-w-xl mx-auto"
                >
                  {/* Image Container with Zoom Effect */}
                  <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-theme-card relative z-10">
                    <motion.img 
                      key={heroSlides[currentSlide].img}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 4, ease: "easeOut" }}
                      src={heroSlides[currentSlide].img} 
                      alt={heroSlides[currentSlide].product} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Decorative Background Elements */}
                  <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10 animate-pulse" />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-green/5 rounded-full blur-2xl -z-10" />
                </motion.div>
                
                {/* Brand Tag Overlay */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-10 right-0 bg-theme-card px-6 py-3 rounded-2xl shadow-xl z-20 border border-theme-border"
                >
                  <span className="text-brand-green font-black uppercase tracking-widest text-xs">
                    {heroSlides[currentSlide].brand}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-between mt-12">
          {/* Dots */}
          <div className="flex gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSlide(i);
                }}
                className={`h-2 transition-all duration-500 rounded-full ${currentSlide === i ? 'w-12 bg-brand-green' : 'w-2 bg-theme-text/20 hover:bg-brand-green/50'}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 rounded-2xl bg-theme-card border border-theme-border flex items-center justify-center text-theme-text hover:bg-brand-green hover:text-white transition-all shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 rounded-2xl bg-theme-card border border-theme-border flex items-center justify-center text-theme-text hover:bg-brand-green hover:text-white transition-all shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValuePropStrip = () => {
  const iconMap: Record<string, any> = {
    Truck: <Truck />,
    ShieldCheck: <ShieldCheck />,
    RotateCcw: <RotateCcw />,
    Settings: <Settings />
  };

  return (
    <section className="py-20 bg-brand-green text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {servicesData.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:rotate-12 transition-all duration-500 shadow-xl">
                {iconMap[item.icon] || <Zap />}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm tracking-[0.1em] mb-1 uppercase font-accent">{item.title}</h4>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest leading-relaxed font-accent">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const iconMap: Record<string, any> = {
    Leaf: <Leaf className="text-brand-green" />,
    Zap: <Zap className="text-brand-green" />,
    MessageSquare: <MessageSquare className="text-brand-green" />
  };

  return (
    <section className="py-24 bg-theme-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-brand-green font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
              {whyChooseUsData.tagline}
            </span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ opacity: 0, y: "100%", skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-4xl md:text-5xl font-display font-extrabold mb-6 text-theme-text"
            >
              {whyChooseUsData.title.main} <span className="text-brand-green">{whyChooseUsData.title.highlight}</span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-theme-text/70 font-medium text-lg"
          >
            {whyChooseUsData.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {whyChooseUsData.reasons.map((reason, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className="bg-theme-card p-10 rounded-[2.5rem] shadow-xl shadow-black/5 border border-theme-border hover:border-brand-green transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                {iconMap[reason.icon] || <Zap className="text-brand-green" />}
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-theme-text">{reason.title}</h3>
              <p className="text-theme-text/60 text-base leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Categories = ({ setCategoryFilter }: { setCategoryFilter: (cat: string) => void }) => {
  const iconMap: Record<string, any> = {
    Waves: <Waves />,
    Refrigerator: <Refrigerator />,
    Wind: <Wind />,
    Tv: <Tv />,
    Microwave: <Microwave />,
    Zap: <Zap />
  };

  const handleCategoryClick = (catName: string) => {
    setCategoryFilter(catName);
    const element = document.getElementById('offers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-24 md:py-32 bg-[var(--bg-color)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-brand-green"></span>
            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.4em] text-brand-green">
              {categoriesData.tagline}
            </h2>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h3 
              initial={{ opacity: 0, y: "100%", skewY: 2 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-theme-text leading-tight max-w-4xl"
            >
              {categoriesData.title.main} <span className="text-brand-green underline decoration-brand-green/30 underline-offset-8">{categoriesData.title.highlight}</span> {categoriesData.title.end}
            </motion.h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 md:gap-8">
          {categoriesData.list.map((cat, i) => (
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
                  <div className="w-10 h-10 rounded-xl bg-brand-green/90 backdrop-blur-md flex items-center justify-center text-white mb-3 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {iconMap[cat.icon] || <Zap />}
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
  const [brandFilter, setBrandFilter] = useState('All');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productName: string, delta: number) => {
    setProductQuantities(prev => {
      const currentQty = prev[productName] || 1;
      const newQty = Math.max(1, Math.min(10, currentQty + delta));
      return { ...prev, [productName]: newQty };
    });
  };

  const products = productsData;

  const categories = ['All', 'TVs', 'Washing Machines', 'Refrigerators', 'AC & Coolers', 'Microwaves', 'Induction Stoves', 'Mixer Grinders'];
  const brands = ['All', ...new Set(products.map(p => p.brand))].sort();
  const conditions = ['All', 'Factory Second', 'Surplus Stock', 'Refurbished', 'Open Box'];

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[₹,]/g, ''));
  const parseDiscount = (discountStr: string) => parseInt(discountStr.replace('%', ''));

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (filter !== 'All') {
      result = result.filter(p => p.category === filter);
    }
    
    if (brandFilter !== 'All') {
      result = result.filter(p => p.brand === brandFilter);
    }
    
    if (conditionFilter !== 'All') {
      result = result.filter(p => p.condition === conditionFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }
    
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'discount') {
      result = [...result].sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
    }
    
    return result;
  }, [filter, brandFilter, conditionFilter, searchQuery, sortBy]);

  const clearFilters = () => {
    setFilter('All');
    setBrandFilter('All');
    setConditionFilter('All');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <section id="offers" className="py-32 bg-[var(--bg-color)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-brand-green font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                {showcaseData.tagline}
              </span>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ opacity: 0, y: "100%", skewY: 3 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-5xl md:text-6xl font-display font-black mb-8 text-theme-text"
              >
                {showcaseData.title.main} <span className="text-brand-green">{showcaseData.title.highlight}</span>
              </motion.h2>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-theme-bg text-theme-text/50 hover:bg-theme-card'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text/40" size={18} />
              <input 
                type="text"
                placeholder={showcaseData.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-theme-bg border border-theme-border rounded-2xl pl-12 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-brand-green text-theme-text transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-theme-bg rounded-2xl border border-theme-border">
              <span className="text-[10px] font-black uppercase tracking-widest text-theme-text/40">Showing:</span>
              <span className="text-xs font-black text-theme-text">{filteredProducts.length} Products</span>
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${showFilters ? 'bg-theme-text text-theme-bg border-theme-text' : 'bg-theme-card text-theme-text border-theme-border'}`}
            >
              <Filter size={16} />
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </motion.button>

            <div className="flex items-center gap-4 bg-theme-bg p-2 rounded-2xl border border-theme-border">
              <div className="flex items-center gap-2 px-4 border-r border-theme-border">
                <ArrowLeftRight size={16} className="text-theme-text/40 rotate-90" />
                <span className="text-[10px] font-black uppercase tracking-widest text-theme-text/40">{showcaseData.sorting.label}</span>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-xs font-black uppercase tracking-widest text-theme-text cursor-pointer pr-10"
              >
                {showcaseData.sorting.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-16"
            >
              <div className="bg-theme-bg p-8 md:p-10 rounded-[2.5rem] border border-theme-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-6">{showcaseData.filters.brand}</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(brand => (
                        <button 
                          key={brand}
                          onClick={() => setBrandFilter(brand)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${brandFilter === brand ? 'bg-brand-green text-white' : 'bg-theme-card text-theme-text/60 border border-theme-border hover:border-brand-green'}`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-6">{showcaseData.filters.condition}</h4>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map(cond => (
                        <button 
                          key={cond}
                          onClick={() => setConditionFilter(cond)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${conditionFilter === cond ? 'bg-brand-green text-white' : 'bg-theme-card text-theme-text/60 border border-theme-border hover:border-brand-green'}`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-end">
                    <button 
                      onClick={clearFilters}
                      className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-green hover:text-theme-text transition-colors"
                    >
                      <X size={14} />
                      {showcaseData.filters.clear}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Active Filter Badges */}
        {(brandFilter !== 'All' || conditionFilter !== 'All' || filter !== 'All' || searchQuery !== '') && (
          <div className="flex flex-wrap gap-3 mb-10">
            {filter !== 'All' && (
              <span className="flex items-center gap-2 px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-full text-[11px] font-bold uppercase tracking-widest font-accent">
                Category: {filter}
                <X size={14} className="cursor-pointer" onClick={() => setFilter('All')} />
              </span>
            )}
            {brandFilter !== 'All' && (
              <span className="flex items-center gap-2 px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-full text-[11px] font-bold uppercase tracking-widest font-accent">
                Brand: {brandFilter}
                <X size={14} className="cursor-pointer" onClick={() => setBrandFilter('All')} />
              </span>
            )}
            {conditionFilter !== 'All' && (
              <span className="flex items-center gap-2 px-5 py-2.5 bg-brand-green/10 text-brand-green rounded-full text-[11px] font-bold uppercase tracking-widest font-accent">
                Condition: {conditionFilter}
                <X size={14} className="cursor-pointer" onClick={() => setConditionFilter('All')} />
              </span>
            )}
            {searchQuery !== '' && (
              <span className="flex items-center gap-2 px-5 py-2.5 bg-theme-text/10 text-theme-text/60 rounded-full text-[11px] font-bold uppercase tracking-widest font-accent">
                Search: {searchQuery}
                <X size={14} className="cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, i) => (
                <motion.div 
                  layout
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group bg-theme-card rounded-[2rem] overflow-hidden border border-theme-border hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-brand-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg font-accent">
                        {p.discount} OFF
                      </span>
                      <span className="bg-theme-card/95 backdrop-blur-md text-theme-text text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg font-accent">
                        {p.condition}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-theme-card/60 backdrop-blur-md text-theme-text text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] border border-theme-border font-accent">
                        {p.brand}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <span className="text-brand-green font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block font-accent">
                      {p.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-4 line-clamp-2 text-theme-text group-hover:text-brand-green transition-colors h-16 leading-tight">
                      {p.name}
                    </h3>
                    
                    <div className="flex items-end justify-between gap-3 mb-8">
                      <div className="flex flex-col">
                        <span className="text-3xl md:text-4xl font-display font-extrabold text-theme-text tracking-tight">{p.price}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-theme-text/40 line-through font-semibold">{p.oldPrice}</span>
                          <span className="text-brand-green text-xs font-black uppercase tracking-widest">{p.discount} OFF</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-theme-bg rounded-xl p-1 border border-theme-border">
                          <button 
                            onClick={() => handleQuantityChange(p.name, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-theme-card text-theme-text transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-theme-text">
                            {productQuantities[p.name] || 1}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(p.name, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-theme-card text-theme-text transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedProduct(p)}
                          className="flex-1 bg-theme-text text-theme-bg py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-green hover:text-white transition-colors font-accent"
                        >
                          {showcaseData.details.button}
                        </button>
                      </div>

                      <a 
                        href={`https://wa.me/919876543210?text=I'm interested in ${p.name} (Quantity: ${productQuantities[p.name] || 1})`}
                        target="_blank"
                        className="bg-[#25D366] text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors font-accent w-full"
                      >
                        <MessageSquare size={16} fill="currentColor" />
                        {showcaseData.details.whatsapp}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-20 h-20 bg-theme-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-theme-text/40" />
                </div>
                <h3 className="text-2xl font-display font-black text-theme-text mb-4">{showcaseData.empty.title}</h3>
                <p className="text-theme-text/60 mb-8 max-w-md mx-auto">{showcaseData.empty.description}</p>
                <button 
                  onClick={clearFilters}
                  className="bg-brand-green text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-green/20"
                >
                  {showcaseData.empty.button}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-theme-card rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-theme-border"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white md:text-theme-text md:bg-theme-bg hover:bg-brand-green hover:text-white transition-all border border-theme-border"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative">
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent md:hidden"></div>
              </div>

              <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-brand-green/10 text-brand-green text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-accent">
                    {selectedProduct.category}
                  </span>
                  <span className="bg-theme-text/10 text-theme-text text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-accent">
                    {selectedProduct.condition}
                  </span>
                  <span className="bg-brand-green/10 text-brand-green text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-accent border border-brand-green/10">
                    {selectedProduct.brand}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-theme-text leading-tight tracking-tight">
                  {selectedProduct.name}
                </h3>
                
                <p className="text-theme-text/60 mb-8 leading-relaxed font-medium text-lg">
                  {selectedProduct.desc}
                </p>

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-theme-bg rounded-2xl border border-theme-border">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-theme-text/40 mb-1">Condition</h4>
                    <p className="text-sm font-bold text-theme-text">{selectedProduct.condition}</p>
                  </div>
                  <div className="p-4 bg-theme-bg rounded-2xl border border-theme-border">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-theme-text/40 mb-1">Brand</h4>
                    <p className="text-sm font-bold text-theme-text">{selectedProduct.brand}</p>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-brand-green/10 rounded-2xl border border-brand-green/10">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-green mb-3 flex items-center gap-2 font-accent">
                    <ShieldCheck size={16} />
                    {showcaseData.details.warrantyLabel}
                  </h4>
                  <p className="text-base font-bold text-theme-text">
                    {selectedProduct.warranty}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-theme-text/40 uppercase tracking-widest mb-1 font-accent">{showcaseData.details.priceLabel}</span>
                      <span className="text-4xl md:text-5xl font-display font-extrabold text-theme-text tracking-tight">{selectedProduct.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-theme-text/40 uppercase tracking-widest mb-1 font-accent">{showcaseData.details.mrpLabel}</span>
                      <span className="text-xl text-theme-text/40 line-through font-bold">{selectedProduct.oldPrice}</span>
                    </div>
                    <div className="ml-auto bg-brand-green text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest font-accent shadow-lg shadow-brand-green/20">
                      {selectedProduct.discount} OFF
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <a 
                      href={`https://wa.me/919876543210?text=I'm interested in ${selectedProduct.name}`}
                      target="_blank"
                      className="bg-[#25D366] text-white py-6 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-xl shadow-[#25D366]/20 font-accent"
                    >
                      <MessageSquare size={24} fill="currentColor" />
                      {showcaseData.details.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProductGallery = () => {
  return (
    <section className="py-32 bg-theme-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-green font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            {galleryData.tagline}
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-theme-text mb-6">{galleryData.title.main} <span className="text-brand-green">{galleryData.title.highlight}</span></h2>
          <p className="text-theme-text/60 font-medium max-w-2xl mx-auto">{galleryData.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[800px]">
          {galleryData.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-[3rem] group min-h-[300px] ${item.span}`}
            >
              <img 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/90 via-theme-bg/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute bottom-10 left-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tight mb-2">{item.name}</h3>
                  <div className="w-12 h-1 bg-brand-green rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutTrust = () => {
  return (
    <section id="about" className="py-32 bg-theme-bg transition-colors duration-500 overflow-hidden">
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
                src={aboutData.image} 
                alt="Green Nest Quality Assurance" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/60 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-white">
                      <ShieldCheck size={28} />
                    </div>
                    <h4 className="text-2xl font-display font-black text-white">{aboutData.badge.title}</h4>
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed">{aboutData.badge.description}</p>
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
          </div>

          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-green font-bold uppercase tracking-[0.3em] text-xs mb-6 block font-accent"
            >
              {aboutData.tagline}
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-display font-extrabold mb-10 text-theme-text leading-[0.95] tracking-tighter">{aboutData.title.main} <br /><span className="text-brand-green">{aboutData.title.highlight}</span></h2>
            <p className="text-xl text-theme-text/70 mb-12 leading-relaxed font-medium">
              {aboutData.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
              {aboutData.features.map((item, i) => (
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
                    <h4 className="font-display font-bold text-lg text-theme-text mb-2">{item.title}</h4>
                    <p className="text-sm text-theme-text/60 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-green text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-brand-dark transition-all shadow-2xl shadow-brand-green/20"
            >
              {aboutData.buttonText}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoreLocations = () => {
  return (
    <section id="stores" className="py-32 bg-theme-bg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-green font-accent font-bold uppercase tracking-[0.5em] text-xs mb-4 block"
          >
            {storesData.tagline}
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-8 text-theme-text tracking-tight">{storesData.title.main} <span className="text-brand-green">{storesData.title.highlight}</span></h2>
          <div className="w-24 h-1 bg-brand-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {storesData.list.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="bg-theme-card rounded-[3.5rem] shadow-xl hover:shadow-2xl transition-all border border-theme-border group overflow-hidden"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={s.img} 
                  alt={s.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-theme-bg/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-10">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-theme-text leading-tight tracking-tight">{s.name}</h3>
                <p className="text-theme-text/60 mb-6 font-medium leading-relaxed text-base">{s.address}</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-theme-text/60 text-xs font-bold uppercase tracking-widest font-accent">
                    <Zap size={16} className="text-brand-green" />
                    <span>Open: {s.timing}</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-text/60 text-xs font-bold uppercase tracking-widest font-accent">
                    <Phone size={16} className="text-brand-green" />
                    <span>{s.phone}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="w-full py-5 rounded-xl bg-brand-green text-white font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20 font-accent">
                    <MapPin size={16} />
                    Open in Maps
                  </button>
                  <button className="w-full py-5 rounded-xl bg-theme-card text-theme-text font-bold uppercase tracking-widest text-[11px] border border-theme-border font-accent">
                    Call Store
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 bg-theme-bg transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="currentColor" />)}
            </div>
            <span className="font-bold text-theme-text uppercase tracking-[0.2em] text-sm font-accent">{testimonialsData.rating}</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-8 text-theme-text tracking-tight">{testimonialsData.title.main} <span className="text-brand-green">{testimonialsData.title.highlight}</span> <br />{testimonialsData.title.end}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonialsData.list.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-12 bg-theme-card rounded-[3.5rem] relative group shadow-xl border border-theme-border"
            >
              <Quote className="absolute top-10 right-10 text-brand-green/5 w-24 h-24" />
              <div className="flex items-center gap-5 mb-10">
                <img src={r.img} alt={r.name} className="w-16 h-16 rounded-full object-cover border-4 border-brand-green/10" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xl font-display font-bold text-theme-text tracking-tight">{r.name}</h4>
                  <p className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] font-accent">{r.role}</p>
                </div>
              </div>
              <p className="text-theme-text/60 leading-relaxed italic text-xl font-medium">"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const CTASection = () => {
  const iconMap: Record<string, any> = {
    Phone: <Phone size={24} />,
    MessageSquare: <MessageSquare size={24} />,
    Store: <Store size={24} />
  };

  return (
    <section className="py-32 bg-brand-green relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-green/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-display font-extrabold text-white mb-10 leading-[1.1] tracking-tighter"
        >
          {ctaData.title.top} <br />{ctaData.title.bottom}
        </motion.h2>
        <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto font-normal leading-relaxed">
          {ctaData.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          {ctaData.buttons.map((btn, i) => (
            <motion.button 
              key={i}
              whileHover={{ scale: 1.05, backgroundColor: btn.primary ? 'rgba(255,255,255,0.9)' : (btn.secondary ? '#0A2A2B' : 'rgba(255,255,255,0.2)') }}
              whileTap={{ scale: 0.95 }}
              className={`${btn.primary ? 'bg-white text-brand-green' : (btn.secondary ? 'bg-brand-green text-white' : 'bg-white/10 backdrop-blur-md border border-white/30 text-white')} px-12 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl font-accent`}
            >
              {iconMap[btn.icon] || <Zap size={24} />}
              {btn.text}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-32 bg-theme-bg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-green font-accent font-bold uppercase tracking-[0.5em] text-xs mb-4 block"
            >
              {blogData.tagline}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold text-theme-text leading-tight tracking-tight">{blogData.title.main} <span className="text-brand-green">{blogData.title.highlight}</span></h2>
          </div>
          <button className="text-brand-green font-bold uppercase tracking-widest text-sm flex items-center gap-3 group font-accent">
            {blogData.buttonText} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogData.list.map((p, i) => (
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
              <p className="text-brand-green font-bold uppercase tracking-[0.2em] text-xs mb-4 font-accent">{p.date}</p>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-theme-text group-hover:text-brand-green transition-colors leading-tight tracking-tight">{p.title}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const iconMap: Record<string, any> = {
    Phone: <Phone />,
    Mail: <Mail />,
    MapPin: <MapPin />,
    Instagram: Instagram,
    Twitter: Twitter,
    Facebook: Facebook
  };

  return (
    <section id="contact" className="py-32 bg-theme-bg text-theme-text overflow-hidden relative transition-colors duration-500">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-green font-black uppercase tracking-[0.4em] text-xs mb-6 block"
            >
              {contactData.tagline}
            </motion.span>
            <h2 className="text-6xl font-display font-black mb-10 leading-tight text-theme-text">{contactData.title.main} <br /><span className="text-brand-green">{contactData.title.highlight}</span></h2>
            <p className="text-theme-text/60 text-xl mb-16 max-w-md leading-relaxed font-medium">
              {contactData.description}
            </p>
            
            <div className="space-y-10">
              {contactData.info.map((item, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-theme-card border border-theme-border flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                    {iconMap[item.icon] || <Zap />}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-theme-text/40 mb-2">{item.label}</p>
                    <p className="text-2xl font-display font-black text-theme-text">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 flex gap-6">
              {contactData.socials.map((social, i) => {
                const Icon = iconMap[social.icon] || Instagram;
                return (
                  <motion.a 
                    key={i} 
                    href={social.href} 
                    whileHover={{ y: -5, backgroundColor: '#0F3D3E', color: '#FFFFFF' }}
                    className="w-14 h-14 rounded-full border border-theme-border flex items-center justify-center transition-all text-theme-text"
                  >
                    <Icon size={22} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-theme-card p-16 rounded-[4rem] text-theme-text shadow-2xl border border-theme-border"
          >
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {contactData.form.fields.slice(0, 2).map((field, i) => (
                  <div key={i} className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-theme-text/40">{field.label}</label>
                    <input type={field.type} className="w-full px-8 py-5 rounded-2xl bg-theme-bg border border-theme-border focus:ring-2 focus:ring-brand-green transition-all font-bold text-theme-text placeholder:text-theme-text/30" placeholder={field.placeholder} />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-theme-text/40">{contactData.form.fields[2].label}</label>
                <select className="w-full px-8 py-5 rounded-2xl bg-theme-bg border border-theme-border focus:ring-2 focus:ring-brand-green transition-all font-bold text-theme-text appearance-none">
                  {contactData.form.fields[2].options?.map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-theme-text/40">{contactData.form.fields[3].label}</label>
                <textarea rows={4} className="w-full px-8 py-5 rounded-2xl bg-theme-bg border border-theme-border focus:ring-2 focus:ring-brand-green transition-all font-bold text-theme-text placeholder:text-theme-text/30" placeholder={contactData.form.fields[3].placeholder}></textarea>
              </div>
              <button className="w-full bg-brand-green text-white py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-brand-dark transition-all shadow-2xl shadow-brand-green/20">
                {contactData.form.buttonText}
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

  const socialIconMap: Record<string, any> = {
    Instagram: Instagram,
    Facebook: Facebook,
    Twitter: Twitter,
    Youtube: Youtube
  };

  const iconMap: Record<string, any> = {
    Tv: <Tv size={18} />,
    Waves: <Waves size={18} />,
    Refrigerator: <Refrigerator size={18} />,
    Wind: <Wind size={18} />,
    UtensilsCrossed: <UtensilsCrossed size={18} />
  };
  
  return (
    <footer id="contact-footer" className="bg-theme-footer text-theme-text pt-32 pb-12 border-t border-theme-border relative overflow-hidden transition-colors duration-500">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-green/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24"
        >
          {/* Brand Column */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-brand-green p-2 rounded-xl">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter text-theme-text">
                {navbarData.brand.first}<span className="text-brand-green">{navbarData.brand.second}</span>
              </span>
            </div>
            <p className="text-theme-text/60 text-lg leading-relaxed mb-10 max-w-sm font-normal">
              {footerData.description}
            </p>
            <div className="flex gap-4">
              {footerData.socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon] || Instagram;
                return (
                  <motion.a 
                    key={social.name}
                    href={social.href} 
                    whileHover={{ y: -5, backgroundColor: '#0F3D3E', color: '#FFFFFF' }}
                    className="w-12 h-12 rounded-2xl bg-theme-card border border-theme-border flex items-center justify-center transition-all duration-300 text-theme-text"
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="lg:col-span-2"
          >
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-green mb-10 font-accent">Company</h4>
            <ul className="space-y-4">
              {footerData.companyLinks.map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-theme-text/60 hover:text-theme-text transition-colors font-medium flex items-center group text-base">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-brand-green mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="lg:col-span-2"
          >
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-green mb-10 font-accent">Shop</h4>
            <ul className="space-y-4">
              {footerData.shopLinks.map(item => (
                <li key={item.name}>
                  <a href="#categories" className="text-theme-text/60 hover:text-theme-text transition-colors font-medium flex items-center group gap-2 text-base">
                    <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity">{iconMap[item.icon] || <Zap size={14} />}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="lg:col-span-4"
          >
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-green mb-10 font-accent">{footerData.newsletter.title}</h4>
            <p className="text-theme-text/60 mb-8 font-normal text-base">{footerData.newsletter.description}</p>
            <form className="relative group">
              <input 
                type="email" 
                className="w-full bg-theme-card border border-theme-border rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-green transition-all font-bold placeholder:text-theme-text/30 text-base text-theme-text" 
                placeholder="Enter your email" 
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-green text-white px-8 rounded-xl hover:bg-white hover:text-brand-green transition-all font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-brand-green/20 font-accent">
                Subscribe
              </button>
            </form>
            <div className="mt-8 flex items-center gap-4 text-theme-text/40 text-xs font-bold font-accent">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-theme-bg bg-theme-card flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span>Join {footerData.newsletter.subscriberCount} happy subscribers</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-theme-text/40 text-xs font-bold uppercase tracking-[0.2em] font-accent">
            © {currentYear} {navbarData.brand.first}{navbarData.brand.second} Private Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-theme-text/40 text-xs font-bold uppercase tracking-[0.2em] font-accent">
            {footerData.bottomLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-theme-text transition-colors">{link.name}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen selection:bg-brand-green selection:text-white ${darkMode ? 'dark' : ''}`}>
      <header>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </header>
      <main>
        <Hero />
        <ValuePropStrip />
        <WhyChooseUs />
        <Categories setCategoryFilter={setCategoryFilter} />
        <ProductShowcase filter={categoryFilter} setFilter={setCategoryFilter} />
        <ProductGallery />
        <AboutTrust />
        <StoreLocations />
        <Testimonials />
        <CTASection />
        <Blog />
        <Contact />
      </main>
      <Footer />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-[150] w-12 h-12 bg-theme-card border border-theme-border rounded-2xl shadow-2xl flex items-center justify-center text-theme-text hover:bg-brand-green hover:text-white transition-all group"
          >
            <ChevronDown className="rotate-180 group-hover:-translate-y-1 transition-transform" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sticky WhatsApp Button */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.a 
            href={`https://wa.me/${footerData.whatsapp.number}?text=${encodeURIComponent(footerData.whatsapp.message)}`}
            target="_blank"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[100] w-16 h-16 md:w-20 md:h-20 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-900/40"
          >
            <MessageSquare size={32} fill="currentColor" className="md:w-10 md:h-10" />
            <span className="absolute -top-1 -left-1 w-4 h-4 md:w-6 md:h-6 bg-brand-green rounded-full animate-ping"></span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

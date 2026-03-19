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
  Leaf,
  Home,
  Plus,
  Minus
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode, isOpen, setIsOpen }: { darkMode: boolean, toggleDarkMode: () => void, isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <Home size={20} /> },
    { name: 'Categories', href: '#categories', icon: <ShoppingBag size={20} /> },
    { name: 'Offers', href: '#offers', icon: <Zap size={20} /> },
    { name: 'Stores', href: '#stores', icon: <MapPin size={20} /> },
    { name: 'About', href: '#about', icon: <CheckCircle size={20} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={20} /> }
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
          <span className={`text-xl md:text-2xl font-display font-bold tracking-tighter ${darkMode ? 'text-white' : 'text-brand-dark'}`}>
            GREEN<span className="text-brand-green">NEST</span>
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
                className={`text-[11px] font-bold uppercase tracking-[0.25em] relative group transition-colors font-accent ${darkMode ? 'text-white/80 hover:text-white' : 'text-brand-dark/80 hover:text-brand-green'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-green transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.div>
          
          <div className="flex items-center gap-5 border-l border-gray-200 dark:border-white/10 pl-8">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-brand-dark'}`}
            >
              {darkMode ? <SunMedium size={20} /> : <Moon size={20} />}
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-green text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-green/20 font-accent"
            >
              Find Store
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button onClick={toggleDarkMode} className={darkMode ? 'text-white' : 'text-brand-dark'}>
            {darkMode ? <SunMedium size={22} /> : <Moon size={22} />}
          </button>
          <button className={darkMode ? 'text-white' : 'text-brand-dark'} onClick={() => setIsOpen(!isOpen)}>
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
              className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[110] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm z-[120] bg-white dark:bg-brand-dark shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-green p-1 rounded-lg">
                    <Leaf className="text-white w-4 h-4" />
                  </div>
                  <span className="text-lg font-display font-black dark:text-white tracking-tighter">
                    GREEN<span className="text-brand-green">NEST</span>
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded-full text-brand-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
                      className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-brand-dark dark:text-white hover:bg-brand-green/5 hover:text-brand-green transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                        {link.icon}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest">{link.name}</span>
                      <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Drawer Footer / CTA */}
              <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-brand-dark/50">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-green text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand-green/20 flex items-center justify-center gap-2"
                >
                  <Store size={16} />
                  Find Store
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
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white dark:bg-brand-dark overflow-hidden pt-20">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-brand-dark dark:to-slate-900 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-[2px] bg-brand-green" />
              <span className="text-brand-green font-accent font-bold uppercase tracking-[0.3em] text-xs">
                Premium Home Solutions
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-brand-dark dark:text-white leading-[1.1] mb-8 tracking-tight">
              Smart Electronics & <br />
              <span className="text-brand-green">Home Appliances</span> <br />
              for Everyday Living
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
              Explore high-quality TVs, washing machines, and kitchen appliances designed for modern homes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-green text-white px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-brand-green/20 font-accent"
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-slate-800 text-brand-dark dark:text-white border border-slate-200 dark:border-slate-700 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest font-accent shadow-sm"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
          
          {/* Right Side: Product Visuals Collage */}
          <div className="relative h-[400px] md:h-[600px] w-full">
            {/* TV Image */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[80%] md:w-[70%] z-20 shadow-2xl rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80" 
                alt="Smart TV" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Washing Machine Image */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="absolute bottom-10 left-0 w-[50%] md:w-[45%] z-30 shadow-2xl rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Washing Machine" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Kitchen Appliance Image */}
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
              className="absolute bottom-0 right-10 w-[45%] md:w-[40%] z-10 shadow-2xl rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80" 
                alt="Kitchen Appliance" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10" />
          </div>
          
        </div>
      </div>
    </section>
  );
};

const ValuePropStrip = () => {
  const items = [
    { icon: <Truck />, title: "FREE DELIVERY", desc: "Across all major cities in India" },
    { icon: <ShieldCheck />, title: "CERTIFIED QUALITY", desc: "Rigorous 40-point quality testing" },
    { icon: <CheckCircle />, title: "WARRANTY INCLUDED", desc: "Full peace of mind with every purchase" },
    { icon: <ArrowLeftRight />, title: "EASY EXCHANGE", desc: "Best value for your old appliances" }
  ];

  return (
    <section className="py-20 bg-brand-green text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:rotate-12 transition-all duration-500 shadow-xl">
                {item.icon}
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
  const reasons = [
    { title: "Eco-Friendly Choice", desc: "By choosing refurbished, you reduce e-waste and help the planet.", icon: <Leaf className="text-brand-green" /> },
    { title: "Smart Savings", desc: "Get premium brands at up to 60% less than market price.", icon: <Zap className="text-brand-green" /> },
    { title: "Expert Support", desc: "Dedicated after-sales support for all your appliance needs.", icon: <MessageSquare className="text-brand-green" /> }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-brand-green font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
              The Green Nest Advantage
            </span>
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ opacity: 0, y: "100%", skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-4xl md:text-5xl font-display font-extrabold mb-6 text-brand-dark dark:text-white"
            >
              Why Smart Shoppers <span className="text-brand-green">Choose Us</span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-brand-dark/70 dark:text-white/70 font-medium text-lg"
          >
            We bridge the gap between premium quality and affordable pricing, ensuring every home gets the best technology without breaking the bank.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reasons.map((reason, i) => (
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
              className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-black/5 border border-slate-100 dark:border-white/5 hover:border-brand-green transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                {reason.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-brand-dark dark:text-white">{reason.title}</h3>
              <p className="text-brand-dark/60 dark:text-white/60 text-base leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Categories = ({ setCategoryFilter }: { setCategoryFilter: (cat: string) => void }) => {
  const cats = [
    { name: "Washing Machines", icon: <Waves />, img: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80" },
    { name: "Refrigerators", icon: <Refrigerator />, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
    { name: "AC & Coolers", icon: <Wind />, img: "https://images.unsplash.com/photo-1631545729918-46c9756a7ca7?auto=format&fit=crop&w=800&q=80" },
    { name: "TVs", icon: <Tv />, img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80" },
    { name: "Microwaves", icon: <Microwave />, img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80" },
    { name: "Induction Stoves", icon: <Zap />, img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" },
    { name: "Mixer Grinders", icon: <Zap />, img: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&w=800&q=80" }
  ];

  const handleCategoryClick = (catName: string) => {
    setCategoryFilter(catName);
    const element = document.getElementById('offers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-24 md:py-32 bg-white dark:bg-brand-dark">
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
              PREMIUM CATEGORIES
            </h2>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h3 
              initial={{ opacity: 0, y: "100%", skewY: 2 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-brand-dark dark:text-white leading-tight max-w-4xl"
            >
              Explore our <span className="text-brand-green underline decoration-brand-green/30 underline-offset-8">Curated</span> collection of home essentials.
            </motion.h3>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 md:gap-8">
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
                  <div className="w-10 h-10 rounded-xl bg-brand-green/90 backdrop-blur-md flex items-center justify-center text-white mb-3 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
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

  const products = [
    { name: "Samsung 55\" 4K UHD Smart TV", brand: "Samsung", category: "TVs", price: "₹34,999", oldPrice: "₹64,900", discount: "46%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80", desc: "Experience stunning 4K resolution with this Samsung Smart TV. Features include HDR, multiple HDMI ports, and built-in streaming apps.", warranty: "1-Year Limited Warranty" },
    { name: "LG 8kg Front Load Washing Machine", brand: "LG", category: "Washing Machines", price: "₹24,999", oldPrice: "₹42,900", discount: "41%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=800&q=80", desc: "Energy-efficient front load washing machine from LG. Features 6 Motion Direct Drive technology for a gentle yet powerful wash.", warranty: "6-Month Manufacturer Warranty" },
    { name: "Whirlpool 265L Double Door Fridge", brand: "Whirlpool", category: "Refrigerators", price: "₹18,999", oldPrice: "₹32,990", discount: "42%", condition: "Refurbished", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", desc: "Spacious double door refrigerator with IntelliFresh technology. Keeps your food fresh for longer with adaptive intelligence.", warranty: "1-Year Limited Warranty" },
    { name: "Daikin 1.5 Ton 5 Star Inverter AC", brand: "Daikin", category: "AC & Coolers", price: "₹32,999", oldPrice: "₹54,999", discount: "40%", condition: "Open Box", img: "https://images.unsplash.com/photo-1631545729918-46c9756a7ca7?auto=format&fit=crop&w=800&q=80", desc: "Stay cool with this energy-efficient Daikin AC. Features Econo mode and Coanda airflow for maximum comfort.", warranty: "1-Year Limited Warranty" },
    { name: "Panasonic 27L Convection Microwave", brand: "Panasonic", category: "Microwaves", price: "₹12,499", oldPrice: "₹19,990", discount: "37%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80", desc: "Versatile convection microwave for all your cooking needs. Features auto-cook menus and a spacious interior.", warranty: "6-Month Manufacturer Warranty" },
    { name: "Prestige Induction Cooktop", brand: "Prestige", category: "Induction Stoves", price: "₹2,499", oldPrice: "₹4,999", discount: "50%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80", desc: "High-efficiency induction cooktop with multiple power levels and safety features.", warranty: "1-Year Limited Warranty" },
    { name: "Prestige 3 Jar Mixer Grinder", brand: "Prestige", category: "Mixer Grinders", price: "₹2,999", oldPrice: "₹5,499", discount: "45%", condition: "Refurbished", img: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&w=800&q=80", desc: "Powerful mixer grinder with 3 stainless steel jars. Perfect for grinding spices, making chutneys, and more.", warranty: "6-Month Manufacturer Warranty" },
    { name: "Sony Bravia 65\" OLED TV", brand: "Sony", category: "TVs", price: "₹89,999", oldPrice: "₹1,49,900", discount: "40%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=800&q=80", desc: "Immerse yourself in cinematic visuals with this Sony OLED TV. Features Acoustic Surface Audio+ and XR Cognitive Processor.", warranty: "1-Year Limited Warranty" },
    { name: "IFB 7kg Fully Automatic Washer", brand: "IFB", category: "Washing Machines", price: "₹19,499", oldPrice: "₹31,900", discount: "39%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1567113463300-102550d235c5?auto=format&fit=crop&w=800&q=80", desc: "Fully automatic washing machine with 2D wash system. Ensures deep cleaning and care for your fabrics.", warranty: "6-Month Manufacturer Warranty" },
    { name: "Bosch 12 Place Setting Dishwasher", brand: "Bosch", category: "Washing Machines", price: "₹28,999", oldPrice: "₹45,900", discount: "37%", condition: "Open Box", img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80", desc: "Effortless dishwashing with this Bosch dishwasher. Features multiple wash programs and a quiet operation.", warranty: "1-Year Limited Warranty" },
    { name: "Haier 531L Side-by-Side Fridge", brand: "Haier", category: "Refrigerators", price: "₹45,999", oldPrice: "₹79,990", discount: "43%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1571175432270-ef02d9bc9445?auto=format&fit=crop&q=80&w=800", desc: "Luxurious side-by-side refrigerator with Twin Inverter technology. Offers ample storage and uniform cooling.", warranty: "1-Year Limited Warranty" },
    { name: "Philips 750W Mixer Grinder", brand: "Philips", category: "Mixer Grinders", price: "₹4,499", oldPrice: "₹7,999", discount: "44%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=800", desc: "High-performance mixer grinder with a powerful 750W motor. Comes with leak-proof jars and a sturdy design.", warranty: "6-Month Manufacturer Warranty" },
    { name: "OnePlus 50\" 4K Smart Android TV", brand: "OnePlus", category: "TVs", price: "₹28,999", oldPrice: "₹49,999", discount: "42%", condition: "Open Box", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800", desc: "Smart Android TV with Gamma Engine for enhanced picture quality. Features Dolby Audio and multiple connectivity options.", warranty: "1-Year Limited Warranty" },
    { name: "Samsung 65\" QLED 4K TV", brand: "Samsung", category: "TVs", price: "₹74,999", oldPrice: "₹1,24,900", discount: "40%", condition: "Refurbished", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800", desc: "Quantum Dot technology for vibrant colors. This QLED TV offers a premium viewing experience with HDR10+.", warranty: "1-Year Limited Warranty" },
    { name: "LG 360L Inverter Fridge", brand: "LG", category: "Refrigerators", price: "₹31,999", oldPrice: "₹48,990", discount: "35%", condition: "Open Box", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", desc: "Inverter Linear Compressor for energy efficiency. This LG fridge keeps your food fresh and crisp for days.", warranty: "1-Year Limited Warranty" },
    { name: "Whirlpool 7.5kg Top Load Washer", brand: "Whirlpool", category: "Washing Machines", price: "₹16,499", oldPrice: "₹26,900", discount: "38%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1582733775062-eb9217dfd501?auto=format&fit=crop&q=80&w=800", desc: "Top load washing machine with 6th Sense technology. Automatically senses the load and adjusts the wash cycle.", warranty: "6-Month Manufacturer Warranty" },
    { name: "Sony 55\" 4K HDR Google TV", brand: "Sony", category: "TVs", price: "₹42,999", oldPrice: "₹69,900", discount: "38%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&q=80&w=800", desc: "Google TV with 4K X-Reality PRO for upscaling content. Features Dolby Vision and Atmos for an immersive experience.", warranty: "1-Year Limited Warranty" },
    { name: "Daikin 1 Ton 3 Star Split AC", brand: "Daikin", category: "AC & Coolers", price: "₹26,999", oldPrice: "₹42,900", discount: "37%", condition: "Refurbished", img: "https://images.unsplash.com/photo-1631545729918-46c9756a7ca7?auto=format&fit=crop&q=80&w=800", desc: "Compact and powerful split AC from Daikin. Features PM2.5 filter and power chill mode for quick cooling.", warranty: "1-Year Limited Warranty" },
    { name: "Panasonic 20L Solo Microwave", brand: "Panasonic", category: "Microwaves", price: "₹5,999", oldPrice: "₹9,990", discount: "40%", condition: "Open Box", img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800", desc: "Perfect for small families or individuals. This solo microwave is ideal for reheating and simple cooking.", warranty: "6-Month Manufacturer Warranty" },
    { name: "Prestige 500W Mixer Grinder", brand: "Prestige", category: "Mixer Grinders", price: "₹1,999", oldPrice: "₹3,499", discount: "43%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=800", desc: "Budget-friendly mixer grinder with 3 jars. Durable and efficient for daily kitchen tasks.", warranty: "6-Month Manufacturer Warranty" },
    { name: "IFB 6kg Front Load Washer", brand: "IFB", category: "Washing Machines", price: "₹17,999", oldPrice: "₹28,900", discount: "38%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1567113463300-102550d235c5?auto=format&fit=crop&q=80&w=800", desc: "Compact front load washer with Aqua Energie technology. Protects your clothes and ensures a thorough wash.", warranty: "6-Month Manufacturer Warranty" },
    { name: "Haier 195L Single Door Fridge", brand: "Haier", category: "Refrigerators", price: "₹12,999", oldPrice: "₹19,990", discount: "35%", condition: "Refurbished", img: "https://images.unsplash.com/photo-1571175432270-ef02d9bc9445?auto=format&fit=crop&q=80&w=800", desc: "Single door fridge with 1-hour icing technology. Energy-efficient and stylish for small kitchens.", warranty: "1-Year Limited Warranty" },
    { name: "Philips Air Fryer 4.1L", brand: "Philips", category: "Mixer Grinders", price: "₹6,999", oldPrice: "₹11,999", discount: "42%", condition: "Open Box", img: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=800", desc: "Healthy cooking with up to 90% less fat. This air fryer features Rapid Air technology for crispy results.", warranty: "6-Month Manufacturer Warranty" },
    { name: "OnePlus 43\" Full HD Smart TV", brand: "OnePlus", category: "TVs", price: "₹21,999", oldPrice: "₹34,999", discount: "37%", condition: "Factory Second", img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800", desc: "Full HD smart TV with OxygenPlay for discovering content. Features 20W speakers with Dolby Audio.", warranty: "1-Year Limited Warranty" },
    { name: "Bosch 8kg Front Load Washer", brand: "Bosch", category: "Washing Machines", price: "₹32,999", oldPrice: "₹52,900", discount: "38%", condition: "Surplus Stock", img: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800", desc: "Premium front load washer with Anti-Vibration design. Features VarioDrum for gentle and effective cleaning.", warranty: "1-Year Limited Warranty" }
  ];

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
    <section id="offers" className="py-32 bg-white dark:bg-brand-dark">
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
                Exclusive Deals
              </span>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ opacity: 0, y: "100%", skewY: 3 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-5xl md:text-6xl font-display font-black mb-8 text-brand-dark dark:text-white"
              >
                Featured <span className="text-brand-green">Offers</span>
              </motion.h2>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-slate-100 dark:bg-slate-900 text-brand-dark/50 dark:text-white/50 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search by name, brand or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-brand-green dark:text-white transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Showing:</span>
              <span className="text-xs font-black dark:text-white">{filteredProducts.length} Products</span>
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${showFilters ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white dark:bg-slate-900 text-brand-dark dark:text-white border-slate-200 dark:border-slate-800'}`}
            >
              <Filter size={16} />
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </motion.button>

            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 px-4 border-r border-slate-200 dark:border-slate-800">
                <ArrowLeftRight size={16} className="text-slate-400 rotate-90" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort:</span>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-xs font-black uppercase tracking-widest dark:text-white cursor-pointer pr-10"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
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
              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-6">Filter by Brand</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.map(brand => (
                        <button 
                          key={brand}
                          onClick={() => setBrandFilter(brand)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${brandFilter === brand ? 'bg-brand-green text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:border-brand-green'}`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-green mb-6">Filter by Condition</h4>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map(cond => (
                        <button 
                          key={cond}
                          onClick={() => setConditionFilter(cond)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${conditionFilter === cond ? 'bg-brand-green text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:border-brand-green'}`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-end">
                    <button 
                      onClick={clearFilters}
                      className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-green hover:text-brand-dark dark:hover:text-white transition-colors"
                    >
                      <X size={14} />
                      Clear All Filters
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
              <span className="flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 text-blue-600 rounded-full text-[11px] font-bold uppercase tracking-widest font-accent">
                Condition: {conditionFilter}
                <X size={14} className="cursor-pointer" onClick={() => setConditionFilter('All')} />
              </span>
            )}
            {searchQuery !== '' && (
              <span className="flex items-center gap-2 px-5 py-2.5 bg-slate-500/10 text-slate-600 rounded-full text-[11px] font-bold uppercase tracking-widest font-accent">
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
                  className="group bg-white dark:bg-brand-dark/50 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-brand-green text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg font-accent">
                        {p.discount} OFF
                      </span>
                      <span className="bg-white/95 backdrop-blur-md text-brand-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-lg font-accent">
                        {p.condition}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-brand-dark/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.15em] border border-white/20 font-accent">
                        {p.brand}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <span className="text-brand-green font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block font-accent">
                      {p.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-4 line-clamp-2 dark:text-white group-hover:text-brand-green transition-colors h-16 leading-tight">
                      {p.name}
                    </h3>
                    
                    <div className="flex items-end justify-between gap-3 mb-8">
                      <div className="flex flex-col">
                        <span className="text-3xl md:text-4xl font-display font-extrabold text-brand-dark dark:text-white tracking-tight">{p.price}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400 line-through font-semibold">{p.oldPrice}</span>
                          <span className="text-brand-green text-xs font-black uppercase tracking-widest">{p.discount} OFF</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                          <button 
                            onClick={() => handleQuantityChange(p.name, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-brand-dark dark:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm font-bold dark:text-white">
                            {productQuantities[p.name] || 1}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(p.name, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 text-brand-dark dark:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedProduct(p)}
                          className="flex-1 bg-brand-dark dark:bg-white dark:text-brand-dark text-white py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors font-accent"
                        >
                          Details
                        </button>
                      </div>

                      <a 
                        href={`https://wa.me/919876543210?text=I'm interested in ${p.name} (Quantity: ${productQuantities[p.name] || 1})`}
                        target="_blank"
                        className="bg-[#25D366] text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors font-accent w-full"
                      >
                        <MessageSquare size={16} fill="currentColor" />
                        Enquire on WhatsApp
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
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-display font-black dark:text-white mb-4">No products found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">We couldn't find any products matching your current filters. Try adjusting your selection or clear all filters.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-brand-green text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-green/20"
                >
                  Clear All Filters
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
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white md:text-brand-dark md:dark:text-white md:bg-gray-100 md:dark:bg-gray-800 hover:bg-brand-green hover:text-white transition-all"
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
                  <span className="bg-brand-dark/10 text-brand-dark dark:text-white/10 dark:text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-accent">
                    {selectedProduct.condition}
                  </span>
                  <span className="bg-brand-green/5 dark:bg-brand-green/20 text-brand-green/80 dark:text-brand-green text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-accent border border-brand-green/10">
                    {selectedProduct.brand}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-brand-dark dark:text-white leading-tight tracking-tight">
                  {selectedProduct.name}
                </h3>
                
                <p className="text-brand-dark/70 dark:text-white/70 mb-8 leading-relaxed font-medium text-lg">
                  {selectedProduct.desc}
                </p>

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Condition</h4>
                    <p className="text-sm font-bold text-brand-dark dark:text-white">{selectedProduct.condition}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Brand</h4>
                    <p className="text-sm font-bold text-brand-dark dark:text-white">{selectedProduct.brand}</p>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-brand-green/5 dark:bg-brand-green/10 rounded-2xl border border-brand-green/10 dark:border-white/5">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-green mb-3 flex items-center gap-2 font-accent">
                    <ShieldCheck size={16} />
                    Warranty Details
                  </h4>
                  <p className="text-base font-bold text-brand-dark dark:text-white">
                    {selectedProduct.warranty}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-brand-dark/40 dark:text-white/40 uppercase tracking-widest mb-1 font-accent">Our Price</span>
                      <span className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark dark:text-white tracking-tight">{selectedProduct.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-brand-dark/40 dark:text-white/40 uppercase tracking-widest mb-1 font-accent">MRP</span>
                      <span className="text-xl text-brand-dark/40 dark:text-white/40 line-through font-bold">{selectedProduct.oldPrice}</span>
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
                      Enquire on WhatsApp
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
  const items = [
    { name: "Televisions", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800", span: "lg:col-span-2 lg:row-span-2" },
    { name: "Washing Machines", img: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=800", span: "lg:col-span-1 lg:row-span-1" },
    { name: "Refrigerators", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", span: "lg:col-span-1 lg:row-span-1" },
    { name: "Microwave Ovens", img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800", span: "lg:col-span-2 lg:row-span-1" },
    { name: "Mixer Grinders", img: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?auto=format&fit=crop&q=80&w=800", span: "lg:col-span-2 lg:row-span-1" }
  ];

  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-green font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Visual Experience
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-display font-black dark:text-white mb-6">Premium <span className="text-brand-green">Showcase</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Discover the perfect blend of technology and design with our curated selection of high-end home appliances.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto lg:h-[800px]">
          {items.map((item, i) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
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
                    <div className="w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-white">
                      <ShieldCheck size={28} />
                    </div>
                    <h4 className="text-2xl font-display font-black text-white">Certified Quality</h4>
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed">Every appliance undergoes a rigorous 40-point testing process before it reaches your home.</p>
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
              The Green Nest Standard
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-display font-extrabold mb-10 text-brand-dark dark:text-white leading-[0.95] tracking-tighter">Direct from <br />Manufacturers. <br /><span className="text-brand-green">Honest Pricing.</span></h2>
            <p className="text-xl text-brand-dark/70 dark:text-white/70 mb-12 leading-relaxed font-medium">
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
                    <h4 className="font-display font-bold text-lg text-brand-dark dark:text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-brand-dark/60 dark:text-white/60 font-medium leading-relaxed">{item.desc}</p>
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
    { 
      name: "Indiranagar Experience Hub", 
      address: "123, 100 Feet Rd, Indiranagar, Bangalore", 
      timing: "10:00 AM - 9:00 PM", 
      phone: "+91 98765 43210",
      img: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "Whitefield Mega Store", 
      address: "45, ITPL Main Rd, Whitefield, Bangalore", 
      timing: "10:30 AM - 9:30 PM", 
      phone: "+91 98765 43211",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
    },
    { 
      name: "Jayanagar Outlet", 
      address: "89, 4th Block, Jayanagar, Bangalore", 
      timing: "10:00 AM - 8:30 PM", 
      phone: "+91 98765 43212",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="stores" className="py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-green font-accent font-bold uppercase tracking-[0.5em] text-xs mb-4 block"
          >
            Our Presence
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-8 dark:text-white tracking-tight">Visit Our <span className="text-brand-green">Stores</span></h2>
          <div className="w-24 h-1 bg-brand-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stores.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -15 }}
              className="bg-brand-bg dark:bg-slate-900 rounded-[3.5rem] shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800 group overflow-hidden"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={s.img} 
                  alt={s.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-10">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 dark:text-white leading-tight tracking-tight">{s.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium leading-relaxed text-base">{s.address}</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest font-accent">
                    <Zap size={16} className="text-brand-green" />
                    <span>Open: {s.timing}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest font-accent">
                    <Phone size={16} className="text-brand-green" />
                    <span>{s.phone}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="w-full py-5 rounded-xl bg-brand-green text-white font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20 font-accent">
                    <MapPin size={16} />
                    Open in Maps
                  </button>
                  <button className="w-full py-5 rounded-xl bg-white dark:bg-slate-800 text-brand-dark dark:text-white font-bold uppercase tracking-widest text-[11px] border border-slate-200 dark:border-slate-700 font-accent">
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
            <span className="font-bold text-brand-dark dark:text-white uppercase tracking-[0.2em] text-sm font-accent">4.9/5 Google Rating</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-extrabold mb-8 dark:text-white tracking-tight">Trusted by <span className="text-brand-green">5000+</span> <br />Happy Customers</h2>
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
                  <h4 className="text-xl font-display font-bold dark:text-white tracking-tight">{r.name}</h4>
                  <p className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] font-accent">{r.role}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic text-xl font-medium">"{r.text}"</p>
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
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-brand-green/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-display font-extrabold text-white mb-10 leading-[1.1] tracking-tighter"
        >
          Upgrade Your Home <br />for Less Today
        </motion.h2>
        <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-3xl mx-auto font-normal leading-relaxed">
          Don't settle for less. Get the premium appliances you've always wanted at prices you'll love. Visit our store or enquire online.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-brand-green px-12 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl font-accent"
          >
            <Phone size={24} />
            Call Now
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#0A2A2B' }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-green text-white px-12 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl font-accent"
          >
            <MessageSquare size={24} />
            WhatsApp
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-6 rounded-2xl text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-4 transition-all font-accent"
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
    <section id="blog" className="py-32 bg-white dark:bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-green font-accent font-bold uppercase tracking-[0.5em] text-xs mb-4 block"
            >
              Expert Advice
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold text-brand-dark dark:text-white leading-tight tracking-tight">Buying <span className="text-brand-green">Guides</span></h2>
          </div>
          <button className="text-brand-green font-bold uppercase tracking-widest text-sm flex items-center gap-3 group font-accent">
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
              <p className="text-brand-green font-bold uppercase tracking-[0.2em] text-xs mb-4 font-accent">{p.date}</p>
              <h3 className="text-2xl md:text-3xl font-display font-bold dark:text-white group-hover:text-brand-green transition-colors leading-tight tracking-tight">{p.title}</h3>
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
              className="text-brand-green font-black uppercase tracking-[0.4em] text-xs mb-6 block"
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
              <span className="text-2xl font-display font-bold tracking-tighter">
                GREEN<span className="text-brand-green">NEST</span>
              </span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm font-normal">
              India's most trusted destination for premium refurbished and surplus home appliances. Quality you can feel, prices you'll love.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  whileHover={{ y: -5, backgroundColor: '#0F3D3E', color: '#FFFFFF' }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
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
              {['About Us', 'Our Stores', 'Sustainability', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-white transition-colors font-medium flex items-center group text-base">
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
              {[
                { name: 'Televisions', icon: <Tv size={14} /> },
                { name: 'Washing Machines', icon: <Waves size={14} /> },
                { name: 'Refrigerators', icon: <Refrigerator size={14} /> },
                { name: 'Air Conditioners', icon: <Wind size={14} /> },
                { name: 'Kitchen', icon: <UtensilsCrossed size={14} /> }
              ].map(item => (
                <li key={item.name}>
                  <a href="#categories" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center group gap-2 text-base">
                    <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity">{item.icon}</span>
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
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-green mb-10 font-accent">Newsletter</h4>
            <p className="text-slate-400 mb-8 font-normal text-base">Get exclusive early access to our biggest surplus drops and appliance guides.</p>
            <form className="relative group">
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-green transition-all font-bold placeholder:text-slate-700 text-base" 
                placeholder="Enter your email" 
              />
              <button className="absolute right-2 top-2 bottom-2 bg-brand-green text-white px-8 rounded-xl hover:bg-white hover:text-brand-green transition-all font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-brand-green/20 font-accent">
                Subscribe
              </button>
            </form>
            <div className="mt-8 flex items-center gap-4 text-slate-500 text-xs font-bold font-accent">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span>Join 5,000+ happy subscribers</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] font-accent">
            © {currentYear} Green Nest Private Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-xs font-bold uppercase tracking-[0.2em] font-accent">
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

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
            className="fixed bottom-24 right-6 z-[150] w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl flex items-center justify-center text-brand-dark dark:text-white hover:bg-brand-green hover:text-white transition-all group"
          >
            <ChevronDown className="rotate-180 group-hover:-translate-y-1 transition-transform" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sticky WhatsApp Button */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.a 
            href="https://wa.me/919876543210"
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

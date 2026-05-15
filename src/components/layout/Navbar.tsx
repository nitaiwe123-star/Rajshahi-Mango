import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { auth } from '../../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const navLinks = [
    { name: 'হোম', path: '/' },
    { name: 'আমের তালিকা', path: '/shop' },
    { name: 'অর্ডার ট্র্যাক', path: '/track' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
      isScrolled ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-stone-100" : "bg-gradient-to-b from-stone-900/40 to-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className={cn(
            "text-xl md:text-2xl font-serif font-bold transition-colors duration-300",
            isScrolled ? "text-leaf-green" : "text-white"
          )}>
            রাজশাহীর <span className={cn(isScrolled ? "text-mango-orange" : "text-mango-yellow")}>ফ্রেশ আম</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "transition-all duration-300 hover:scale-105",
                isScrolled 
                  ? (location.pathname === link.path ? "text-leaf-green" : "text-stone-600 hover:text-stone-900")
                  : "text-white/80 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/checkout" className={cn(
            "relative p-2 transition-colors",
            isScrolled ? "text-stone-700 hover:text-leaf-green" : "text-white hover:text-mango-yellow"
          )}>
            <ShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-mango-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white/10">0</span>
          </Link>

          {user ? (
            <Link to={user.email === 'nitaiwe123@gmail.com' ? '/admin' : '/dashboard'} className={cn(
              "p-2 transition-colors",
              isScrolled ? "text-stone-700 hover:text-leaf-green" : "text-white hover:text-mango-yellow"
            )}>
              <User size={24} />
            </Link>
          ) : (
            <Link to="/login" className={cn(
              "hidden md:block px-6 py-2.5 rounded-full font-bold transition-all",
              isScrolled 
                ? "bg-leaf-green text-white hover:bg-leaf-light shadow-md" 
                : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
            )}>
              লগইন
            </Link>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className={cn(
            "md:hidden p-2 transition-colors",
            isScrolled ? "text-stone-700" : "text-white"
          )}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white mt-3 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-lg font-medium text-stone-700 hover:bg-organic-bg rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-lg font-medium text-white bg-leaf-green rounded-lg text-center"
                >
                  লগইন
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

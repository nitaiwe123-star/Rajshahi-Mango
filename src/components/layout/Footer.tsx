import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold text-white mb-6 inline-block">
              রাজশাহীর <span className="text-mango-yellow">ফ্রেশ আম</span>
            </Link>
            <p className="text-stone-400 leading-relaxed mb-6">
              আমরা দিচ্ছি রাজশাহীর বাগান থেকে সরাসরি বাছাই করা সেরা গাছপাকা আম। কোনো কেমিক্যাল বা ফরমালিন নেই।
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-leaf-green transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-leaf-green transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-stone-800 rounded-full hover:bg-leaf-green transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">পেজসমূহ</h3>
            <Link to="/shop" className="hover:text-mango-yellow transition-colors">আমের তালিকা</Link>
            <Link to="/track" className="hover:text-mango-yellow transition-colors">অর্ডার ট্র্যাক করুন</Link>
            <Link to="/login" className="hover:text-mango-yellow transition-colors">মাই একাউন্ট</Link>
          </div>

          {/* Policy Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">সহযোগিতা</h3>
            <Link to="/privacy" className="hover:text-mango-yellow transition-colors">প্রাইভেসি পলিসি</Link>
            <Link to="/terms" className="hover:text-mango-yellow transition-colors">শর্তাবলী</Link>
            <Link to="/refund" className="hover:text-mango-yellow transition-colors">রিফান্ড পলিসি</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">যোগাযোগ</h3>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-mango-yellow" />
              <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-mango-yellow" />
              <span>info@rajshahirfreshmango.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-mango-yellow" />
              <span>রাজশাহী, বাংলাদেশ</span>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p>© ২০২৪ রাজশাহীর ফ্রেশ আম। সর্বস্বত্ব সংরক্ষিত।</p>
            <Link 
              to="/admin" 
              className="px-4 py-1.5 border border-stone-800 rounded-full hover:border-leaf-green hover:bg-leaf-green hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold inline-flex items-center gap-2"
            >
              <Users size={12} />
              Admin Access
            </Link>
          </div>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/BKash_Logo.svg/2560px-BKash_Logo.svg.png" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" alt="bKash" />
            <img src="https://nagad.com.bd/wp-content/uploads/2021/04/nagad-logo.png" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" alt="Nagad" />
          </div>
        </div>
      </div>
    </footer>
  );
}

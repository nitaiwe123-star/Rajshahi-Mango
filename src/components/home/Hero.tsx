import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-24 md:pt-32 flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=70&w=1600" 
          className="w-full h-full object-cover"
          alt="Rajshahi Mango Orchard"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full group">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <span className="inline-block bg-mango-yellow text-stone-900 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase mb-6">
            ১০০% ফ্রেশ ও কেমিক্যাল মুক্ত
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight md:leading-[1.2] mb-6">
            রাজশাহীর সেরা <br className="hidden sm:block" />
            <span className="text-mango-yellow">গাছপাকা আম</span> <br className="hidden sm:block" />
            আপনার দোরগোড়ায়
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-lg leading-relaxed">
            সরাসরি বাগান থেকে বাছাই করা হিমসাগর, ল্যাংড়া এবং ফজলি আমের অতুলনীয় স্বাদ এখন অনলাইনে। দ্রুত হোম ডেলিভারি সারাদেশে।
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              to="/shop" 
              className="bg-leaf-green text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-leaf-light hover:scale-105 transition-all shadow-xl shadow-leaf-green/20"
            >
              <ShoppingBag size={22} />
              এখনই অর্ডার করুন
            </Link>
            <a 
              href="https://wa.me/8801234567890" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
            >
              WhatsApp করুন
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="flex gap-8 text-stone-300">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">৫০০০+</span>
              <span className="text-sm">সন্তুষ্ট কাস্টমার</span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">৪৮ ঘণ্টা</span>
              <span className="text-sm">দ্রুত ডেলিভারি</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Countdown Timer (Placeholder logic) */}
      <div className="absolute bottom-10 right-4 md:right-8 bg-white p-6 rounded-3xl shadow-2xl hidden lg:block">
        <p className="text-sm font-bold text-stone-500 mb-2 uppercase tracking-wide">স্পেশাল অফার শেষ হবে:</p>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="bg-organic-bg text-stone-900 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border border-stone-200">০২</div>
            <span className="text-[10px] font-bold text-stone-400">Days</span>
          </div>
          <div className="text-center">
            <div className="bg-organic-bg text-stone-900 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border border-stone-200">১২</div>
            <span className="text-[10px] font-bold text-stone-400">Hours</span>
          </div>
          <div className="text-center">
            <div className="bg-organic-bg text-stone-900 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border border-stone-200">৪৫</div>
            <span className="text-[10px] font-bold text-stone-400">Mins</span>
          </div>
        </div>
      </div>
    </section>
  );
}

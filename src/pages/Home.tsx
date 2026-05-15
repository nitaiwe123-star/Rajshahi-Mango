import { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProductGrid from '../components/home/ProductGrid';
import VideoSection from '../components/home/VideoSection';
import Reviews from '../components/home/Reviews';
import FAQ from '../components/home/FAQ';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-0">
      <Hero />
      <Features />
      <ProductGrid />
      <VideoSection />
      
      {/* Sales Popup Simulation */}
      <SalesPopup />

      <Reviews />
      
      {/* Contact Section Preview */}
      <section className="py-24 bg-organic-bg border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-serif font-bold text-stone-900 mb-8">সরাসরি যোগাযোগ করুন</h2>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-stone-100">
                    <div className="w-14 h-14 bg-leaf-green text-white rounded-2xl flex items-center justify-center">
                       <Phone size={28} />
                    </div>
                    <div>
                      <p className="text-stone-500 text-sm">কল করুন</p>
                      <h4 className="text-xl font-bold text-stone-900">+৮৮০ ১২৩৪ ৫৬৭৮৯০</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-white rounded-3xl shadow-sm border border-stone-100">
                    <div className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center">
                       <MessageCircle size={28} />
                    </div>
                    <div>
                      <p className="text-stone-500 text-sm">হোয়াটসঅ্যাপ চ্যাট</p>
                      <h4 className="text-xl font-bold text-stone-900">অর্ডার শুরু করুন</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116312.2854930121!2d88.5283597!3d24.3642398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefd0a552bf57%3A0x73a006bad7051bc2!2sRajshahi!5e0!3m2!1sen!2sbd!4v1715694351234!5m2!1sen!2sbd" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                 ></iframe>
              </div>
           </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}

function SalesPopup() {
  const [show, setShow] = useState(false);
  const [sale, setSale] = useState({ name: 'রহিম', location: 'ঢাকা', weight: '১০' });

  useEffect(() => {
    const names = ['করিম', 'সোহেল', 'আরিফ', 'সুমন', 'হাসান'];
    const locations = ['রাজশাহী', 'কুমিল্লা', 'খুলনা', 'বরিশাল'];
    
    const interval = setInterval(() => {
      setSale({
        name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        weight: (Math.floor(Math.random() * 4) + 1) * 5 + ''
      });
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: show ? 0 : -100, opacity: show ? 1 : 0 }}
      className="fixed bottom-24 left-8 z-40 bg-white p-4 rounded-2xl shadow-2xl border border-stone-100 flex items-center gap-4 max-w-xs md:max-w-sm pointer-events-none"
    >
       <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1591073113125-e46049fe9201?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="Sale" />
       </div>
       <div>
         <p className="text-xs font-bold text-stone-400 uppercase tracking-tight">সদ্য অর্ডার করেছেন!</p>
         <h5 className="text-sm font-bold text-stone-900 leading-tight">
            {sale.location} থেকে {sale.name} <br />
            <span className="text-leaf-green">{sale.weight} কেজি</span> আমের অর্ডার দিয়েছেন।
         </h5>
       </div>
    </motion.div>
  );
}

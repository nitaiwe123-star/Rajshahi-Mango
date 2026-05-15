import { Play, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function VideoSection() {
  return (
    <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-leaf-green/20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mango-orange/10 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">বাগানের তাজা আম <br /><span className="text-mango-yellow text-3xl md:text-4xl italic font-normal">সরাসরি আপনার ভিডিও স্ক্রিনে</span></h2>
            <p className="text-stone-400 mb-10 text-lg leading-relaxed">
              আমরা কিভাবে সরাসরি বাগান থেকে আম সংগ্রহ করি এবং প্যাকিং করি তা দেখুন। আমাদের স্বচ্ছতা ও গুণমানই আমাদের শক্তি।
            </p>
            
            <div className="space-y-6">
              {[
                "সঠিকভাবে বাছাইকৃত গাছপাকা আম",
                "সুরক্ষিত প্যাকিং পদ্ধতি",
                "সরাসরি বাগান থেকে ভিডিও রিভিউ"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-leaf-green flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="font-medium text-stone-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
             <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1591073113125-e46049fe9201?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
                  alt="Mango Garden Video Thumbnail"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 bg-mango-yellow text-stone-900 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play fill="currentColor" size={32} />
                   </div>
                </div>
             </div>
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl hidden md:block">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-mango-orange" fill="currentColor" size={16} />
                  <Star className="text-mango-orange" fill="currentColor" size={16} />
                  <Star className="text-mango-orange" fill="currentColor" size={16} />
                  <Star className="text-mango-orange" fill="currentColor" size={16} />
                  <Star className="text-mango-orange" fill="currentColor" size={16} />
                </div>
                <p className="text-stone-900 font-bold text-sm">১০০০+ ভিডিও রিভিউ</p>
                <p className="text-stone-500 text-xs">আমাদের কাস্টমারদের ভালোবাসা</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

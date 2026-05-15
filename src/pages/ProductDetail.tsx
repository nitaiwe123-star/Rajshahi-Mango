import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ShieldCheck, Truck, RefreshCw, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const [qty, setQty] = useState(5);
  const [activeImg, setActiveImg] = useState(0);

  // Mock data for detail
  const product = {
    id,
    name: 'প্রিমিয়াম হিমসাগর আম',
    desc: 'রাজশাহীর বিখ্যাত হিমসাগর আম সরাসরি বাগান থেকে। অত্যন্ত মিষ্টি এবং সুগন্ধযুক্ত। আমাদের এই আমগুলো কোনো কেমিক্যাল ছাড়াই প্রাকৃতিকভাবে পাকানো হয়েছে।',
    price: 120,
    oldPrice: 150,
    rating: 4.9,
    reviewsCount: 150,
    images: [
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591073113125-e46049fe9201?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800'
    ],
    weightOptions: [5, 10, 20, 40],
    stock: 500,
    reviews: [
      {
        id: 1,
        user: 'আরিফ আহমেদ',
        rating: 5,
        date: '১২ মে, ২০২৪',
        comment: 'আমগুলো সত্যিই খুব মিষ্টি ছিল। একদম ফরমালিন মুক্ত গন্ধ পাওয়া যাচ্ছিল। প্যাকিং খুব ভালো ছিল।',
        image: 'https://images.unsplash.com/photo-1591073113125-e46049fe9201?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 2,
        user: 'ফারহানা ইসলাম',
        rating: 4,
        date: '১০ মে, ২০২৪',
        comment: 'খুবই তাজা আম। তবে ডেলিভারি এক দিন দেরি হয়েছে। আমের কোয়ালিটি নিয়ে কোনো অভিযোগ নেই।',
      },
      {
        id: 3,
        user: 'নাসির উদ্দিন',
        rating: 5,
        date: '৮ মে, ২০২৪',
        comment: 'রাজশাহীর আসল হিমসাগর আমের স্বাদ পেলাম অনেক দিন পর। সবাইকে রিকমেন্ড করছি।',
        image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=200'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-organic-bg pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Gallery */}
          <div className="space-y-6">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white relative group"
             >
                <img src={product.images[activeImg]} className="w-full h-full object-cover" alt={product.name} />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => setActiveImg(activeImg === 0 ? product.images.length - 1 : activeImg - 1)} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-stone-900 transition-all"><ChevronLeft size={24} /></button>
                   <button onClick={() => setActiveImg(activeImg === product.images.length - 1 ? 0 : activeImg + 1)} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-stone-900 transition-all"><ChevronRight size={24} /></button>
                </div>
             </motion.div>
             <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImg(idx)}
                    className={cn(
                      "w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                      activeImg === idx ? "border-leaf-green shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
             </div>
          </div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
             <div className="flex items-center gap-2 text-leaf-green mb-4">
                <Star fill="currentColor" size={20} className="text-mango-orange" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-stone-400 font-medium">({product.reviewsCount} কাস্টমার রিভিউ)</span>
             </div>

             <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">{product.name}</h1>
             
             <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-leaf-green">{formatPrice(product.price)} / KG</span>
                <span className="text-xl text-stone-400 line-through">{formatPrice(product.oldPrice)}</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">২০% ছাড়</span>
             </div>

             <p className="text-stone-500 text-lg leading-relaxed mb-10 pb-10 border-b border-stone-200">
               {product.desc}
             </p>

             <div className="space-y-8 mb-10">
                <div>
                   <h4 className="font-bold text-stone-900 mb-4">পরিমাণ (কেজি) বেছে নিন:</h4>
                   <div className="flex flex-wrap gap-4">
                      {product.weightOptions.map(w => (
                        <button 
                          key={w}
                          onClick={() => setQty(w)}
                          className={cn(
                            "px-6 py-3 rounded-xl font-bold border-2 transition-all",
                            qty === w ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-100 hover:border-stone-200"
                          )}
                        >
                          {w} কেজি
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-grow bg-leaf-green text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-leaf-light transition-all shadow-xl shadow-leaf-green/20">
                     <ShoppingCart size={24} />
                     কার্টে যোগ করুন
                  </button>
                  <Link to="/checkout" className="flex-grow bg-stone-900 text-white py-5 rounded-2xl font-bold text-xl text-center hover:bg-stone-800 transition-all">
                     সরাসরি অর্ডার করুন
                  </Link>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100">
                   <ShieldCheck className="text-leaf-green" />
                   <span className="text-xs font-bold">১০০% গ্যারান্টি</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100">
                   <Truck className="text-leaf-green" />
                   <span className="text-xs font-bold">৪৮ ঘণ্টা ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100">
                   <RefreshCw className="text-leaf-green" />
                   <span className="text-xs font-bold">সহজ রিটার্ন</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className="pt-24 border-t border-stone-200">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">কাস্টমার কি বলছেন?</h2>
              <p className="text-stone-500">আমাদের ক্রেতাদের প্রকৃত অভিজ্ঞতা এবং মতামত</p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-stone-100 shadow-sm">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-mango-orange mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill={i < 5 ? "currentColor" : "none"} size={16} />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-stone-900">{product.rating} গড় রেটিং</p>
                </div>
                <div className="w-px h-10 bg-stone-100" />
                <button className="bg-stone-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-stone-800 transition-all">
                  রিভিউ দিন
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.reviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col h-full"
              >
                <div className="flex items-center gap-1 text-mango-orange mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill={i < review.rating ? "currentColor" : "none"} size={16} />
                  ))}
                </div>
                
                <p className="text-stone-600 mb-6 flex-grow leading-relaxed italic">
                  "{review.comment}"
                </p>

                {review.image && (
                  <div className="mb-6 rounded-2xl overflow-hidden h-32 w-full">
                    <img src={review.image} className="w-full h-full object-cover" alt="Review" />
                  </div>
                )}

                <div className="flex items-center gap-4 pt-6 border-t border-stone-50">
                  <div className="w-12 h-12 rounded-full bg-organic-bg flex items-center justify-center font-bold text-stone-400">
                    {review.user[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">{review.user}</h4>
                    <p className="text-xs text-stone-400 uppercase tracking-widest">{review.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

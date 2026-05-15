import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const reviews = [
  {
    name: "কামরুল হাসান",
    location: "ঢাকা",
    rating: 5,
    comment: "অসাধারণ আমের স্বাদ! ঠিক যেমন ভিডিওতে দেখেছি। প্যাকিং খুব ভালো ছিল, কোনো আম নষ্ট হয়নি।",
    avatar: "https://i.pravatar.cc/150?u=kamrul"
  },
  {
    name: "ফারিয়া ইসলাম",
    location: "সিলেট",
    rating: 5,
    comment: "হিমসাগর আমগুলো সত্যিই ফ্রেশ এবং মিষ্টি ছিল। বাচ্ছারা খুব পছন্দ করেছে। সামনের বার আবার অর্ডার করব।",
    avatar: "https://i.pravatar.cc/150?u=faria"
  },
  {
    name: "জাহিদুল ইসলাম",
    location: "চট্টগ্রাম",
    rating: 4.8,
    comment: "খুব দ্রুত ডেলিভারি পেয়েছি। ল্যাংড়া আমগুলো বেশ বড় বড় ছিল। ধন্যবাদ আপনাদের কাস্টমার সার্ভিসের জন্য।",
    avatar: "https://i.pravatar.cc/150?u=zahid"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-leaf-green/10 text-leaf-green px-4 py-2 rounded-full font-bold text-sm mb-6"
          >
            <Star size={16} fill="currentColor" />
            কাস্টমার কি বলছে?
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">আমাদের কাস্টমারদের বিশ্বাসই <br /> আমাদের সাফল্যের চাবিকাঠি</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-organic-bg border border-stone-100 flex flex-col justify-between"
            >
              <div>
                <Quote className="text-mango-orange mb-6 opacity-30" size={40} />
                <div className="flex gap-1 text-mango-orange mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(review.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-stone-700 italic text-lg leading-relaxed mb-8">
                  "{review.comment}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <img src={review.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-md" alt={review.name} />
                <div>
                  <h4 className="font-bold text-stone-900">{review.name}</h4>
                  <p className="text-stone-500 text-sm">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

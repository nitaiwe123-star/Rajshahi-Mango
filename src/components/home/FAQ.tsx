import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    q: "কত দিনে ডেলিভারি পাওয়া যাবে?",
    a: "অর্ডার কনফার্ম করার পর ঢাকা সিটির ভেতরে ৪৮ ঘণ্টা এবং ঢাকার বাইরে ৭২ ঘণ্টার মধ্যে আমরা হোম ডেলিভারি দিয়ে থাকি।"
  },
  {
    q: "অর্ডার কি ক্যাশ অন ডেলিভারিতে করা যাবে?",
    a: "হ্যাঁ, আপনি হাতে আম পাওয়ার পর মূল্য পরিশোধ করার (Cash on Delivery) সুবিধা পাবেন।"
  },
  {
    q: "আম নষ্ট হলে কি হবে?",
    a: "যদি ডেলিভারির সময় কোনো আম নষ্ট পাওয়া যায়, তবে আপনি সাথে সাথে আমাদের জানাবেন। আমরা আপনার নষ্ট আমের সমপরিমাণ টাকা ফেরত দেব অথবা নতুন করে আম পাঠিয়ে দেব।"
  },
  {
    q: "আমরা কিভাবে আম পাঠাই?",
    a: "আমরা আমগুলো বিশেষভাবে তৈরি প্লাস্টিক ক্যারেট বা কার্টনে প্যাকিং করি যাতে পরিবহনের সময় আমগুলো সুরক্ষিত থাকে।"
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-organic-bg">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6 flex items-center justify-center gap-4">
             সচরাচর জিজ্ঞাসিত প্রশ্ন
          </h2>
          <p className="text-stone-500">আমাদের সার্ভিস সম্পর্কে গুরুত্বপূর্ণ কিছু তথ্য জেনে নিন।</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-lg text-stone-800 hover:bg-stone-50 transition-colors"
              >
                <span className="flex-grow">{faq.q}</span>
                {openIdx === idx ? <ChevronUp size={24} className="text-leaf-green" /> : <ChevronDown size={24} /> }
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-stone-500 leading-relaxed border-t border-stone-50"
                  >
                    <div className="pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

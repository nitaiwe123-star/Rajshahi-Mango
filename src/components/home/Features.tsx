import { ShieldCheck, Truck, Sparkles, MapPin, BadgePercent, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: <ShieldCheck className="text-leaf-green" size={32} />,
    title: "কেমিক্যাল মুক্ত",
    desc: "১০০% ফরমালিন ও ক্যালসিয়াম কার্বাইড মুক্ত গ্যারান্টি।"
  },
  {
    icon: <Sparkles className="text-leaf-green" size={32} />,
    title: "বাগান থেকে সরাসরি",
    desc: "রাজশাহীর বাগান থেকে সরাসরি আপনার ঘরে পৌঁছাবে।"
  },
  {
    icon: <Truck className="text-leaf-green" size={32} />,
    title: "দ্রুত হোম ডেলিভারি",
    desc: "ঢাকা সহ সারাদেশে ৪৮-৭২ ঘণ্টার মধ্যে ডেলিভারি।"
  },
  {
    icon: <BadgePercent className="text-leaf-green" size={32} />,
    title: "ন্যায্য মূল্য",
    desc: "মাঝারিদের ছাড়াই সরাসরি বাগান থেকে সাশ্রয়ী দামে।"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative leaf patterns could go here */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
          >
            কেন আমাদের আম সেরা?
          </motion.h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            আমরা গুনাগুন এবং ফ্রেশনেস এর ব্যাপারে কোনো আপস করি না। আমাদের প্রত্যেকটি আম সরাসরি বাগান থেকে সতর্কতার সাথে সংগ্রহ করা হয়।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-organic-bg border border-stone-100 hover:border-leaf-green/30 hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="mb-6 w-16 h-16 rounded-2xl bg-white flex items-center justify-center group-hover:bg-leaf-green/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{feature.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

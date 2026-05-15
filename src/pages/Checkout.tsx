import { useState, useEffect } from 'react';
import { ShoppingBag, Truck, CreditCard, CheckCircle, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { trackEvent } from '../lib/tracking';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    area: 'ঢাকা সিটি',
    payment: 'COD',
    notes: ''
  });

  useEffect(() => {
    trackEvent('InitiateCheckout');
  }, []);

  const cartItems = [
    { name: 'প্রিমিয়াম হিমসাগর', price: 120, qty: 10, total: 1200 },
  ];

  const subtotal = 1200;
  const shipping = formData.area === 'ঢাকা সিটি' ? 80 : 150;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('Purchase', {
      value: total,
      currency: 'BDT',
      content_name: 'Mango Order'
    });
    setStep(2);
    // Here we would create the order in Firestore
  };

  return (
    <div className="min-h-screen bg-organic-bg pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-12 text-center">চেকআউট</h1>

        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-stone-100"
            >
              <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                <Truck className="text-leaf-green" /> ডেলিভারি তথ্য
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">আপনার নাম *</label>
                    <input 
                      required
                      className="w-full p-4 rounded-2xl bg-organic-bg border border-stone-100 focus:outline-none focus:ring-2 focus:ring-leaf-green/20"
                      placeholder="পুরো নাম লিখুন"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">মোবাইল নাম্বার *</label>
                    <input 
                      required
                      className="w-full p-4 rounded-2xl bg-organic-bg border border-stone-100 focus:outline-none focus:ring-2 focus:ring-leaf-green/20"
                      placeholder="০১৭XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">পুরো ঠিকানা ও ল্যান্ডমার্ক *</label>
                    <textarea 
                      required
                      className="w-full p-4 rounded-2xl bg-organic-bg border border-stone-100 focus:outline-none focus:ring-2 focus:ring-leaf-green/20 min-h-[100px]"
                      placeholder="গ্রাম/বাড়ি নং, রোড নং, ইত্যাদি।"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">ডেলিভারি এরিয়া *</label>
                    <select 
                      className="w-full p-4 rounded-2xl bg-organic-bg border border-stone-100 focus:outline-none focus:ring-2 focus:ring-leaf-green/20"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                    >
                      <option>ঢাকা সিটি</option>
                      <option>ঢাকার বাইরে (অন্য জেলা)</option>
                    </select>
                 </div>

                 <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-leaf-green transition-all shadow-xl shadow-stone-900/10">
                    অর্ডার কনফার্ম করুন
                 </button>
                 
                 <a 
                   href="https://wa.me/8801234567890" 
                   className="w-full flex items-center justify-center gap-3 bg-[#25D366]/10 text-[#25D366] py-5 rounded-2xl font-bold text-lg hover:bg-[#25D366]/20 transition-all"
                 >
                    <MessageCircle /> WhatsApp এ অর্ডার করুন
                 </a>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:sticky lg:top-32 h-fit space-y-8"
            >
               <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100">
                  <h3 className="text-2xl font-bold text-stone-900 mb-8">অর্ডার সামারি</h3>
                  <div className="space-y-4 mb-8">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center pb-4 border-b border-stone-50">
                        <div>
                          <p className="font-bold text-stone-800">{item.name}</p>
                          <p className="text-xs text-stone-500">পরিমাণ: {item.qty} কেজি</p>
                        </div>
                        <p className="font-bold text-stone-900">{formatPrice(item.total)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 text-stone-600 mb-8">
                     <div className="flex justify-between">
                        <span>সাব-টোটাল</span>
                        <span>{formatPrice(subtotal)}</span>
                     </div>
                     <div className="flex justify-between">
                        <span>ডেলিভারি চার্জ</span>
                        <span>{formatPrice(shipping)}</span>
                     </div>
                     <div className="flex justify-between text-2xl font-bold text-stone-900 pt-4 border-t border-stone-100">
                        <span>মোট বিল</span>
                        <span className="text-leaf-green">{formatPrice(total)}</span>
                     </div>
                  </div>

                  <div className="bg-organic-bg p-6 rounded-2xl flex items-center gap-4 mb-6">
                     <CreditCard className="text-leaf-green" />
                     <p className="text-sm font-medium">পেমেন্ট মেথড: <span className="font-bold">ক্যাশ অন ডেলিভারি</span></p>
                  </div>

                  <div className="pt-6 space-y-4 border-t border-stone-100">
                     <div className="flex items-center gap-3 text-stone-500 text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="text-leaf-green" size={18} /> ১০০% নিরাপদ লেনদেন
                     </div>
                     <div className="flex items-center gap-3 text-stone-500 text-xs font-bold uppercase tracking-wider">
                        <Zap className="text-mango-orange" size={18} /> দ্রুত হোম ডেলিভারি (২৪-৪৮ ঘণ্টা)
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-16 rounded-[4rem] shadow-2xl text-center max-w-2xl mx-auto"
          >
             <div className="w-24 h-24 bg-leaf-green/10 text-leaf-green rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={56} />
             </div>
             <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">অর্ডার সফল হয়েছে!</h2>
             <p className="text-stone-500 mb-10 text-lg">ধন্যবাদ {formData.name}, আপনার অর্ডারটি গৃহীত হয়েছে। আমাদের একজন প্রতিনিধি শীঘ্রই আপনাকে ফোন করে অর্ডারটি কনফার্ম করবেন।</p>
             
             <div className="space-y-4">
                <button className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold" onClick={() => window.location.href='/'}>
                   হোম পেজে ফিরে যান
                </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate tracking data
    setTracking({
      id: orderId || 'ORD-12345',
      status: 'Shipped',
      date: '১৪ মে, ২০২৪',
      steps: [
        { label: 'অর্ডার পেন্ডিং', active: true, done: true, time: '১০ মে, ১০:০০ AM' },
        { label: 'অর্ডার কনফার্ম', active: true, done: true, time: '১০ মে, ০২:০০ PM' },
        { label: 'প্যাকিং', active: true, done: true, time: '১১ মে, ০৯:০০ AM' },
        { label: 'শিপড (পথে আছে)', active: true, done: false, time: '১২ মে, ১১:০০ AM' },
        { label: 'ডেলিভারড', active: false, done: false, time: '-' },
      ]
    });
  };

  return (
    <div className="min-h-screen bg-organic-bg pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">অর্ডার ট্র্যাক করুন</h1>
          <p className="text-stone-500">আপনার অর্ডার আইডি দিয়ে বর্তমান অবস্থা জেনে নিন।</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-100 mb-12">
           <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                 <input 
                   type="text" 
                   placeholder="অর্ডার আইডি দিন (যেমন: ORD-1234)" 
                   className="w-full pl-12 pr-4 py-4 rounded-2xl bg-organic-bg border border-stone-100 focus:outline-none focus:ring-2 focus:ring-leaf-green/20"
                   value={orderId}
                   onChange={(e) => setOrderId(e.target.value)}
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              </div>
              <button className="bg-leaf-green text-white px-10 py-4 rounded-2xl font-bold hover:bg-leaf-light transition-all flex items-center justify-center gap-2">
                 খুঁজুন
              </button>
           </form>
        </div>

        {tracking && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100"
          >
             <div className="flex justify-between items-center mb-10 pb-6 border-b border-stone-50">
                <div>
                   <p className="text-sm text-stone-400 mb-1 font-bold">অর্ডার আইডি</p>
                   <h3 className="text-2xl font-bold text-stone-900">{tracking.id}</h3>
                </div>
                <div className="text-right">
                   <p className="text-sm text-stone-400 mb-1 font-bold">বর্তমান অবস্থা</p>
                   <span className="bg-leaf-green/10 text-leaf-green px-4 py-1 rounded-full text-sm font-bold">{tracking.status}</span>
                </div>
             </div>

             <div className="relative space-y-12">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-stone-100 -z-0"></div>
                {tracking.steps.map((step: any, idx: number) => (
                  <div key={idx} className="relative z-10 flex items-start gap-8">
                     <div className={cn(
                       "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                       step.done ? "bg-leaf-green text-white" : step.active ? "bg-mango-orange text-white" : "bg-stone-100 text-stone-400"
                     )}>
                        {step.done ? <CheckCircle size={18} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                     </div>
                     <div className="flex-grow">
                        <h4 className={cn(
                          "text-lg font-bold transition-colors",
                          step.active ? "text-stone-900" : "text-stone-400"
                        )}>{step.label}</h4>
                        <p className="text-sm text-stone-500">{step.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

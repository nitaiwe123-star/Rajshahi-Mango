import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ShoppingBag, User, Heart, LogOut, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (!u) navigate('/login');
      else setUser(u);
    });
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-organic-bg pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 text-center">
                <div className="w-24 h-24 bg-leaf-green/10 text-leaf-green rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-serif font-bold">
                   {user.displayName?.[0] || user.email?.[0]}
                </div>
                <h3 className="text-xl font-bold text-stone-900">{user.displayName || 'সম্মানিত কাস্টমার'}</h3>
                <p className="text-stone-400 text-sm">{user.email}</p>
             </div>

             <nav className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-stone-100 space-y-2">
                <Link to="/dashboard" className="flex items-center gap-4 px-6 py-4 bg-leaf-green text-white rounded-2xl font-bold shadow-lg shadow-leaf-green/20">
                   <Package size={20} /> আমার অর্ডার
                </Link>
                <Link to="/dashboard/wishlist" className="flex items-center gap-4 px-6 py-4 text-stone-500 hover:bg-stone-50 rounded-2xl font-bold">
                   <Heart size={20} /> উইশলিস্ট
                </Link>
                <Link to="/dashboard/profile" className="flex items-center gap-4 px-6 py-4 text-stone-500 hover:bg-stone-50 rounded-2xl font-bold">
                   <User size={20} /> প্রোফাইল
                </Link>
                <button onClick={() => auth.signOut()} className="flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-2xl font-bold w-full transition-all">
                   <LogOut size={20} /> লগআউট
                </button>
             </nav>
          </aside>

          {/* Content */}
          <main className="flex-grow space-y-8">
             <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100">
                <h2 className="text-2xl font-bold text-stone-900 mb-8">আমার সাম্প্রতিক অর্ডারসমূহ</h2>
                
                <div className="space-y-6">
                   <div className="p-8 rounded-3xl border border-stone-50 bg-organic-bg/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div>
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">অর্ডার #১২৩৪৫</p>
                        <h4 className="text-lg font-bold text-stone-900">৫ কেজি হিমসাগর আম</h4>
                        <p className="text-sm text-stone-500 font-medium">১০ মে, ২০২৪</p>
                      </div>
                      <div className="flex flex-col md:items-end gap-2">
                        <span className="bg-leaf-green/10 text-leaf-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">ডেলিভারড</span>
                        <p className="font-bold text-lg text-stone-900">৳৬০০</p>
                      </div>
                      <Link to="/track" className="bg-white px-6 py-3 rounded-xl border border-stone-200 text-sm font-bold hover:bg-stone-50 transition-all">
                         ট্র্যাক করুন
                      </Link>
                   </div>

                   <p className="text-center text-stone-400 italic py-10">আপনার বর্তমানে আর কোনো অর্ডার নেই।</p>
                </div>
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}

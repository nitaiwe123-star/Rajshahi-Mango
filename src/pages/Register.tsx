import { useState } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAfterAuth = async (user: any, nameAttr?: string) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: nameAttr || user.displayName || user.email.split('@')[0],
        role: user.email === 'nitaiwe123@gmail.com' ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      });
    }

    if (user.email === 'nitaiwe123@gmail.com') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await handleAfterAuth(result.user, name);
    } catch (err: any) {
      setError('একাউন্ট তৈরি করা সম্ভব হয়নি। ইমেইলটি হয়তো ইতিমধ্যে ব্যবহৃত।');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleAfterAuth(result.user);
    } catch (error) {
      console.error("Register Error:", error);
      setError('গুগল দিয়ে একাউন্ট তৈরি করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-24 md:py-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/50 p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-black text-stone-900 mb-3">নতুন একাউন্ট</h2>
          <p className="text-stone-500 text-sm leading-relaxed">সেরা আমের স্বাদ পেতে আজই একটি একাউন্ট তৈরি করুন।</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle size={18} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleEmailRegister} className="space-y-4 mb-8">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              required
              type="text" 
              placeholder="আপনার নাম"
              className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-leaf-green/5 transition-all font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              required
              type="email" 
              placeholder="আপনার ইমেইল"
              className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-leaf-green/5 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              required
              type="password" 
              placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
              className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-leaf-green/5 transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-leaf-green transition-all shadow-xl shadow-stone-900/10 disabled:opacity-50 mt-4"
          >
            {loading ? 'একাউন্ট তৈরি হচ্ছে...' : 'একাউন্ট তৈরি করুন'}
          </button>
        </form>

        <div className="relative mb-8">
           <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-100"></div>
           </div>
           <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-stone-400">
              <span className="bg-white px-4">অথবা</span>
           </div>
        </div>

        <button 
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 border-2 border-stone-50 bg-white py-4 rounded-2xl hover:bg-stone-50 transition-all font-bold text-stone-700 disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          Google দিয়ে একাউন্ট তৈরি করুন
        </button>

        <p className="mt-10 text-center text-sm text-stone-500">
          ইতিমধ্যে একাউন্ট আছে? <Link to="/login" className="text-mango-orange font-bold">লগইন করুন</Link>
        </p>
      </motion.div>
    </div>
  );
}

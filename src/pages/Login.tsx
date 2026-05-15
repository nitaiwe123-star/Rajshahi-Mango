import { useState } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAfterLogin = async (user: any) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleAfterLogin(result.user);
    } catch (err: any) {
      setError('ইমেইল বা পাসওয়ার্ড ভুল অথবা একাউন্টটি খুঁজে পাওয়া যায়নি।');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPass = async () => {
    if (!email) {
      setError('পাসওয়ার্ড রিসেট করতে আগে ইমেইল দিন।');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('আপনার ইমেইলে পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে। চেক করুন।');
      setError('');
    } catch (err) {
      setError('পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো সম্ভব হয়নি।');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      await handleAfterLogin(result.user);
    } catch (error: any) {
      console.error("Login Error:", error);
      setError('গুগল লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
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
          <h2 className="text-4xl font-serif font-black text-stone-900 mb-3">স্বাগতম!</h2>
          <p className="text-stone-500 text-sm leading-relaxed">সেরা আম অর্ডার করতে এবং একাউন্ট ম্যানেজ করতে লগইন করুন।</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-pulse">
            <AlertCircle size={18} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-700 text-sm">
            <AlertCircle size={18} />
            <span className="font-medium">{message}</span>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-8">
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
              placeholder="পাসওয়ার্ড"
              className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-leaf-green/5 transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={handleForgotPass}
              className="text-xs font-bold text-mango-orange hover:text-leaf-green transition-colors uppercase tracking-widest"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-leaf-green transition-all shadow-xl shadow-stone-900/10 disabled:opacity-50"
          >
            {loading ? 'লোড হচ্ছে...' : 'লগইন করুন'}
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
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 border-2 border-stone-50 bg-white py-4 rounded-2xl hover:bg-stone-50 transition-all font-bold text-stone-700 disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          Google দিয়ে লগইন করুন
        </button>

        <p className="mt-10 text-center text-sm text-stone-500">
          নতুন ইউজার? <Link to="/register" className="text-leaf-green font-bold">একাউন্ট তৈরি করুন</Link>
        </p>
      </motion.div>
    </div>
  );
}

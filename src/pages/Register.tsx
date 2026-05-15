import { useState } from 'react';
import { auth, db } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'motion/react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          role: user.email === 'nitaiwe123@gmail.com' ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        });
      }

      if (user.email === 'nitaiwe123@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Register Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-organic-bg px-4 py-20 mt-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 text-center"
      >
        <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">রেজিস্ট্রেশন করুন</h2>
        <p className="text-stone-500 mb-10">আপনার পছন্দের আমগুলো সহজে অর্ডার করতে এবং ডিসকাউন্ট পেতে একাউন্ট তৈরি করুন।</p>

        <button 
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center gap-4 border border-stone-200 py-4 rounded-2xl hover:bg-stone-50 transition-all font-bold text-stone-700 disabled:opacity-50"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          {loading ? 'লোড হচ্ছে...' : 'Google দিয়ে একাউন্ট খুলুন'}
        </button>

        <p className="mt-8 text-sm text-stone-500">
          ইতিমধ্যে একাউন্ট আছে? <a href="/login" className="text-leaf-green font-bold">লগইন করুন</a>
        </p>

        <p className="mt-8 text-xs text-stone-400">
          একাউন্ট খোলার মাধ্যমে আপনি আমাদের শর্তাবলী ও প্রাইভেসি পলিসির সাথে একমত পোষণ করছেন।
        </p>
      </motion.div>
    </div>
  );
}

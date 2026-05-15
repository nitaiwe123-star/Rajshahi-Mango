import { useState, useEffect } from 'react';
import { auth, db, storage } from '../services/firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  Star,
  Tag,
  BarChart3,
  Image as ImageIcon,
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Layers,
  Upload
} from 'lucide-react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { formatPrice, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const chartData = [
  { name: 'শনিবার', sales: 4000, orders: 24 },
  { name: 'রবিবার', sales: 3000, orders: 18 },
  { name: 'সোমবার', sales: 2000, orders: 12 },
  { name: 'মঙ্গলবার', sales: 2780, orders: 15 },
  { name: 'বুধবার', sales: 1890, orders: 10 },
  { name: 'বৃহস্পতিবার', sales: 2390, orders: 14 },
  { name: 'শুক্রবার', sales: 3490, orders: 21 },
];

const categoryData = [
  { name: 'হিমসাগর', value: 450 },
  { name: 'ল্যাংড়া', value: 320 },
  { name: 'ফজলি', value: 180 },
  { name: 'আম্রপালি', value: 250 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user && user.email === 'nitaiwe123@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        navigate('/login');
      }
    });
  }, [navigate]);

  if (isAdmin === null) {
    return <div className="flex items-center justify-center h-screen font-serif italic bg-stone-100">যাচাই করা হচ্ছে...</div>;
  }

  const menuItems = [
    { name: 'ড্যাশবোর্ড', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'অর্ডারসমূহ', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'পণ্যসমূহ', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'ক্যাটাগরি', icon: <Layers size={20} />, path: '/admin/categories' },
    { name: 'কাস্টমার', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'রিভিউ', icon: <Star size={20} />, path: '/admin/reviews' },
    { name: 'কুপন', icon: <Tag size={20} />, path: '/admin/coupons' },
    { name: 'ব্যানার', icon: <ImageIcon size={20} />, path: '/admin/banners' },
    { name: 'অ্যাক্টিভিটি লগ', icon: <Clock size={20} />, path: '/admin/logs' },
    { name: 'রিপোর্ট', icon: <BarChart3 size={20} />, path: '/admin/reports' },
    { name: 'সেটিংস', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const currentItem = menuItems.find(item => item.path === location.pathname) || menuItems[0];

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-stone-200 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-stone-100 bg-stone-50/50">
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 bg-leaf-green rounded-xl flex items-center justify-center text-white shadow-lg shadow-leaf-green/20 group-hover:rotate-12 transition-all">
                <Package size={18} />
             </div>
             <div>
               <h2 className="text-lg font-serif font-bold text-stone-900 leading-none">Fresh Mango</h2>
               <span className="text-[10px] font-bold text-leaf-green uppercase tracking-widest">Admin Control</span>
             </div>
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all",
                location.pathname === item.path 
                  ? "bg-leaf-green text-white shadow-xl shadow-leaf-green/20" 
                  : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-stone-100">
          <button 
            onClick={() => auth.signOut()} 
            className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl w-full transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b border-stone-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-stone-500 hover:bg-stone-100 rounded-xl"
            >
              <Filter size={24} />
            </button>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-stone-900">{currentItem.name}</h1>
              <p className="text-xs text-stone-400 font-medium tracking-wide uppercase">অ্যাডমিন ড্যাশবোর্ড / {currentItem.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full border border-stone-100">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-xs font-bold text-stone-600">সার্ভার অনলাইন</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-mango-orange flex items-center justify-center text-white border-2 border-white shadow-md font-bold">
               N
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 md:p-8 flex-grow">
          <Routes>
            <Route index element={<AdminStats />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function ImagePicker({ onSelect, currentImage }: { onSelect: (url: string) => void, currentImage?: string }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const presets = [
    'https://images.unsplash.com/photo-1553279768-865429fa0078',
    'https://images.unsplash.com/photo-1591073113125-e46049fe9201',
    'https://images.unsplash.com/photo-1601050690597-df056fb4ce70',
    'https://images.unsplash.com/photo-1596003903067-bf5762ad5c19',
    'https://images.unsplash.com/photo-1557800636-894a64c1696f',
    'https://images.unsplash.com/photo-1523348830342-d0d2009c2a04',
    'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd',
    'https://images.unsplash.com/photo-1550258987-190a2d41a8ba',
    'https://images.unsplash.com/photo-1551392505-f4056bb330f0',
  ];

  const searchImages = async () => {
    if (!search) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      const res = Array.from({length: 9}, (_, i) => `https://source.unsplash.com/featured/?mango,fruit,farm,${search}&sig=${i + Math.random()}`);
      setResults(res);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onSelect(url);
      setResults(prev => [url, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("ছবি আপলোড করতে সমস্যা হয়েছে।");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow group">
          <input 
            type="text" 
            placeholder="গ্যালারি থেকে খুঁজতে সার্চ করুন (যেমন: mango)..." 
            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-leaf-green/5 transition-all font-medium"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchImages()}
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-leaf-green transition-colors" size={18} />
        </div>
        <div className="flex gap-2">
          <button 
            type="button" 
            onClick={searchImages} 
            className="flex-grow sm:flex-none px-6 py-4 bg-stone-900 text-white rounded-2xl text-sm font-bold disabled:opacity-50 hover:bg-leaf-green transition-all shadow-lg shadow-stone-900/10" 
            disabled={loading}
          >
            {loading ? 'লোড হচ্ছে...' : 'খুঁজুন'}
          </button>
          <label className="flex items-center justify-center px-6 py-4 bg-leaf-green text-white rounded-2xl text-sm font-bold cursor-pointer hover:bg-leaf-light transition-all shadow-lg shadow-leaf-green/10">
            {uploading ? '...' : <Upload size={18} />}
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 max-h-[300px] overflow-y-auto p-2 custom-scrollbar border border-stone-100 rounded-3xl bg-stone-50/30">
        {(results.length > 0 ? results : presets).map((url, i) => (
          <button 
            key={i}
            type="button"
            onClick={() => onSelect(url)}
            className={cn(
              "aspect-square rounded-2xl overflow-hidden border-4 transition-all hover:scale-105 active:scale-95 shadow-sm group relative",
              currentImage === url ? "border-leaf-green ring-4 ring-leaf-green/10" : "border-white hover:border-stone-200"
            )}
          >
            <img src={url} className="w-full h-full object-cover" alt="" />
            {currentImage === url && (
              <div className="absolute inset-0 bg-leaf-green/20 flex items-center justify-center">
                <CheckCircle className="text-white" size={32} />
              </div>
            )}
          </button>
        ))}
      </div>
      <p className="text-[10px] uppercase font-black tracking-widest text-stone-400 text-center">উপরে ছবি সিলেক্ট করলে বা আপলোড করলে অটোমেটিক আপডেট হবে</p>
    </div>
  );
}

function AdminStats() {
  const [counts, setCounts] = useState({ totalSales: 0, pending: 0, delivered: 0, successRate: '0%' });
  const [logger, setLogger] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderSnap = await getDocs(collection(db, 'orders'));
        const orders = orderSnap.docs.map(doc => doc.data());
        const pending = orders.filter(o => o.status === 'pending').length;
        const delivered = orders.filter(o => o.status === 'delivered').length;
        const totalRev = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);
        const rate = orders.length > 0 ? Math.round((delivered / orders.length) * 100) + '%' : '0%';
        
        setCounts({
          totalSales: totalRev,
          pending,
          delivered,
          successRate: rate
        });

        const logQ = query(collection(db, 'logs'), orderBy('time', 'desc'));
        const logSnap = await getDocs(logQ);
        setLogger(logSnap.docs.slice(0, 4).map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'মোট বিক্রয়', value: formatPrice(counts.totalSales), icon: <TrendingUp className="text-blue-500" />, trend: '+১২%', color: 'blue' },
    { label: 'পেন্ডিং অর্ডার', value: counts.pending.toString(), icon: <Clock className="text-orange-500" />, trend: 'সক্রিয়', color: 'orange' },
    { label: 'ডেলিভারড', value: counts.delivered.toString(), icon: <CheckCircle className="text-green-500" />, trend: '+৫', color: 'green' },
    { label: 'সফল অর্ডার', value: counts.successRate, icon: <CheckCircle className="text-indigo-500" />, trend: 'ভাল', color: 'indigo' },
  ];

  if (loading) return <div className="text-center py-20 font-serif italic text-stone-400">পরিসংখ্যান লোড হচ্ছে...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">অ্যাডমিন ওভারভিউ</h2>
          <p className="text-stone-500">আপনার ব্যবসার আজকের পারফরম্যান্স এবং স্ট্যাটিস্টিকস</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/reports" className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:bg-stone-50 transition-all">
             <Download size={16} /> এক্সপোর্ট
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-bold hover:bg-leaf-green transition-all">
             <Plus size={16} /> নতুন প্রোডাক্ট
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl", {
                'bg-blue-50': stat.color === 'blue',
                'bg-orange-50': stat.color === 'orange',
                'bg-green-50': stat.color === 'green',
                'bg-indigo-50': stat.color === 'indigo',
              })}>{stat.icon}</div>
              <span className="text-[10px] font-bold px-2 py-1 bg-stone-100 rounded-full text-stone-500 uppercase tracking-wider">{stat.trend}</span>
            </div>
            <p className="text-stone-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-stone-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-200">
           <h3 className="text-lg font-bold text-stone-900 mb-8">বিক্রয় গ্রাফ (সাপ্তাহিক)</h3>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#1e293b" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-200">
          <h3 className="text-lg font-bold text-stone-900 mb-8">সাম্প্রতিক অ্যাক্টিভিটি</h3>
          <div className="space-y-6">
             {logger.length === 0 ? (
               <div className="text-stone-400 italic text-sm">কোনো কার্যক্রম নেই</div>
             ) : logger.map((log, i) => (
               <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400">
                     <Clock size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{log.message}</h4>
                    <p className="text-xs text-stone-400">{new Date(log.time).toLocaleString('bn-BD')}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।');
    }
  };

  if (loading) return <div className="text-center py-20 font-serif italic">অর্ডার লোড হচ্ছে...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-8">অর্ডার ম্যানেজমেন্ট</h2>
      <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-stone-50 border-b border-stone-100 text-stone-500 font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">অর্ডার আইডি</th>
                <th className="px-8 py-4">কাস্টমার</th>
                <th className="px-8 py-4">পরিমাণ</th>
                <th className="px-8 py-4">টাকা</th>
                <th className="px-8 py-4">অবস্থা</th>
                <th className="px-8 py-4">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-8 py-4 font-bold text-stone-900">#{order.id.slice(-6)}</td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-stone-900">{order.customerName}</p>
                    <p className="text-xs text-stone-400">{order.customerPhone}</p>
                  </td>
                  <td className="px-8 py-4 text-sm">{order.items?.length || 0} আইটেম</td>
                  <td className="px-8 py-4 font-bold text-leaf-green">{formatPrice(order.total)}</td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                      order.status === 'delivered' ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <select 
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-xs bg-stone-100 border-none rounded-lg p-2"
                      value={order.status}
                    >
                      <option value="pending">পেন্ডিং</option>
                      <option value="delivered">ডেলিভারড</option>
                      <option value="cancelled">ক্যান্সেল</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', stock: '', image: '', category: 'হিমসাগর', featured: false
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'products'));
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        createdAt: new Date().toISOString()
      });
      await addDoc(collection(db, 'logs'), { type: 'product_added', message: `পণ্য যোগ: ${newProduct.name}`, time: new Date().toISOString() });
      setIsAddModalOpen(false);
      fetchProducts();
      setNewProduct({ name: '', price: '', stock: '', image: '', category: 'হিমসাগর', featured: false });
    } catch (err) {
      alert('ব্যর্থ হয়েছে।');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('নিশ্চিত?')) return;
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  if (loading) return <div className="text-center py-20 italic">লোড হচ্ছে...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-900">আমের তালিকা</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-leaf-green text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg">
           <Plus size={20} /> নতুন আম যোগ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={p.id} 
            className="bg-white rounded-[2.5rem] border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
          >
             <div className="aspect-square overflow-hidden relative">
                <img src={p.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-leaf-green shadow-sm border border-leaf-green/10">
                   STOCK: {p.stock} KG
                </div>
             </div>
             <div className="p-6">
               <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-stone-900">{p.name}</h4>
                  <span className="text-[10px] font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded-lg uppercase">{p.category}</span>
               </div>
               <p className="text-leaf-green font-black text-xl mb-4">{formatPrice(p.price)}</p>
               <div className="flex gap-2">
                  <button className="flex-grow py-3 bg-stone-50 text-stone-900 rounded-xl text-xs font-bold hover:bg-stone-100 transition-all">এডিট করুন</button>
                  <button onClick={() => deleteProduct(p.id)} className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                    <LogOut size={16} className="rotate-90" />
                  </button>
               </div>
             </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[3rem] p-10 max-w-xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
               <h3 className="text-2xl font-bold mb-8">নতুন আম যোগ করুন</h3>
               <form onSubmit={handleAddProduct} className="space-y-6">
                  <input required placeholder="নাম" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="number" placeholder="দাম (কেজি)" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                    <input required type="number" placeholder="স্টক (কেজি)" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-widest px-1">ইমেজ গ্যালারি থেকে সিলেক্ট করুন</label>
                    <ImagePicker currentImage={newProduct.image} onSelect={url => setNewProduct({...newProduct, image: url})} />
                  </div>
                  <button className="w-full py-5 bg-leaf-green text-white rounded-2xl font-bold shadow-xl shadow-leaf-green/20 hover:bg-leaf-light transition-all">পণ্য যোগ করুন</button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', image: '' });

  const fetch = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, 'categories'));
    setCategories(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleAddCat = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'categories'), { ...newCat, slug: newCat.name.toLowerCase() });
    setIsModalOpen(false);
    fetch();
  };

  if (loading) return <div className="text-center py-20 italic">লোড হচ্ছে...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900">ক্যাটাগরি ম্যানেজমেন্ট</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-leaf-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
          <Plus size={20} /> নতুন ক্যাটাগরি
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-stone-200 text-center">
             <img src={cat.image} className="w-20 h-20 mx-auto rounded-full object-cover mb-4" alt="" />
             <h4 className="font-bold text-stone-900">{cat.name}</h4>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-stone-900/60" onClick={() => setIsModalOpen(false)} />
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-10 max-w-sm w-full relative z-10 shadow-2xl">
                <h3 className="text-xl font-bold mb-6">নতুন ক্যাটাগরি</h3>
                <form onSubmit={handleAddCat} className="space-y-4">
                   <input required placeholder="নাম" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} />
                   <ImagePicker currentImage={newCat.image} onSelect={url => setNewCat({...newCat, image: url})} />
                   <button className="w-full py-4 bg-leaf-green text-white rounded-2xl font-bold">যোগ করুন</button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminCustomers() { 
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'users'));
      setCustomers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="text-center py-20 italic">লোড হচ্ছে...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-900 mb-8">কাস্টমার ডাটাবেস</h2>
      <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden">
         <table className="w-full text-left">
           <thead className="bg-stone-50 border-b border-stone-100 text-stone-500 font-bold uppercase text-[10px] tracking-widest">
             <tr><th className="px-8 py-4">নাম</th><th className="px-8 py-4">ইমেইল</th><th className="px-8 py-4">রোল</th></tr>
           </thead>
           <tbody className="divide-y divide-stone-50">
             {customers.map(c => (
               <tr key={c.id}>
                 <td className="px-8 py-4 font-bold">{c.name || 'Unknown'}</td>
                 <td className="px-8 py-4 text-stone-500">{c.email}</td>
                 <td className="px-8 py-4">{c.role}</td>
               </tr>
             ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}

function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'reviews'), orderBy('createdAt', 'desc')));
      setReviews(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const toggleApproval = async (id: string, current: boolean) => {
    try {
      await updateDoc(doc(db, 'reviews', id), { approved: !current });
      fetchReviews();
    } catch (err) {
      alert('স্ট্যাটাস পরিবর্তনে সমস্যা হয়েছে।');
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('রিভিউটি মুছে ফেলতে চান?')) return;
    await deleteDoc(doc(db, 'reviews', id));
    fetchReviews();
  };

  if (loading) return <div className="text-center py-20 italic">রিভিউ লোড হচ্ছে...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-stone-900">রিভিউ ম্যানেজমেন্ট</h2>
      <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden">
         <table className="w-full text-left">
           <thead className="bg-stone-50 border-b border-stone-100 text-stone-500 font-bold uppercase text-[10px] tracking-widest">
             <tr>
               <th className="px-8 py-4">কাস্টমার</th>
               <th className="px-8 py-4">রেটিং</th>
               <th className="px-8 py-4">মন্তব্য</th>
               <th className="px-8 py-4">অবস্থা</th>
               <th className="px-8 py-4">অ্যাকশন</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-stone-50">
             {reviews.map(r => (
               <tr key={r.id} className="hover:bg-stone-50 transition-colors">
                 <td className="px-8 py-4 font-bold">{r.userName}</td>
                 <td className="px-8 py-4">
                    <div className="flex text-mango-orange">
                      {Array.from({length: 5}).map((_, i) => <Star key={i} size={12} fill={i < r.rating ? 'currentColor' : 'none'} />)}
                    </div>
                 </td>
                 <td className="px-8 py-4 text-sm text-stone-600 italic">"{r.comment}"</td>
                 <td className="px-8 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                      r.approved ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {r.approved ? 'Approved' : 'Pending'}
                    </span>
                 </td>
                 <td className="px-8 py-4 space-x-2">
                    <button onClick={() => toggleApproval(r.id, r.approved)} className="text-xs font-bold text-leaf-green hover:underline">
                      {r.approved ? 'আন-অ্যাপ্রুভ' : 'অ্যাপ্রুভ'}
                    </button>
                    <button onClick={() => deleteReview(r.id)} className="text-xs font-bold text-red-500 hover:underline">মুছুন</button>
                 </td>
               </tr>
             ))}
             {reviews.length === 0 && (
               <tr><td colSpan={5} className="px-8 py-10 text-center text-stone-400 italic">এখনও কোনো রিভিউ নেই।</td></tr>
             )}
           </tbody>
         </table>
      </div>
    </div>
  );
}

function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCpn, setNewCpn] = useState({ code: '', discount: '', expiry: '' });

  const fetch = async () => {
    const snap = await getDocs(collection(db, 'coupons'));
    setCoupons(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'coupons'), { ...newCpn, status: 'active' });
    setIsModalOpen(false);
    fetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-stone-900">ডিসকাউন্ট কুপন</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-leaf-green text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2">
           <Tag size={20} /> নতুন কুপন
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map(cpn => (
          <div key={cpn.id} className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-stone-200">
             <h3 className="text-xl font-black text-leaf-green mb-2">{cpn.code}</h3>
             <p className="text-sm font-bold text-stone-600">{cpn.discount} ডিসকাউন্ট</p>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-stone-900/60" onClick={() => setIsModalOpen(false)} />
             <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-10 max-w-sm w-full relative z-10 shadow-2xl">
                <h3 className="text-xl font-bold mb-6">নতুন কুপন</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                   <input required placeholder="কোড" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none" value={newCpn.code} onChange={e => setNewCpn({...newCpn, code: e.target.value})} />
                   <input required placeholder="ডিসকাউন্ট" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none" value={newCpn.discount} onChange={e => setNewCpn({...newCpn, discount: e.target.value})} />
                   <input required type="date" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none" value={newCpn.expiry} onChange={e => setNewCpn({...newCpn, expiry: e.target.value})} />
                   <button className="w-full py-4 bg-leaf-green text-white rounded-2xl font-bold">যোগ করুন</button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminBanners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newBanner, setNewBanner] = useState({ title: '', image: '', type: 'slider', order: 0 });
  const [filter, setFilter] = useState<'all' | 'slider' | 'offer'>('all');

  const fetch = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'banners'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      setBanners(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const filteredBanners = filter === 'all' ? banners : banners.filter(b => b.type === filter);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDoc(doc(db, 'banners', editId), { ...newBanner });
      } else {
        await addDoc(collection(db, 'banners'), { ...newBanner, createdAt: new Date().toISOString() });
      }
      setIsModalOpen(false);
      setEditId(null);
      setNewBanner({ title: '', image: '', type: 'slider', order: 0 });
      fetch();
    } catch (err) {
      alert('ব্যর্থ হয়েছে।');
    }
  };

  const openEdit = (b: any) => {
    setEditId(b.id);
    setNewBanner({ title: b.title, image: b.image, type: b.type, order: b.order });
    setIsModalOpen(true);
  };

  const del = async (id: string) => {
    if (!confirm('মুছে ফেলতে চান?')) return;
    await deleteDoc(doc(db, 'banners', id));
    fetch();
  };

  const move = async (id: string, currentOrder: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? banners.findIndex(b => b.id === id) - 1 : banners.findIndex(b => b.id === id) + 1;
    if (targetIdx < 0 || targetIdx >= banners.length) return;
    
    const other = banners[targetIdx];
    try {
      await updateDoc(doc(db, 'banners', id), { order: other.order });
      await updateDoc(doc(db, 'banners', other.id), { order: currentOrder });
      fetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-20 italic">ব্যানার লোড হচ্ছে...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">ব্যানার ও অফার ম্যানেজমেন্ট</h2>
          <p className="text-stone-500 text-sm italic font-serif">হোমপেজের মেইন স্লাইডার এবং ছোট অফার ব্যানারগুলো এখান থেকে নিয়ন্ত্রণ করুন</p>
        </div>
        <button 
          onClick={() => { setEditId(null); setNewBanner({ title: '', image: '', type: 'slider', order: banners.length }); setIsModalOpen(true); }} 
          className="bg-stone-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-stone-900/10 hover:bg-leaf-green transition-all"
        >
           <ImageIcon size={20} /> নতুন ব্যানার যোগ করুন
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-stone-200 shadow-sm mb-6">
        <div className="flex bg-stone-100 p-1.5 rounded-2xl">
          {(['all', 'slider', 'offer'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-6 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-widest",
                filter === type ? "bg-white text-stone-900 shadow-sm ring-1 ring-stone-900/5" : "text-stone-400 hover:text-stone-600"
              )}
            >
              {type === 'all' ? 'সকল' : type === 'slider' ? 'স্লাইডার' : 'অফার'}
            </button>
          ))}
        </div>
        <div className="text-stone-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <Filter size={14} /> মোট {filteredBanners.length} টি ব্যানার
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBanners.map((b, idx) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            key={b.id} 
            className="space-y-4 group"
          >
             <div className="flex justify-between items-center px-2">
                <div>
                   <h4 className="font-bold text-stone-900 flex items-center gap-2">
                     <span className="w-6 h-6 bg-stone-100 text-stone-400 text-[10px] flex items-center justify-center rounded-full">#{idx + 1}</span>
                     {b.title}
                   </h4>
                   <span className="text-[10px] font-black uppercase tracking-widest text-leaf-green italic">{b.type}</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="flex flex-col">
                      <button onClick={() => move(b.id, b.order, 'up')} className="text-stone-300 hover:text-stone-900 transition-colors"><Plus size={14} className="rotate-45" /></button>
                      <button onClick={() => move(b.id, b.order, 'down')} className="text-stone-300 hover:text-stone-900 transition-colors"><Plus size={14} className="-rotate-45" /></button>
                   </div>
                   <button onClick={() => openEdit(b)} className="w-8 h-8 flex items-center justify-center bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-900 hover:text-white transition-all"><Settings size={14} /></button>
                   <button onClick={() => del(b.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><LogOut size={14} className="rotate-90" /></button>
                </div>
             </div>
             <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-white border border-stone-200 shadow-sm relative group-hover:shadow-xl transition-all">
                <img src={b.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-all" />
             </div>
          </motion.div>
        ))}
        {banners.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-stone-200">
             <ImageIcon size={48} className="mx-auto text-stone-300 mb-4" />
             <p className="text-stone-400 italic">কোনো ব্যানার এখনও যোগ করা হয়নি।</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] p-10 max-w-xl w-full relative z-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
                <h3 className="text-2xl font-bold mb-8">{editId ? 'ব্যানার এডিট করুন' : 'নতুন ব্যানার যোগ করুন'}</h3>
                <form onSubmit={handleSave} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">ব্যানার টাইটেল</label>
                      <input required placeholder="যেমন: ১টি কিনলে ১টি ফ্রি অফার" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-leaf-green/10 transition-all font-bold border border-stone-100" value={newBanner.title} onChange={e => setNewBanner({...newBanner, title: e.target.value})} />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">টাইপ</label>
                        <select className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none font-bold border border-stone-100" value={newBanner.type} onChange={e => setNewBanner({...newBanner, type: e.target.value})}>
                           <option value="slider">স্লাইডার (Main)</option>
                           <option value="offer">অফার ব্যানার (Small)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">অর্ডার / ক্রম</label>
                        <input type="number" className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none font-bold border border-stone-100" value={newBanner.order} onChange={e => setNewBanner({...newBanner, order: Number(e.target.value)})} />
                      </div>
                   </div>

                   <div className="space-y-4">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">ব্যানার ইমেজ গ্যালারি</label>
                    <ImagePicker currentImage={newBanner.image} onSelect={url => setNewBanner({...newBanner, image: url})} />
                   </div>
                   
                   <button className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold shadow-xl shadow-stone-900/20 hover:bg-leaf-green transition-all">
                     {editId ? 'পরিবর্তন সেভ করুন' : 'ব্যানার যোগ করুন'}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(query(collection(db, 'logs'), orderBy('time', 'desc')));
      setLogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-900">সিস্টেম লগ</h2>
      <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden divide-y divide-stone-50">
        {logs.map(log => (
          <div key={log.id} className="p-6 flex items-start gap-4">
             <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 shrink-0"><Clock size={16} /></div>
             <div>
               <p className="font-bold text-stone-900 text-sm">{log.message}</p>
               <p className="text-xs text-stone-400">{new Date(log.time).toLocaleString('bn-BD')}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminReports() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200">
          <h4 className="text-stone-400 font-bold text-xs uppercase tracking-widest mb-2">মোট রেভিনিউ</h4>
          <p className="text-3xl font-black text-stone-900">৳১,৪২,০০০</p>
       </div>
       <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200">
          <h4 className="text-stone-400 font-bold text-xs uppercase tracking-widest mb-2">মোট আম বিক্রি</h4>
          <p className="text-3xl font-black text-stone-900">১২৫০ কেজি</p>
       </div>
    </div>
  );
}

function AdminSettings() {
  const [s, setS] = useState({ 
    siteName: 'Fresh Mango', 
    whatsapp: '0123456789',
    primaryColor: '#2d5a27', // leaf-green
    accentColor: '#fb923c', // mango-orange
    metaDescription: 'রাজশাহীর সেরা ও কেমিক্যাল মুক্ত গাছপাকা আম সরাসরি বাগান থেকে আপনার দোরগোড়ায়।',
    fbLink: '',
    igLink: '',
    deliveryFee: '১০০',
    minOrderValue: '৫০০',
    logo: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, 'settings'));
      const data = snap.docs.find(d => d.id === 'general')?.data();
      if (data) setS(prev => ({ ...prev, ...data }));
      setLoading(false);
    };
    fetch();
  }, []);

  const save = async () => {
    try {
      await setDoc(doc(db, 'settings', 'general'), s);
      alert('সফলভাবে সেভ হয়েছে।');
    } catch (err) {
      alert('সেভ করতে সমস্যা হয়েছে।');
    }
  };

  if (loading) return <div className="text-center py-20 italic">সেটিংস লোড হচ্ছে...</div>;

  return (
    <div className="space-y-12 pb-20">
       <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">সিস্টেম কন্ট্রোল</h2>
            <p className="text-stone-500 italic">আপনার ওয়েবসাইটের কন্টেন্ট এবং থিম এখান থেকে ম্যানেজ করুন</p>
          </div>
          <button onClick={save} className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-bold shadow-xl shadow-stone-900/10 hover:bg-leaf-green transition-all">সেটিং সেভ করুন</button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Site Config */}
          <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-50 pb-4">
              <Settings className="text-stone-400" size={20} /> সাধারণ তথ্য
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">ওয়েবসাইট নাম</label>
                <input className="w-full px-6 py-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none font-bold active:ring-2 focus:ring-2 ring-stone-900/5 transition-all" value={s.siteName} onChange={e => setS({...s, siteName: e.target.value})} placeholder="যেমন: Fresh Mango" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">মেটা ডেসক্রিপশন (SEO)</label>
                <textarea rows={3} className="w-full px-6 py-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none font-medium active:ring-2 focus:ring-2 ring-stone-900/5 transition-all text-sm" value={s.metaDescription} onChange={e => setS({...s, metaDescription: e.target.value})} placeholder="ওয়েবসাইটের সারসংক্ষেপ..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">ডেলিভারি চার্জ</label>
                  <input className="w-full px-6 py-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none font-bold" value={s.deliveryFee} onChange={e => setS({...s, deliveryFee: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">মিনিমাম অর্ডার ভ্যালু</label>
                  <input className="w-full px-6 py-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none font-bold" value={s.minOrderValue} onChange={e => setS({...s, minOrderValue: e.target.value})} />
                </div>
              </div>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-50 pb-4">
              <Users className="text-stone-400" size={20} /> সোশাল ও কন্টাক্ট
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">WhatsApp নাম্বার (With Code)</label>
                <input className="w-full px-6 py-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none font-bold" value={s.whatsapp} onChange={e => setS({...s, whatsapp: e.target.value})} placeholder="88017..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">Facebook পেজ লিঙ্ক</label>
                <input className="w-full px-6 py-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none font-medium text-sm" value={s.fbLink} onChange={e => setS({...s, fbLink: e.target.value})} placeholder="https://facebook.com/..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">Instagram প্রোফাইল লিঙ্ক</label>
                <input className="w-full px-6 py-4 bg-stone-50 rounded-2xl border border-stone-100 outline-none font-medium text-sm" value={s.igLink} onChange={e => setS({...s, igLink: e.target.value})} placeholder="https://instagram.com/..." />
              </div>
            </div>
          </div>

          {/* Site Appearance */}
          <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-50 pb-4">
              <Layers className="text-stone-400" size={20} /> সাইট থিম কালার
            </h3>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="w-full aspect-video rounded-3xl transition-colors border shadow-inner" style={{ backgroundColor: s.primaryColor }} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">প্রাইমারি কালার (যেমন: লেজ গ্রিন)</label>
                    <input type="color" className="w-full h-14 p-1 bg-stone-50 rounded-2xl outline-none cursor-pointer" value={s.primaryColor} onChange={e => setS({...s, primaryColor: e.target.value})} />
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="w-full aspect-video rounded-3xl transition-colors border shadow-inner" style={{ backgroundColor: s.accentColor }} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1">অ্যাকসেন্ট কালার (যেমন: ম্যাঙ্গো অরেঞ্জ)</label>
                    <input type="color" className="w-full h-14 p-1 bg-stone-50 rounded-2xl outline-none cursor-pointer" value={s.accentColor} onChange={e => setS({...s, accentColor: e.target.value})} />
                  </div>
               </div>
            </div>
          </div>

          {/* Logo Selection */}
          <div className="bg-white p-10 rounded-[3rem] border border-stone-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-50 pb-4">
              <ImageIcon className="text-stone-400" size={20} /> সাইট লোগো
            </h3>
            <div className="space-y-6">
               <div className="w-32 h-32 mx-auto rounded-3xl overflow-hidden border border-stone-100 bg-stone-50 flex items-center justify-center">
                  {s.logo ? <img src={s.logo} className="w-full h-full object-contain" alt="" /> : <ImageIcon className="text-stone-200" size={48} />}
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest px-1 text-center block">গ্যালারি থেকে লোগো সিলেক্ট করুন</label>
                  <ImagePicker currentImage={s.logo} onSelect={url => setS({...s, logo: url})} />
               </div>
            </div>
          </div>
       </div>
    </div>
  );
}

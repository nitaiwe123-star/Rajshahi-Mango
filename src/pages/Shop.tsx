import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice, cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { getProducts, Product } from '../services/productService';

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("সব");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = ["সব", "হিমসাগর", "ল্যাংড়া", "আম্রপালি", "ফজলি"];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "সব" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <div className="min-h-screen bg-organic-bg flex items-center justify-center font-serif italic text-stone-400">নতুন আমের সন্ধানে...</div>;

  return (
    <div className="min-h-screen bg-organic-bg pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
           <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-2">তাজা আমের মেলা</h1>
              <p className="text-stone-500">আপনার প্রিয় আমের জাতটি বেছে নিন এবং অর্ডার করুন।</p>
           </div>
           
           <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="আপনার আম খুঁজুন..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-leaf-green/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
           </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
           {categories.map((cat) => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={cn(
                 "px-8 py-3 rounded-xl font-bold whitespace-nowrap transition-all",
                 activeCategory === cat ? "bg-stone-900 text-white shadow-xl" : "bg-white text-stone-600 hover:bg-stone-100"
               )}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredProducts.map((product, idx) => (
             <motion.div 
               key={product.id}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.1 }}
               className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
             >
                <div className="relative aspect-square overflow-hidden">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                      <Heart size={20} />
                    </button>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                   <div>
                      <div className="flex gap-1 text-mango-orange mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-2">{product.name}</h3>
                      <p className="text-stone-500 text-sm mb-6">{product.desc}</p>
                   </div>
                   
                   <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-stone-400 text-xs line-through">{formatPrice(product.oldPrice)}</span>
                        <span className="text-2xl font-bold text-leaf-green">{formatPrice(product.price)} / KG</span>
                     </div>
                     <button className="bg-stone-900 text-white p-4 rounded-2xl hover:bg-leaf-green transition-colors">
                        <ShoppingCart size={24} />
                     </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}

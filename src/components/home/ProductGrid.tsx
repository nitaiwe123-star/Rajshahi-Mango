import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../lib/utils';
import { getFeaturedProducts, Product } from '../../services/productService';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-organic-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center font-serif italic text-stone-400">
          সেরা আমগুলো আসছে...
        </div>
      </section>
    );
  }
  return (
    <section className="py-24 bg-organic-bg" id="products">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">আমাদের কালেকশন</h2>
            <p className="text-stone-500">
              সবচেয়ে তাজা এবং সুস্বাদু আমের সম্ভার। সরাসরি রাজশাহীর বাগান থেকে আপনার জন্য।
            </p>
          </div>
          <Link to="/shop" className="text-leaf-green font-bold flex items-center gap-2 hover:gap-3 transition-all">
            সব আম দেখুন <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-leaf-green text-white text-xs font-bold px-3 py-1 rounded-full">ফ্রেশ</span>
                  <span className="bg-mango-orange text-white text-xs font-bold px-3 py-1 rounded-full">অফার</span>
                </div>
                <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                  <Heart size={20} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                   <Link to={`/product/${product.id}`} className="w-full bg-white text-stone-900 py-3 rounded-2xl font-bold text-center hover:bg-mango-yellow transition-colors">
                      বিস্তারিত দেখুন
                   </Link>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-1 text-mango-orange mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                  <span className="text-stone-400 text-xs ml-2">({product.reviews} রিভিউ)</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2 truncate">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-stone-500 text-sm mb-6 line-clamp-2">
                  {product.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-stone-400 text-sm line-through">{formatPrice(product.oldPrice)}</span>
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
    </section>
  );
}

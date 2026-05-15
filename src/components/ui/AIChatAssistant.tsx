import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';

import { GoogleGenAI } from '@google/genai';

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: 'আসসালামু আলাইকুম! রাজশাহীর ফ্রেশ আম সম্পর্কে আপনার কি কোনো তথ্য প্রয়োজন? আমি আপনাকে সাহায্য করতে পারি।' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      
      const prompt = `You are a helpful sales assistant for 'Rajshahi Fresh Mango' (রাজশাহীর ফ্রেশ আম). 
      You help customers with their mango purchases, explain different varieties like Himsagar, Langra, Fazli, etc., 
      and answer delivery-related questions. 
      Primary language: Bangla. 
      History: ${JSON.stringify(messages)}
      New user message: ${userMsg}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || 'দুঃখিত, আমি উত্তর খুঁজে পাচ্ছি না।' }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। একটু পরে আবার চেষ্টা করুন।' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-8 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform mb-4"
      >
        <Bot size={32} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-32 right-4 md:right-8 z-50 w-[92vw] md:w-96 h-[500px] bg-white rounded-[2rem] shadow-2xl border border-stone-100 flex flex-col overflow-hidden mb-16"
          >
            {/* Header */}
            <div className="bg-stone-900 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-leaf-green flex items-center justify-center font-bold">A</div>
                 <div>
                    <h4 className="font-bold leading-tight">স্মার্ট ম্যাঙ্গো অ্যাসিস্ট্যান্ট</h4>
                    <p className="text-[10px] text-leaf-green font-bold uppercase tracking-wider">অনলাইন (সক্রিয়)</p>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white"><X size={24} /></button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-organic-bg list-none">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex items-start gap-4",
                  msg.role === 'user' ? "flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.role === 'user' ? "bg-stone-200 text-stone-600" : "bg-leaf-green text-white"
                  )}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' ? "bg-stone-900 text-white rounded-tr-none" : "bg-white text-stone-700 shadow-sm border border-stone-100 rounded-tl-none"
                  )}>
                     <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-stone-400 text-xs font-bold italic translate-x-12">
                   অ্যাসিস্ট্যান্ট লিখছে...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-stone-100 flex gap-2">
              <input 
                className="flex-grow p-4 rounded-2xl bg-organic-bg border-none focus:ring-2 focus:ring-leaf-green/20 text-sm"
                placeholder="প্রশ্ন করুন..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-stone-900 text-white p-4 rounded-2xl hover:bg-leaf-green transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the official chatbot of Wanky Academy – Premium Tools Store.

Your mission:
- Assist customers professionally and clearly
- Present premium digital tools and services
- Show correct prices without variation
- Guide users to place orders via WhatsApp

Language:
- Default: English
- Switch language if the user requests (French, Spanish, Haitian Creole)

Tone:
- Friendly, professional, short, and sales-oriented
- No emojis unless greeting
- No long explanations unless asked

AVAILABLE PRODUCTS:
1. WP Rocket
2. Envato Elements
3. Pack Premium Diseño
4. Divi Theme Pro
5. PixelYourSite
6. Insofta Cover
7. Essential Add-ons
8. Imagify
9. Astra Licence
10. Premium Astra Site
11. Auto Responder WhatsApp
12. Canva Pro
13. Brick Builder
14. Beaver Builder
15. CapCut (9 Months)
16. TikTok Monetization
17. Instagram Followers
18. YouTube Monetization (4K Hours)

PRICING RULES (STRICT):
- All products cost $4.99 USD
- EXCEPT:
  - TikTok Monetization: $100 USD
  - YouTube Monetization (4K Hours): $350 USD
- CapCut is $4.99 for 9 months only

PAYMENT METHODS & LINKS:
If the user asks to pay or buy, provide these EXACT links:

💳 Choose payment method:

Stripe (Card):
• $4.99 tools → https://buy.stripe.com/4gw9Cg5Jd7v93rG3cd
• TikTok Monetization ($100) → https://buy.stripe.com/00g8yc4F99zh7DObIK
• YouTube Monetization ($350) → https://buy.stripe.com/dR67u8gjpbHp9LW146

PayPal:
• $4.99 tools → https://paypal.me/thefunniest2020/4.99
• TikTok Monetization ($100) → https://paypal.me/thefunniest2020/100
• YouTube Monetization ($350) → https://paypal.me/thefunniest2020/350

AFTER PAYMENT INSTRUCTIONS:
Tell the user:
"After payment, please send:
✔ Tool name
✔ Payment screenshot
✔ WhatsApp number
To our WhatsApp: +1 829-620-9249"

CONTACT:
- WhatsApp: +1 829-620-9249
- Email: contact@wankyacademy.com

DELIVERY:
- Instant to 24 hours after payment
- Shared / activation-based access
- No refund after activation

IMPORTANT RULES:
- Never invent tools or services
- Never promise lifetime access
- Never request sensitive data
- If unsure, ask the user to contact WhatsApp support
`;

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fix: Updated Gemini model to gemini-3-flash-preview as per guidelines for basic text tasks
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    } catch (error) {
      console.error("Failed to initialize Gemini client", error);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, manualInput?: string) => {
    e?.preventDefault();
    const textToSend = manualInput || input;
    
    if (!textToSend.trim() || isLoading) return;

    if (!manualInput) setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: textToSend }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
         // Fix: Always use current API key and latest recommended model
         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
         chatSessionRef.current = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: { systemInstruction: SYSTEM_INSTRUCTION }
         });
      }

      const result = await chatSessionRef.current.sendMessage({ message: textToSend });
      const responseText = result.text;
      
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: "I'm having trouble connecting to Wanky Academy servers right now. Please try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-brand-blue hover:bg-blue-700'
        } text-white border-2 border-white/20`}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100%-3rem)] sm:w-[350px] max-w-[350px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right border border-gray-200 ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto h-[500px]' : 'opacity-0 scale-90 pointer-events-none h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-brand-blue p-4 flex items-center gap-3 shadow-md relative z-10">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-brand-gold shrink-0">
            <img src="https://i.postimg.cc/wTr99qNp/d-modern-logo-icon-for-Wanky-Academy-WA-1.png" alt="Bot" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Wanky Assistant</h3>
            <p className="text-blue-100 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
          {messages.length === 0 && (
            <div className="text-center mt-8">
               <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                  <span className="text-2xl">💎</span>
               </div>
               <p className="text-gray-800 font-bold mb-2">Welcome to Wanky Academy Premium Tools.</p>
               <p className="text-gray-500 text-sm px-4">
                 Premium digital tools starting at $4.99.
                 <br/>
                 Reply with a number to continue:
               </p>
               <div className="mt-4 space-y-2 text-sm">
                  <button onClick={() => handleSend(undefined, '1')} className="block w-full bg-white border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition text-left px-4 font-medium text-gray-700">1️⃣ View tools</button>
                  <button onClick={() => handleSend(undefined, '2')} className="block w-full bg-white border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition text-left px-4 font-medium text-gray-700">2️⃣ Prices</button>
                  <button onClick={() => handleSend(undefined, '3')} className="block w-full bg-white border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition text-left px-4 font-medium text-gray-700">3️⃣ Monetization services</button>
                  <button onClick={() => handleSend(undefined, '4')} className="block w-full bg-white border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition text-left px-4 font-medium text-gray-700">4️⃣ How to order</button>
               </div>
            </div>
          )}
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-blue text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                 <div className="whitespace-pre-wrap break-words">{msg.text}</div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <Loader2 className="w-5 h-5 text-brand-blue animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 relative z-10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-brand-blue text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;

'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  sender: 'incoming' | 'outgoing';
};

const KNOWLEDGE_BASE = {
  products: [
    { keywords: ["saree", "silk", "banarasi", "vichitra"], response: "We have a beautiful collection of Sarees including Banarasi Butta, Cotton Silk, and Foil Print Vichitra Silk Sarees. Prices start from ₹499." },
    { keywords: ["mundu", "kaithari"], response: "Our traditional Kaithari Mundu is available for just ₹299." },
    { keywords: ["kids", "uniform", "school"], response: "We offer Girls School Uniforms for various age groups (5-15 years), priced at ₹849." },
    { keywords: ["churidar", "designer"], response: "Check out our Designer Churidar Sets and Custom Churidars, starting at ₹1499." },
    { keywords: ["price", "cost", "how much"], response: "Our products range from budget-friendly items like Mundus (₹299) to premium Silk Sarees (₹4999). What specific item are you interested in?" }
  ],
  policies: [
    { keywords: ["return", "exchange", "back"], response: "We accept returns within 7 days of delivery for unused items with tags. We only replace items if they are defective or damaged." },
    { keywords: ["refund", "money"], response: "Refunds are processed within 5-7 business days after we receive and inspect your return." },
    { keywords: ["delivery", "shipping", "time", "reach", "track"], response: "Standard delivery takes 5-7 days. Express delivery (2-3 days) is available in select locations. Free shipping on orders above ₹2000!" },
    { keywords: ["privacy", "data"], response: "Your privacy is important to us. We only use your data to process orders and improve your shopping experience. We never sell your data." },
    { keywords: ["contact", "phone", "email", "support"], response: "You can reach us at +91 98476 72978 or email info@adavakkad.com. We are located at City Centre Complex, Thrikkadeeri, Kerala." }
  ],
  greetings: [
    { keywords: ["hi", "hello", "hey", "start"], response: "Hello! I'm the Adavakkad Assistant. How can I help you today? Ask me about products, delivery, or returns!" },
    { keywords: ["thank", "thanks", "bye"], response: "You're welcome! Happy shopping at Adavakkad Collections." }
  ],
  fallback: "I'm not sure about that specific detail. However, our team can help! Contact us at +91 98476 72978 for more assistance."
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! 👋\nI'm your AI assistant. How can I help you today?", sender: 'incoming' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatBoxRef = useRef<HTMLUListElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if(chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Expanded Knowledge Base Logic
  const generateResponse = (userMessage: string) => {
    const input = userMessage.toLowerCase();
    
    // Direct matches
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) 
      return "Hello! Welcome to Adavakkad Collections. What are you looking for today?";
    
    if (input.includes('bye') || input.includes('thank'))
      return "You're welcome! Have a great day!";

    if (input.includes('price') || input.includes('cost'))
      return "Our prices start from ₹299 for Mundus and go up to ₹899 for premium Silk Sarees. Do you have a specific item in mind?";

    if (input.includes('saree'))
      return "We have a stunning collection of Banarasi, Kanchipuram, and Cotton Silk sarees starting at just ₹799.";

    if (input.includes('mundu') || input.includes('dhoti'))
      return "Our traditional Kerala Mundu sets are available from ₹299 to ₹699.";

    if (input.includes('kid') || input.includes('child') || input.includes('uniform'))
      return "We have beautiful kids' pavada sets and school uniforms ranging from ₹449 to ₹849.";

    if (input.includes('location') || input.includes('where') || input.includes('address'))
      return "We are located at City Centre Complex, Thrikkadeeri, Kerala. Come visit us!";

    if (input.includes('delivery') || input.includes('shipping'))
      return "We offer Standard Delivery (5-7 days) and Express Delivery (2-3 days). Shipping is free on orders above ₹2000!";

    if (input.includes('return') || input.includes('refund'))
      return "You can return unused items within 7 days. Refunds are processed within 5-7 business days.";

    if (input.includes('contact') || input.includes('phone'))
      return "Call us at +91 98476 72978 or email info@adavakkad.com.";
    
    // Broad catch-alls
    if (input.includes('buy') || input.includes('order') || input.includes('shop'))
      return "To place an order, simply browse our Products page, add items to your cart, and proceed to checkout!";
    
    if (input.includes('help'))
      return "I can help with product details, pricing, delivery, or returns. Just ask me a question!";

    // Default Fallback
    return "I'm not sure about that details, but I learn every day! You can browse our products or contact our support at +91 98476 72978.";
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages(prev => [...prev, { text, sender: 'outgoing' }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages(prev => [...prev, { text: response, sender: 'incoming' }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <>
      <button className="chatbot-toggler" onClick={toggleChat}>
        <span className="material-symbols-outlined" style={{ opacity: isOpen ? 0 : 1 }}>chat_bubble</span>
        <span className="material-symbols-outlined" style={{ opacity: isOpen ? 1 : 0 }}>close</span>
      </button>

      <div className={`chatbot ${isOpen ? 'show-chatbot' : ''}`}>
        <header>
          <h2>Adavakkad Assistant</h2>
          <span className="material-symbols-outlined" onClick={toggleChat} style={{ position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}>close</span>
        </header>
        <ul className="chatbox" ref={chatBoxRef}>
          {messages.map((msg, i) => (
            <li key={i} className={`chat ${msg.sender}`}>
              {msg.sender === 'incoming' && <span className="material-symbols-outlined">smart_toy</span>}
              <p>{msg.text}</p>
            </li>
          ))}
          {isTyping && (
             <li className="chat incoming">
               <span className="material-symbols-outlined">smart_toy</span>
               <p>Thinking...</p>
             </li>
          )}
        </ul>
        <div className="chat-input">
          <textarea 
            placeholder="Type a message..." 
            spellCheck={false} 
            required 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <span 
            id="send-btn" 
            className="material-symbols-outlined" 
            onClick={handleSend}
            style={{ 
              visibility: inputValue.trim() ? 'visible' : 'hidden',
              cursor: 'pointer',
              color: 'var(--color-primary)'
            }}
          >
            send
          </span>
        </div>
      </div>
    </>
  );
}

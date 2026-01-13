'use client';

import { useState, useRef, useEffect } from 'react';

// Types shared with Admin Chat
type AdminMessage = {
  id: string;
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
  read: boolean;
};

type ChatStatus = 'bot' | 'human';

type ChatSession = {
  id: string;
  customerName: string;
  lastMessage: string;
  unreadCount: number;
  lastActive: string;
  status: ChatStatus; // Added status
  messages: AdminMessage[];
};

type LocalMessage = {
  text: string;
  sender: 'incoming' | 'outgoing';
};

// ... (KNOWLEDGE_BASE remains same)
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
  const [messages, setMessages] = useState<LocalMessage[]>([
    { text: "Hi there! 👋\nI'm your AI assistant. How can I help you today?", sender: 'incoming' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [sessionStatus, setSessionStatus] = useState<ChatStatus>('bot');
  
  const chatBoxRef = useRef<HTMLUListElement>(null);

  // Initialize Session
  useEffect(() => {
    let storedSession = localStorage.getItem('chat_session_id');
    if (!storedSession) {
      storedSession = 'guest_' + Date.now();
      localStorage.setItem('chat_session_id', storedSession);
    }
    setSessionId(storedSession);

    // Initial Load of previous messages if any
    const allChats: ChatSession[] = JSON.parse(localStorage.getItem('advakkad_chats') || '[]');
    const myChat = allChats.find(c => c.id === storedSession);
    
    if (myChat) {
      setSessionStatus(myChat.status || 'bot'); // Load status
      // Convert Admin format to Local format
      const converted: LocalMessage[] = myChat.messages.map(m => ({
        text: m.text,
        sender: m.sender === 'admin' ? 'incoming' : 'outgoing'
      }));
      if (converted.length > 0) setMessages(converted);
    } else {
      // Create new session in DB
      const newChat: ChatSession = {
        id: storedSession,
        customerName: 'Guest User ' + storedSession.slice(-4),
        lastMessage: 'Started conversation',
        unreadCount: 0,
        lastActive: 'Just now',
        status: 'bot', // Init status
        messages: []
      };
      localStorage.setItem('advakkad_chats', JSON.stringify([...allChats, newChat]));
      setSessionStatus('bot');
    }
  }, []);

  // Sync Listener (Admin replies)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'advakkad_chats' && e.newValue && sessionId) {
        const allChats: ChatSession[] = JSON.parse(e.newValue);
        const myChat = allChats.find(c => c.id === sessionId);
        if (myChat) {
           const converted: LocalMessage[] = myChat.messages.map(m => ({
            text: m.text,
            sender: m.sender === 'admin' ? 'incoming' : 'outgoing'
          }));
          setMessages(converted);
          setSessionStatus(myChat.status || 'bot'); // Update status from admin
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [sessionId]);

  // Auto-scroll
  useEffect(() => {
    if(chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Helper to sync to localStorage
  const syncToStorage = (text: string, sender: 'user' | 'admin', newStatus?: ChatStatus) => {
    if (!sessionId) return;
    
    const allChats: ChatSession[] = JSON.parse(localStorage.getItem('advakkad_chats') || '[]');
    const chatIndex = allChats.findIndex(c => c.id === sessionId);
    
    const newMessage: AdminMessage = {
      id: Date.now().toString(),
      sender: sender,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: sender === 'admin' // User messages are unread for admin
    };

    if (chatIndex >= 0) {
      allChats[chatIndex].messages.push(newMessage);
      allChats[chatIndex].lastMessage = text;
      allChats[chatIndex].lastActive = 'Just now';
      if (newStatus) allChats[chatIndex].status = newStatus; // Update status
      if (sender === 'user') allChats[chatIndex].unreadCount += 1;
      
      localStorage.setItem('advakkad_chats', JSON.stringify(allChats));
      
      // Force storage event for same-tab sync (if admin is open in iframe or parallel component)
      window.dispatchEvent(new StorageEvent('storage', { key: 'advakkad_chats', newValue: JSON.stringify(allChats) }));
    }
  };

  // Bot Logic
  const generateResponse = (userMessage: string): { text: string; action: 'reply' | 'handoff' } => {
    const input = userMessage.toLowerCase();

    // 1. Check for Handoff Keywords
    if (['agent', 'human', 'person', 'support', 'talk to someone'].some(k => input.includes(k))) {
      return { 
        text: "I'm connecting you to a human agent. They will review your chat and reply shortly!", 
        action: 'handoff' 
      };
    }

    // 2. Knowledge Base Search
    for (const group of Object.values(KNOWLEDGE_BASE)) {
      if (typeof group === 'string') continue;
      if (Array.isArray(group)) {
        for (const item of group) {
           if (item.keywords.some(k => input.includes(k))) return { text: item.response, action: 'reply' };
        }
      }
    }
    
    // 3. Fallback
    return { text: KNOWLEDGE_BASE.fallback, action: 'reply' };
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    // 1. Update UI & Sync User Message
    setMessages(prev => [...prev, { text, sender: 'outgoing' }]);
    setInputValue("");
    
    // If we are already in 'human' mode, simply send the message and DO NOT trigger bot response
    if (sessionStatus === 'human') {
        syncToStorage(text, 'user');
        return;
    }

    syncToStorage(text, 'user');

    // 2. Generate Bot Response
    const response = generateResponse(text);
    
    if (response) {
      if (response.action === 'handoff') {
          setSessionStatus('human');
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, { text: response.text, sender: 'incoming' }]);
            syncToStorage(response.text, 'admin', 'human'); // Sync with new status
            setIsTyping(false);
          }, 800);
      } else {
          // Normal Bot Reply
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, { text: response.text, sender: 'incoming' }]);
            syncToStorage(response.text, 'admin'); 
            setIsTyping(false);
          }, 600);
      }
    }
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

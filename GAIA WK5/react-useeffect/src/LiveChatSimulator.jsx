import { useState, useEffect, useRef } from 'react';

export default function LiveChatSimulator() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'System', text: 'Welcome to the Live Chat Simulator!', time: new Date().toLocaleTimeString() }
  ]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const mockReplies = [
    { sender: 'Alice', text: 'Hey there! How is it going?' },
    { sender: 'Bob', text: 'Did you see the new update?' },
    { sender: 'Charlie', text: 'I am currently working on a React project.' },
    { sender: 'Alice', text: 'That sounds awesome!' },
    { sender: 'Bob', text: 'Let me know if you need any help troubleshooting.' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      setIsTyping(true);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
        
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: randomReply.sender,
            text: randomReply.text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1500);

    }, 5000);

    return () => {
      clearInterval(interval);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [isOnline]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !isOnline) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputValue('');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <div style={{ background: '#1e293b', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Live Chat Simulator</h3>
        <span style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isOnline ? '🟢 Connected' : '🔴 Disconnected'}
        </span>
      </div>

      <div style={{ height: '400px', overflowY: 'auto', padding: '15px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg) => {
          const isMe = msg.sender === 'You';
          const isSystem = msg.sender === 'System';

          return (
            <div 
              key={msg.id} 
              style={{ 
                alignSelf: isSystem ? 'center' : isMe ? 'flex-end' : 'flex-start',
                background: isSystem ? '#e2e8f0' : isMe ? '#0070f3' : '#fff',
                color: isSystem ? '#475569' : isMe ? '#fff' : '#1e293b',
                padding: '10px 14px',
                borderRadius: isSystem ? '20px' : isMe ? '12px 12px 0 12px' : '12px 12px 12px 0',
                maxWidth: '75%',
                border: isSystem ? 'none' : '1px solid #e2e8f0',
                fontSize: isSystem ? '13px' : '15px'
              }}
            >
              {!isSystem && <strong style={{ display: 'block', fontSize: '12px', marginBottom: '4px', opacity: 0.8 }}>{msg.sender}</strong>}
              <span style={{ wordBreak: 'break-word' }}>{msg.text}</span>
              {!isSystem && <small style={{ display: 'block', fontSize: '10px', textAlign: 'right', marginTop: '4px', opacity: 0.7 }}>{msg.time}</small>}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ alignSelf: 'flex-start', background: '#e2e8f0', color: '#475569', padding: '8px 14px', borderRadius: '12px 12px 12px 0', fontSize: '14px', fontStyle: 'italic' }}>
            Someone is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', borderTop: '1px solid #e2e8f0' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!isOnline}
          placeholder={isOnline ? "Type a message..." : "You are offline. Reconnect to chat."}
          style={{ flexGrow: 1, padding: '15px', border: 'none', outline: 'none', fontSize: '15px' }}
        />
        <button 
          type="submit" 
          disabled={!isOnline}
          style={{ padding: '0 25px', background: '#0070f3', color: 'white', border: 'none', cursor: isOnline ? 'pointer' : 'not-allowed', fontSize: '15px', fontWeight: 'bold' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
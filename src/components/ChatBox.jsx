import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatBox.css";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Generate a random username when component mounts
    generateRandomUsername();
    
    // Connect to socket server
    socketRef.current = io("http://localhost:3001", {
      transports: ["websocket"]
    });

    // Listen for incoming messages
    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateRandomUsername = () => {
    const adjectives = ["Happy", "Sleepy", "Calm", "Peaceful", "Dreamy", "Chill", "Mellow", "Cozy", "Relaxed", "Gentle"];
    const nouns = ["Cat", "Bear", "Fox", "Panda", "Wolf", "Tiger", "Koala", "Owl", "Rabbit", "Penguin"];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 100);
    
    setUsername(`${randomAdjective}${randomNoun}${randomNumber}`);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() !== "") {
      const messageData = {
        text: messageText,
        username: username,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      socketRef.current.emit("message", messageData);
      setMessageText("");
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-container">
      {!isOpen ? (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          <FaComments /> Chat
        </button>
      ) : (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Lofi Chat</h3>
            <span className="username">You: {username}</span>
            <button className="close-btn" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.username === username ? "my-message" : "other-message"}`}
              >
                <div className="message-header">
                  <span className="message-username">{msg.username}</span>
                  <span className="message-time">{msg.time}</span>
                </div>
                <p>{msg.text}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="message-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

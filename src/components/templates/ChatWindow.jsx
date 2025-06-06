import { useState, useEffect, useRef } from "react";
import { getChatMessages, sendMessage } from "../../api/chatService";
import "../../styles/ChatList.css";

function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    getChatMessages(selectedUser.chatId)
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedUser) return;
    const messageToSend = newMessage;
    setNewMessage("");
    console.log(messageToSend)
    
    try {
      const sentMessage = await sendMessage({ chatId: selectedUser.chatId, message: messageToSend });
      setMessages(prev => [...prev, sentMessage]);

    } catch (error) {
      // обробка помилки
    }
  };


  return (
    <main className="chat-main">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div className="message" key={msg.messageId || index}>
            <span className="sender">{msg.senderName}:</span> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Send a message"
          onKeyDown={e => e.key === "Enter" && handleSendMessage()}
        />
        <button className="btn" onClick={handleSendMessage}>
          <img src={`${process.env.PUBLIC_URL}/photo-chat/btnn.png`} alt="send" />
        </button>
      </div>
    </main>
  );
}

export default ChatWindow;
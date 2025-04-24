import { useState } from "react";


const allMessages = {
  Ihor: [
    { sender: "Ihor", icon: "🧑‍💼", text: "Hello this is your advertisement?" },
    { sender: "user1", icon: "🌷", text: "Yeah it's mine" },
    { sender: "Ihor", icon: "🧑‍💼", text: "could you sell it a little cheaper, 150hrn less?" },
    { sender: "user1", icon: "🌷", text: "Yes i think it's a good idea" },
  ],
  Roman: [{ sender: "Roman", icon: "🌐", text: "Hi, is the product still available?" }],
  Petro: [{ sender: "Petro", icon: "😇", text: "Hey, I want to buy it tomorrow!" }],
  user1: [{ sender: "user1", icon: "🌷", text: "Ok!" }],
};

function ChatWindow({ selectedUser }) {
  const [messages, setMessages] = useState(allMessages[selectedUser] || []);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        sender: "user1",
        icon: "🌷",
        text: newMessage,
      };
      setMessages([...messages, newMsg]);
      setNewMessage(""); 
    }
  };

  return (
    <main className="chat-main">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            <span className="sender">{msg.icon} {msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Send a message"
        />
        <button className="btn" onClick={handleSendMessage}>
    <img src={`${process.env.PUBLIC_URL}/photo-chat/btnn.png`} alt="send" />
  </button>
      </div>
    </main>
  );
}

export default ChatWindow;

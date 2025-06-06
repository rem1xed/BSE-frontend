import { useEffect, useState } from "react";
import { getUserChats } from "../../api/chatService"
import "../../styles/ChatList.css";

function ChatList({ selectedUser, setSelectedUser }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getUserChats()
      .then(setChats)
      .catch(() => setChats([]));
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <p className="msg-p">Messages</p>
        <button className="buy-sell-btn">Buy / <span>sell</span></button>
      </div>
      <ul className="chat-list">
        {chats.map(chat => (
          <li
            key={chat.chatId}
            className={chat.otherUserId === selectedUser?.otherUserId ? "active" : ""}
            onClick={() => setSelectedUser(chat)}
            tabIndex={0}
            aria-label={`Open chat with ${chat.otherUserName}`}
          >
            <span className="status-dot" />
            {chat.otherUserName}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ChatList;
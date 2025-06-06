import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { getUserChats } from "../../api/chatService";

export default function ChatPage() {
  const { userId } = useParams();
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUserChats()
      .then((chats) => {
        setChats(chats);
        if (userId) {
          const matchedChat = chats.find(c => String(c.otherUserId) === String(userId));
          if (matchedChat) {
            setSelectedUser(matchedChat);
          }
        }
      })
      .catch(() => setChats([]));
  }, [userId]);

  return (
    <div className="chat-container">
      <ChatList chats={chats} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}

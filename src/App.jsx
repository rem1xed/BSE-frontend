import { useState } from "react";
import ChatList from "./components/ChatList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import "./App.css";

function App() {
  const [selectedUser, setSelectedUser] = useState("Ihor");

  return (
    <div className="chat-container">
      <ChatList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}

export default App;

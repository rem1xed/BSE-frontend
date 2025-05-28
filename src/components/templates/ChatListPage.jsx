import "../../styles/ChatList.css"

const users = [
  { name: "user1", icon: "🌷" },
  { name: "Roman", icon: "🌐" },
  { name: "Petro", icon: "😇" },
  { name: "Ihor", icon: "🧑‍💼" },
];

function ChatList({ selectedUser, setSelectedUser }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
              <p className="msg-p">Message</p>
        <button className="buy-sell-btn">Buy / <span>sell</span></button>
      </div>
      <ul className="chat-list">
        {users.map((user) => (
          <li
            key={user.name}
            className={user.name === selectedUser ? "active" : ""}
            onClick={() => setSelectedUser(user.name)}
          >
            <span className="status-dot" />
            {user.icon} {user.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ChatList;
import React, { useState } from "react";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper: get token from localStorage
  const getToken = () => localStorage.getItem("token");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("❌ Error:", err);
    }

    setLoading(false);
    setInput("");
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://cb-backend-3xii.onrender.com/api/chat/history", {
        headers: {
          "Authorization": `Bearer ${getToken()}`
        }
      });
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    }
  };

  return (
    <div style={{
      width: "500px",
      margin: "40px auto",
      fontFamily: "Arial, sans-serif",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      overflow: "hidden"
    }}>
      <div style={{ background: "#4a90e2", color: "#fff", padding: "15px" }}>
        <h2 style={{ margin: 0 }}>🤖 Cohere Chatbot</h2>
      </div>

      {/* Chat Window */}
      <div style={{
        padding: "15px",
        height: "300px",
        overflowY: "auto",
        background: "#f7f9fc"
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: "10px"
            }}
          >
            <span style={{
              display: "inline-block",
              padding: "10px 15px",
              borderRadius: "20px",
              background: msg.role === "user" ? "#4a90e2" : "#e0e0e0",
              color: msg.role === "user" ? "#fff" : "#333",
              maxWidth: "70%",
              wordWrap: "break-word"
            }}>
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: "gray" }}>Bot is typing…</p>}
      </div>

      {/* Input Bar */}
      <div style={{
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ddd",
        background: "#fff"
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            background: "#4a90e2",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>

      {/* History Section */}
      <div style={{ padding: "15px", background: "#fafafa", borderTop: "1px solid #ddd" }}>
        <button
          onClick={fetchHistory}
          style={{
            padding: "8px 15px",
            borderRadius: "20px",
            border: "none",
            background: "#4a90e2",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "10px"
          }}
        >
          📜 View History
        </button>
        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
          {history.length === 0 ? (
            <p style={{ color: "#999" }}>No history yet.</p>
          ) : (
            history.map((chat, i) => (
              <div key={i} style={{ marginBottom: "10px", textAlign: "left" }}>
                <p style={{ margin: 0 }}>
                  <strong>You:</strong> {chat.userMessage}
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Bot:</strong> {chat.botReply}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

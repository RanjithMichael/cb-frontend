import React, { useState } from "react";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const res = await fetch("http://localhost:5000/api/chat/history");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    }
  };

  return (
    <div style={{ width: "500px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>🤖 Cohere Chatbot</h2>

      {/* Live Chat Window */}
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "250px", overflowY: "auto", background: "#f9f9f9" }}>
        {messages.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.role === "user" ? "right" : "left", color: msg.role === "user" ? "blue" : "green" }}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </p>
        ))}
        {loading && <p style={{ textAlign: "left", color: "gray" }}>Bot is typing…</p>}
      </div>

      {/* Input + Send */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "5px" }}
        />
        <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
          Send
        </button>
      </div>

      {/* History Section */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={fetchHistory} style={{ padding: "5px 10px", marginBottom: "10px" }}>
          📜 View History
        </button>
        <div style={{ border: "1px solid #ccc", padding: "10px", maxHeight: "200px", overflowY: "auto", background: "#fff" }}>
          {history.length === 0 ? (
            <p>No history yet.</p>
          ) : (
            history.map((chat, i) => (
              <p key={i}>
                <strong>You:</strong> {chat.userMessage} <br />
                <strong>Bot:</strong> {chat.botReply}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

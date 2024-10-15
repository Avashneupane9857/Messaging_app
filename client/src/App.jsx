import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  function joinRoom() {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  }
  return (
    <div className="App ">
      
      <div className="joinChatContainer">
        <h1>Join a chat</h1>
        <input
          type="text"
          placeholder="Your name..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room Id"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>Join a room</button>
      </div>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;

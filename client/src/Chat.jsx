import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types, no-unused-vars
function Chat({ socket, username, room }) {
  console.log(socket);
  console.log(username);
  console.log(room);
  const [currentMsg, setCurrentMsg] = useState("");
  async function sendMsg() {
    if (currentMsg !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getHours(),
      };
      await socket.emit("sendmsg", messageData);
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer ">
        <input
          type="text"
          placeholder="heyy this is message"
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

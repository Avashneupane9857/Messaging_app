/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// eslint-disable-next-line react/prop-types, no-unused-vars
function Chat({ socket, username, room }) {
  console.log(socket);
  console.log(username);
  console.log(room);
  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([]);
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
      setMessageList((list) => [...list, messageData]);
      setCurrentMsg("");
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time ">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer ">
        <input
          value={currentMsg}
          type="text"
          onKeyDownCapture={(event) => {
            event.key === "Enter" && sendMsg();
          }}
          placeholder="Write your message here"
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button onClick={sendMsg}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

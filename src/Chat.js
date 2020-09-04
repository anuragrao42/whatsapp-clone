import React, { useState, useEffect } from "react";
import "./Chat.css";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateProviderValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setroomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateProviderValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setroomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {" "}
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <div
            className={`chat__message ${
              user.displayName === message.name && `chat__receiver`
            }`}
          >
            <p>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="Type a Message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;

import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const [clik, setClik] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setText(`latitude ${latitude}, longitude ${longitude}`);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="input">
      <textarea 
        className="textarea"
        type="text"
        placeholder="Xabarni kiriting..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
      ></textarea>
      <div className="send">
        <div onClick={getUserLocation}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 20 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0036 14.0035C12.4889 14.0035 14.5036 11.9887 14.5036 9.50347C14.5036 7.01819 12.4889 5.00347 10.0036 5.00347C7.51831 5.00347 5.50359 7.01819 5.50359 9.50347C5.50359 11.9887 7.51831 14.0035 10.0036 14.0035ZM10.0036 12.0071C8.6209 12.0071 7.5 10.8862 7.5 9.50347C7.5 8.12077 8.6209 6.99988 10.0036 6.99988C11.3863 6.99988 12.5072 8.12077 12.5072 9.50347C12.5072 10.8862 11.3863 12.0071 10.0036 12.0071Z" fill="#0F0F0F" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.272 11.5818C20.5649 5.78816 16.0052 0.00354004 9.99999 0.00354004C3.99649 0.00354004 -0.563608 5.7961 0.728159 11.5825C1.72523 16.2821 5.7572 20.8465 8.16359 23.2269C9.19419 24.2463 10.8058 24.2463 11.8364 23.2269C14.2429 20.8464 18.2752 16.2816 19.272 11.5818ZM9.99999 2.00354C14.7124 2.00354 18.3368 6.58981 17.32 11.1462C16.8316 13.3355 15.7359 15.3015 14.4501 17.119C13.1064 19.0184 11.5829 20.6644 10.4299 21.805C10.1786 22.0536 9.82144 22.0536 9.57009 21.805C8.41713 20.6645 6.89379 19.0186 5.55009 17.1193C4.26419 15.3017 3.16886 13.3361 2.68011 11.1467C1.66438 6.59682 5.29012 2.00354 9.99999 2.00354Z" fill="#0F0F0F" />
          </svg>
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          onClick={() => setClik(true)}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Attach} alt="" />
        </label>
        <button onClick={handleSend}>Yuborish</button>
      </div>
    </div>
  );
};

export default Input;

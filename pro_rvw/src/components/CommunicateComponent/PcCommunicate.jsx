import React, {  useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Welcome from "./Welcome";
import { io } from "socket.io-client";
import Contacts from "./Contacts";
import ChatContainer from "./ChatContainer";
import { useNavigate } from "react-router";
import {getAdmins, host } from "../../routes/APIRoutes";
import axios from "axios";

export default function Chat() {  
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined); 
  const [currentUser, setCurrentUser] = useState(undefined);

  
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('current-user'))
    console.log(item,"item");
    if(item){
      setCurrentUser(item);
    }else{
      navigate("/");
    }
  }, []);

  
  useEffect(() => {

    async function fetchContacts() {
      if (currentUser) {
        const data = await axios.get(getAdmins,{params:{id:currentUser._id}});
        console.log(data.data,"data.data");
        setContacts(data.data.users);
        if(currentUser.type !== "Staff"){
        setContacts((prev) => [...prev, ...data.data.staffs]);
        }
        if(currentUser.type !== "Student"){
        setContacts((prev) => [...prev, ...data.data.students]);
        }
      }
    }
    fetchContacts();
  }, [currentUser]);


  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

    
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return (
    <>
      <Container>
        <div className="container">
          <Contacts  contacts={contacts} changeChat={handleChatChange}  />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
  }
`;


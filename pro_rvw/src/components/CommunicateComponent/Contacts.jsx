import React, { useEffect,useState } from "react";
import styled from "styled-components";
import Logo from "../../assests/userpro.png";

export default function Contacts(props) {  
  const [currentUserName, setCurrentUserName] = useState(undefined);  
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.name);
    }
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    console.log(contact, "contact");
    setCurrentSelected(index);
    props.changeChat(contact);
  };

  

  return (
    <>
        <Container>          
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h5>CHAT</h5>
          </div>
          <div className="contacts">
          {props.contacts.map((contact, index) => {
              return (
                
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={Logo} 
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h6>{contact.name}</h6>
                  </div>
                </div>

              )
            })
            }
          </div>          
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h5>{currentUserName}</h5>                        
          </div>
        </Container>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h5 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    background-color: #0d0d30;  
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h5 {
          color: white;
        },
        h6 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

`;

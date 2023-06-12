import React, {useEffect, useState} from 'react'
import axios from 'axios';
import styled from 'styled-components'
import { useNavigate } from 'react-router';
import { getAdmins, sendRequestRoute, studentGetAll } from '../../../routes/APIRoutes';

function Process1() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [guide, setGuide] = useState(undefined);

  const handleFileChange = (e) => {
    const doc = e.target.files[0];
    setFile(doc);
  };
 

  
  useEffect(() => {
    console.log("useEffect",file);
    const item = JSON.parse(localStorage.getItem('current-user'))
    console.log(item,"item");
    if(item && item.type === "Student"){
      setCurrentUser(item);
    }else{
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function getStudent() {
      if (!currentUser) return;
      const data = await axios.get(studentGetAll,{params:{id:currentUser._id}});
      console.log(data.data,"data.data student");
      setGuide(data.data.students.guide);
    }
    getStudent();
  }, [currentUser]);


  
  useEffect(() => {

    async function fetchContacts() {
      if (currentUser) {
        const data = await axios.get(getAdmins,{params:{id:currentUser._id}});
        console.log(data.data,"data.data.staffs");
        setContacts(data.data.staffs);
      }
    }
    fetchContacts();
  }, [currentUser]);

  const handleChange = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handlecli = () => {
    if(!file){
      alert("Please SELECT File");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setMessage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleClick = (receiver) => {
    if(!file){
      alert("Please Upload File");
      return;
    }

    const sender = currentUser._id;
    console.log("handleClick",message);
    const res = axios.post(sendRequestRoute, {sender, receiver, message, title});
    console.log(res);
  };

  

  
    return (

      <div>
        <div className="container" style={{backgroundColor:"#ffffff", padding: "50px"}}>        
        <h1 className="mr-3 ml-3 mt-3">Staff List And Availabilities {guide}</h1>
        <div>
          {file && (
            <button onClick={handlecli}>Download </button>
          )}
        </div>
        <div className="container mb-5 mt-5 text-left">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>StaffName</th>
                <th>Position</th>
                <th>Availabilities</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {contacts.map((result) => {
              return (
                <tr key={result.regno} >  
                <td>{result.regno}</td>
                <td>{result.name}</td>
                <td>{result.position}</td>
                <td>2</td>
                <td><input onChange={handleChange}/></td>
                <td>
                  <input type="file" id="myFile" name="filename" onChange={handleFileChange}/>
                  
                  <ButtonsContainer>
                    <ButtonStyle onClick={handlecli} disabled={!guide}>
                      Upload 
                    </ButtonStyle>
                    <ButtonStyle onClick={() => handleClick(result._id)} disabled={!guide}>
                      Request
                    </ButtonStyle>      
                  </ButtonsContainer>
                </td>
              </tr>
          
          )
        })}       
          
        </tbody>
        </table>
        </div>
        </div>
      </div>
    )
  }
export default Process1


//style button disabled


const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding : 1rem;
`

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #4a154b;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #f3e7f3;
    color: #000000;
    cursor: not-allowed;
  }
`
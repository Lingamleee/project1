import React, {useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { acceptRequestRoute, recieveRequestRoute, staffGetAvail} from '../../../routes/APIRoutes';


function Process1() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);

  
    useEffect(() => {
      const item = JSON.parse(localStorage.getItem('current-user'))
      if(item && item.type === "Staff"){
        setCurrentUser(item);
      }else{
        navigate("/");
      }
    }, []);

    useEffect(() => {
      async function fetchAvailabilities() {
        if (currentUser) {
          const data =await axios.get(staffGetAvail,{params:{id:currentUser._id}});
          console.log(data.data,"data avail");
          setAvailabilities(data.data.avail);
        }
      }
      fetchAvailabilities();
    }, [currentUser]);

    useEffect(() => {
      async function fetchContacts() {
        if (currentUser) {
          const data =await axios.get(recieveRequestRoute,{params:{id:currentUser._id}});
          console.log(data.data.data,"data");
          setContacts(data.data.data);
        }
      }
      fetchContacts();
    }, [currentUser]);

    const handleClick = async (student) => {
      if(availabilities === 0){
        alert("No Availabilities");
        return;
      }
      const staff = currentUser._id;
      const res = await axios.post(acceptRequestRoute, {staff, student});  
      console.log(res);    
      if(res.status === 200){
        alert("Request Accepted");
        setAvailabilities(availabilities-1);
        const newContacts = contacts.filter((item) => item._id !== student);
        setContacts(newContacts);
      }

    }

    
    return (
      <div>
        <div className="container" style={{backgroundColor:"#ffffff", padding: "50px"}}>        
        <h1 className="mr-3 ml-3 mt-3">Availabilities {availabilities}</h1>
        <div>
        </div>
        <div className="container mb-5 mt-5 text-left">
          <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Project Title</th>
                  <th>Documents</th>
                </tr>
              </thead>
              <tbody>     
                {
                  contacts.map((item) => {
                    return(
                      <tr key={item._id}>
                        <td>{item.regno}</td>
                        <td>{item.name}</td>
                        <td>M.C.A</td>
                        <td>{item.title}</td>
                        <td>
                          <a href={item.message} className="bg-primary mb-3 mr-5" rel="noopener noreferrer" style={styles.a}>View</a>
                          {item.guide === null ?
                          <button className="bg-info mb-3 mr-5" style={styles.a} onClick={() =>handleClick(item._id)}>Accept</button> 
                          : <>Allocated  <button className="bg-info mb-3 mr-5" style={styles.a}>Drop</button></>}
                        </td>
                      </tr>
                    )
                  })
                }        
              </tbody>
            </table>         
        </div>
        </div>
      </div>
    )
  }
export default Process1


const styles = {
  a:{
//button style
    padding: "5px",
    fontWeight: "bold",
    fontSize: "18",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    border: "black",
    cursor: "pointer",
  },
}
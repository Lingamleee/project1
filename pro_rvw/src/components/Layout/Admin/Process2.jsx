import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {allStudents} from '../../../routes/APIRoutes';


export default function Process2() {

  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('current-user'))
    if(item){
      setCurrentUser(item);
    }else{
    }
  }, []); 

  useEffect(() => {
    if(currentUser){
      async function getStudentRoute (){
        const data = await axios.get(allStudents);
        console.log(data.data,"data.data");
        setStudents(data.data.students);
      }
      getStudentRoute();
    }
  }, [currentUser]);
    
  return (
    <div>
      {console.log(students)}
      <div className="container" style={ {background:"ffffff", padding:"50px"}} > 
        <div className="row">
          <div className="col-md-12">
            <h3>My Students</h3>
            <table className="table table-striped" style={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Reg No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mark</th>
                  <th scope="col">Remarks</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((item) => {
                  return(
                    <tr key={item._id}>
                      <td>{item.regno}</td>
                      <td>{item.name}</td>
                      <td 
                        style={{width:"150px"}}
                      >
                        <input type="number" className="form-control" placeholder="Mark" />
                      </td>
                      <td>
                        <textarea className="form-control" placeholder="Remarks" />
                      </td>
                      <td>
                        <button className="btn btn-primary">Send</button>
                      </td>
                    </tr>
                  )
                })} 
              </tbody>
            </table>
            
           </div>  
        </div>
      </div>
    </div>
  )
}

//table responsive

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    overflowX: "auto",
    overflowY: "auto",
  },
  th: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px"
  },
  td: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px"
  },
  tr: {
    border: "1px solid #dddddd",

  }
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {studentGetAll } from '../../../routes/APIRoutes';


export default function Process5() {

  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('current-user'))
    if(item && item.type === "Staff"){
      setCurrentUser(item);
    }else{
    }
  }, []); 

  useEffect(() => {
    if(currentUser){
      const sts = currentUser.student;
      if(sts)  {
        console.log(sts);
        sts.map((item) => {
          console.log(item);
          async function getStudentRoute (id){
            const user = await axios.get(studentGetAll, {params: {id}})
            console.log(user.data.students);
            let student = user.data.students;
            // const res = await axios.get(getPptRoute, {
            //   responseType: 'blob',
            //   params: {
            //     student: student.regno
            //   }
            // });
            // console.log(res.data);
            // if(res.data.size > 0){
            //   student.ppt = res.data;
            //   setStudents(prev => [...prev, student]);
            // }
            setStudents(prev => [...prev, student]);
          } 
          getStudentRoute(item);
          return null;
          
        })
      }

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

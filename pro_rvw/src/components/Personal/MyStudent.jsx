import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getPptRoute, studentGetAll } from '../../routes/APIRoutes';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function MyStudent() {

  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [value, setValue] = useState(dayjs('2022-04-17T15:30'));

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
                  <th scope="col">Date</th>
                  <th scope="col">Message</th>
                  <th scope="col">Action</th>
                  <th scope="col">Request</th>
                </tr>
              </thead>
              <tbody>
                {students.map((item) => {
                  return(
                    <tr key={item._id}>
                      <td scope="row">{item.regno}</td>
                      <td>{item.name}</td>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              label="Controlled picker"
                            />
                        </LocalizationProvider>
                      </td>
                      <td>
                        <input type="text" className="form-control" placeholder="Message" />
                      </td>
                      <td>
                        <button className="btn btn-primary">Send</button>
                      </td>
                      <td>
                        <button className="btn btn-primary">View</button>
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

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { staffGetAvail, studentGetAll } from '../../routes/APIRoutes';
import dayjs from 'dayjs';


export default function MyGuide() {
  const [staff, setStaff] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [value, setValue] = useState(dayjs('2022-04-17T15:30'));

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('current-user'))
    if(item){
      setCurrentUser(item);
    }else{
    }
  }, []); 

  useEffect(() => {
    console.log(currentUser, "current user");
    if(currentUser){
      const sts = currentUser.guide;

      if(sts){
        axios.get(staffGetAvail,
          {params:{id:currentUser.guide}}
        ).then((res) => {
          console.log(res, "response");
          setStaff(res.data.data);
        }).catch((err) => {
          console.log(err);
        })
      }
    }
  }, [currentUser]);

    
  return (
    <div>
      <div className="container" style={ {background:"ffffff", padding:"50px"}} > 
        <div className="row">
          <div className="col-md-12">
            <h3>My Guide</h3>
            <table className="table table-striped" style={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Reg No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Message</th>
                  <th scope="col">Action</th>
                  <th scope="col">Request</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{staff.regno}</td>
                  <td>{staff.name}</td>
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

import React, { useEffect, useState } from 'react'
import { getAllTimeSlotRoute, setFreeRoute, setTimeSlotRoute, studentGetAll } from '../../../routes/APIRoutes';
import axios from 'axios';

function TimeSlot() {
    const [timeslot, setTimeslot] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(undefined);
    const [flag, setFlag] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState("student");
    const [name, setName] = useState("name");
    const [time , setTime] = useState("time");

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('current-user'))
        if(item){
            setCurrentUser(item);
            if(item.type === "Staff"){
                staffDetails(item);
            }
        }else{
        }
    }, []);

    function staffDetails(it) {
        if(it){
            const sts = it.student;
            if(sts)  {
              sts.map((item) => {
                async function getStudentRoute (id){
                  const user = await axios.get(studentGetAll, {params: {id}})
                  let student = user.data.students;
                  setStudents(prev => [...prev, student]);
                } 
                getStudentRoute(item);
                return null;
              })
            }
      
          }
    }


    useEffect(() => {
        function getTimeslot() {
            axios.get(getAllTimeSlotRoute)
                .then(res => {
                    setTimeslot(res.data.data[0].timeSlot);
                    setDate(res.data.data[0].date);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getTimeslot();
    } , [])

    const handleClick = (time) => {
        setFlag(true);    
        setTime(time);
    }

    const handleChange = (event) => {
        const { value} = event.target;
        students.map((student) => {
            if(student._id === value){
                setSelectedStudent(student.regno);
                setName(student);
            }
            return null;
        }
        )
    }

    const handleClick1 = async () => {  
        await axios.post(setTimeSlotRoute,{
            date: date,
            time: time,
            student: name._id,
            staff: currentUser._id,
            staffName: currentUser.name,
            studentName: name.name,
        }).then(res => {
        }
        ).catch(err => {
            console.log(err);
        }
        )
      window.location.reload();
    }

    const handleClick2 = async (time) => {
      await axios.post(setFreeRoute,{
          date: date,
          time: time,
      }).then(res => {
          console.log(res);
      }).catch(err => {
          console.log(err);
      })
      window.location.reload();
    }

  return (
    <>
           <div className="container" style={ {background:"ffffff", padding:"50px"}} > 
             <div className="row">
               <div className="col-md-12">
          <h1>Time Slot Page</h1>
          {date ? 
           <>
              <h3>Date: {date}</h3> 
              {flag ?<>           
              <p>select student  {name.name} {name.regno}</p>

                <select name={selectedStudent} onChange={handleChange}>
                    <option value="">Select Student</option>
                    {students.map((student, index) => (
                        <option key={index} value={student._id}>{student.name}</option>
                    ))}
                </select>
                <button onClick={handleClick1}>Submit</button>

           </> 
           : null}
                 <table className="table table-striped" style={styles.table}>
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Staff</th>
                <th>Student</th>
                {currentUser.type === "Staff" ? <th>Action</th> : <th>Status</th>}
                {currentUser.type === "Admin" ? <th>Action</th> : null}
              </tr>
            </thead>
            <tbody>
              {timeslot.map((timeSlot, index) => (
                // timeSlot.student === null ?
                // null :
                timeSlot.student === null ?
                <tr key={index}>                 
                  <td>{timeSlot.time}</td>
                  <td>{timeSlot.staffName}</td>
                  <td>{timeSlot.studentName}</td>
                {currentUser.type === "Staff" ? <td><button onClick={() => handleClick(timeSlot.time)}>Accept</button></td> : <td></td>}
                </tr>
                :
                <tr key={timeSlot._id}  style={style.t}>
                  <td>{timeSlot.time}</td>
                  <td>{timeSlot.staffName}</td>
                  <td>{timeSlot.studentName}</td>
                  
                  {currentUser.name === timeSlot.staffName &&  currentUser.type === "Staff" ? 
                    <td><button onClick={() => handleClick2(timeSlot.time)}>Decline</button></td> 
                    :<td>Booked</td>
                }
                {currentUser.type === "Admin" ? <td><button >Finish</button></td> : null}
                </tr>
              ))}
            </tbody>
          </table>
          </>
          : <h3>Time Slot Not Available Yet</h3>}
          </div>
          </div>
          </div>
        </>
  )
}

export default TimeSlot

//style red 

const style = {
    t:{
        backgroundColor: "red",
        color: "white",
    },
}

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



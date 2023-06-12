import React from 'react';
import axios from 'axios';
import { studentMultiRegister } from '../../routes/APIRoutes';

const EmailSender = (props) => {
  const sendEmails = async () => {
    const studentData = props.jsonData; 
    console.log(studentData);
    const emailData = {
      students: studentData,
    };    
    
    const res = await axios.post(studentMultiRegister, {
      emailData
    });
    if(res.status === true){
      console.log(res);
    }else{
      console.log(res);
    }

  };
  
  const columns = props.jsonData.length > 0 ? Object.keys(props.jsonData[0]) : [];
  return (
    <>    
      <button onClick={sendEmails}>Register Details</button>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.jsonData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmailSender;

import React from 'react';
import axios from 'axios';
import { staffMultiRegister } from '../../routes/APIRoutes';


const EmailSf = (props) => {
  const sendEmails = async () => {
    const staffData = props.jsonData; 
    console.log(staffData);
    const emailData = {
      staffs: staffData,
    };    
    
    const res = await axios.post(staffMultiRegister, {
      emailData
    });
    if(res.status === true){
      console.log(res);
    }else{
      console.log(res);
    }

  };

  const columns = props.jsonData.length > 0 ? Object.keys(props.jsonData[0]) : [];
  console.log(columns);
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

export default EmailSf;

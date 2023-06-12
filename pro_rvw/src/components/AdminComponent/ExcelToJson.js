

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import EmailSender from './EmailSender';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const ExcelToJson = () => {

  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState(null);
    
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    const user  = token ? JSON.parse(token) : null;
    if(!user || user.type !== "Admin"){
      console.log("Hiii da",user);
      navigate("/");
    }
    console.log("token",user.type);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const dataJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = dataJson[0];
      const jsonData = dataJson.slice(1).map((row) => {
        return headers.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {});
      });

      setJsonData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      {jsonData && (
        <div>
          <h2>JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <EmailSender jsonData = {jsonData}/>
        </div>
      )}      
    </div>
  ); 
};

export default ExcelToJson;

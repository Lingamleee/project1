import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { addPptRoute, deletePptRoute, getPptRoute } from '../../../routes/APIRoutes';

function Process2 () {
  const [file, setFile] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [ppt, setPpt] = useState(undefined);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current-user"));
    setUser(user);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("current-user"));
    const student = user.regno;
    const getPpt = async () => {
      const res = await axios.get(getPptRoute, {
        responseType: 'blob',
        params: {
          student: student
        }
      });
      console.log(res);
      if(res.data.size > 0){
        console.log(res.data);
        setPpt("res.data");
        setFiles(res.data);
      }
    }
    getPpt();
  }, []);



  const handleFileChange = (e) => {
    const doc = e.target.files[0];
    setFile(doc);
  }

  const onClickHandler = async () => {
    if(!file){
      alert("Please SELECT File");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    const student = user.regno;
    data.append("student", student);
    const res =await axios.post(addPptRoute,data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.data){
      alert("File Uploaded");     
      setPpt("res.data");
    }
    console.log(res);
  }



    const handleDownload = async () => {    
      const blob = new Blob([files], { type: files.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = user.regno+".pptx";
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    }

    const handleDelete = async () => {
      const student = user.regno;
      const res = await axios.delete(deletePptRoute, {
        params: {
          student: student
        }
      });
      console.log(res);
      if(res.data){
        alert("Deleted Successfully");
        setPpt(undefined);
      }
    }


    
    // const handleDownloadAll = async () => {
    //   try {
    //     const response = await axios.get(getAllPptRoute, {
    //       responseType: 'arraybuffer',
    //     });
    //     const zipData = response.data;
    //     console.log(zipData);
    
    //     //Create a new JSZip instance
    //     const zip = new JSZip();    


    //     await zip.loadAsync(zipData);

    //     // Generate a unique filename for the ZIP file
    //     const timestamp = Date.now();
    //     const zipFilename = `files_${timestamp}.zip`;
    //     zip.generateAsync({ type: 'blob' }).then((content) => {
    //       // Create a temporary <a> element to trigger the file download
    //       const element = document.createElement('a');
    //       element.href = URL.createObjectURL(content);
    //       element.download = zipFilename;
    //       document.body.appendChild(element);
    //       element.click();
    //       document.body.removeChild(element);
    //     });


    //   } catch (error) {
    //     console.log(error);
    //     // Handle errors
    //   }
    // }
  

    return (
      <div>
        <div className="container" style={{backgroundColor:"#ffffff", padding: "50px"}}> 
          <div className="row">
            <div className="col-md-12">
              <h1>Process 2 {ppt}</h1>
              {ppt ? <>
                <h3>You Already Uploaded a presentation</h3> 
                <ButtonStyle onClick={handleDownload}>
                  Download
                </ButtonStyle>
                <br/><br/>
                <ButtonStyle onClick={handleDelete}>
                  Delete
                </ButtonStyle>
                
              </> : 
              <>
                <h3>Upload A Presentation</h3>
                <input type="file" name="ppt" id="ppt"  onChange={handleFileChange}/>
                <ButtonStyle onClick={onClickHandler}>
                  Submit
                </ButtonStyle> 
              </>}
             </div>  
          </div>
        </div>
      </div>
    )
}

export default Process2


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
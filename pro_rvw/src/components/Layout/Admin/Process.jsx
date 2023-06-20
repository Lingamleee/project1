import Process1 from './Process1';
import Process2 from './Process2';
import Process3 from './Process3';
import Process4 from './Process4';
import Process5 from './Process5';
import store from '../../../store';
import axios from 'axios';
import React, {useState } from 'react'
import { addTimeSlotRoute, createDateRoute, getAllPptRoute} from '../../../routes/APIRoutes';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import JSZip from 'jszip';



export default function Process() { 
  
  const process = store.getState().process;
  //use current date
  const [value, setValue] = useState(dayjs());
  const[start, setStart] = useState(value);
  const[end, setEnd] = useState(value);
  const [duration, setDuration] = useState(0);




const handleDurationChange = (event) => {
  setDuration(event.target.value);
};

const handleDownloadAll = async () => {
      try {
        const response = await axios.get(getAllPptRoute, {
          responseType: 'arraybuffer',
        });
        const zipData = response.data;
        console.log(zipData);
    
        //Create a new JSZip instance
        const zip = new JSZip();    


        await zip.loadAsync(zipData);

        // Generate a unique filename for the ZIP file
        const timestamp = Date.now();
        const zipFilename = `files_${timestamp}.zip`;
        zip.generateAsync({ type: 'blob' }).then((content) => {
          // Create a temporary <a> element to trigger the file download
          const element = document.createElement('a');
          element.href = URL.createObjectURL(content);
          element.download = zipFilename;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });


      } catch (error) {
        console.log(error);
        // Handle errors
      }
    }
  

const handleSubmit = async () => {
  await axios.post(createDateRoute, {
    date: value.toDate(),
  })
  let s1 = start;
  const e1 = end;
  const d1 = duration;
  //equal to s1 and e1 compare
  const timeSlots = [];
  while(!s1.isSame(e1)){
    timeSlots.push(s1.format('HH:mm'));
    s1 = s1.add(d1, 'minute');
  }

  timeSlots.map(async (timeSlot, index) => {
      await axios.post(addTimeSlotRoute, {
        time: timeSlot,
        date: value.toDate(),
      })
      .then(res => {
        //console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  })
}
    
  return (

    <div style={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {console.log(value.toDate())}
        <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
            />
        </LocalizationProvider>
        
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {start.format('HH:mm') + " - " + end.format('HH:mm')}
        <DemoContainer components={['TimePicker']}>
          <TimePicker 
            label="Basic time picker" 
            value={start}
            onChange={(newValue) => setStart(newValue)}
          />
          <TimePicker 
            label="Basic time picker" 
            value={end}
            onChange={(newValue) => setEnd(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <br />
      <input type="number" name="dur" id="duration" placeholder="Enter the duration " onChange={handleDurationChange} /><br/><br/>  
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
      <br/><br/>
      <button type="submit" className="btn btn-primary" onClick={handleDownloadAll} >Download All PPT</button>
      <div>
        {
          process === 1 ? <Process1/> : 
          process === 2 ? <Process2/> :
          process === 3 ? <Process3/> :
          process === 4 ? <Process4/> :
          <Process5/> 
        }
      </div>
    </div>
  )
}

const styles = {
  container: {
    flexDirection: 'column',
    padding : '1rem',
  },
  button: {
    marginTop: '1rem',
  },
};
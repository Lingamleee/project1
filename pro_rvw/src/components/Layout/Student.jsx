import React from 'react'
import store from '../../store'
import Process1 from './Student/Process1';
import Process2 from './Student/Process2';
import Process3 from './Student/Process3';
import Process4 from './Student/Process4';
import Process5 from './Student/Process5';

function Student() {

  const process = store.getState().process;
  console.log(process, 'process');

  return (
    <div>
      {
        process === 1 ? <Process1/> : 
        process === 2 ? <Process2/> :
        process === 3 ? <Process3/> :
        process === 4 ? <Process4/> :
        <Process5/> 
      }
    </div>
  )
}

export default Student

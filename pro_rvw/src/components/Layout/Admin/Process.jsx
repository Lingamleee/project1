import React from 'react'
import Process1 from './Process1';
import Process2 from './Process2';
import Process3 from './Process3';
import Process4 from './Process4';
import Process5 from './Process5';
import store from '../../../store';


function Process() {

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

export default Process

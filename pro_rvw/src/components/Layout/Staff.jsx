import React from 'react'
import Process1 from './Staff/Process1'
import store from '../../store'
import Process2 from './Staff/Process2';
import Process3 from './Staff/Process3';
import Process4 from './Staff/Process4';
import Process5 from './Staff/Process5';

function Staff() {

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

export default Staff

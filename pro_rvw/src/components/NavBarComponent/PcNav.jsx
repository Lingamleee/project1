import React from 'react'
import store from '../../store'
import NullNav from './NullNav';
import AdminNav from './AdminNav';
import StaffNav from './StaffNav';
import StudentNav from './StudentNav';


function PcNav() {
    const user = store.getState().accesor;
    console.log("User",user);

    return (
      <div>
        {user === 'Student' ?          
          <StudentNav/> :
          user=== 'Admin' ?
            <AdminNav/> :
            user === 'Staff' ?
              <StaffNav/> :
                <NullNav/>
        }
      </div>
    )
}

export default PcNav


import React, { Component } from 'react'
import PcHeader from '../HeaderComponent/PcHeader'
import PcNav from '../NavBarComponent/PcNav'
import PcLogin from '../LoginComponent/PcLogin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInSide from '../LoginComponent/SignInSide'
import PcFooter from '../FooterComponent/PcFooter'
import Admin from '../Layout/Admin'
import Student from '../Layout/Student'
import Staff from '../Layout/Staff'
import ExcelToJson from '../AdminComponent/ExcelToJson'
import PcCommunicate from '../CommunicateComponent/PcCommunicate'
import ExcelSf from '../AdminComponent/ExcelSf'
import Process from '../Layout/Admin/Process'
import MyGuide from '../Personal/MyGuide'
import MyStudent from '../Personal/MyStudent'
import TimeSlot from '../Layout/Admin/TimeSlot'

class PcMenu extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <PcHeader />
          <PcNav /> 
          <div style={styles.body}> 
            <Routes>
              <Route path='/' element={<PcLogin />}/>
              <Route path='/Login' element={<SignInSide />}/>
              <Route path='/Admin' Component={Admin}/>
              <Route path='*' element={<h1>Not Found</h1>}/>
              <Route path='/Student' Component={Student}/>
              <Route path='/Staff' Component={Staff} />
              <Route path='/Current' Component={Process} />            
              <Route path='/RegisterStudents' Component={ExcelToJson} />
              <Route path='/RegisterStaffs' Component={ExcelSf} />
              <Route path='/Communicate'  Component={PcCommunicate}/>
              <Route path='/MyGuide'  Component={MyGuide}/>
              <Route path='/MyStudent'  Component={MyStudent}/>
              <Route path='/time'  Component={TimeSlot}/>
            </Routes>
          </div>
          <PcFooter/>
        </BrowserRouter>
      </div>
    )
  }
}
export default PcMenu

// container scroll for the page

const styles = {
  body: {
    overflow: 'auto',    
    paddingBottom: '3rem',
  },
}

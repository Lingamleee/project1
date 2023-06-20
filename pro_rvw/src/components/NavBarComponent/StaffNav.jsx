import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../../store'
import { setCurrentAccesor, setCurrentUser } from '../../actions'
class StaffNav extends Component {




  handleLogout = () => {
    console.log('logout');    
    localStorage.clear();
    store.dispatch(setCurrentUser(null));    
    store.dispatch(setCurrentAccesor(null));  
  }
  render() {
    return (
      <div style={styles.body}>
        <Link to='/Staff'>
          <button style={styles.button}>Home</button>
        </Link>
        <button style={styles.button} onClick={() => window.open("https://www.annauniv.edu/DIST/faculties.html",'_blank')}>Faculties</button>  
        
        <Link to='/MyStudent'>
          <button style={styles.button}>My Students</button>        
        </Link>  
        <Link to='/time'>
          <button style={styles.button}>TimeSlot</button>        
        </Link>  
        <Link to='/Communicate'>
          <button style={styles.button}>Communicate</button>        
        </Link>  
        <Link to='/Contact'>
          <button style={styles.button}>Contact</button>        
        </Link>  
        <Link to='/' onClick={this.handleLogout}>
          <button style={styles.button}>Logout</button>
        </Link>
      </div>
    )
  }
}

export default StaffNav

//create drop down for previous student details




const styles = {
    body:{
        display : 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#7b0708', 
        width: '100%',
        height: '35px',
    },
    button:{
        backgroundColor: '#7b0708',
        color: '#fff',
        border: 'none',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '5px 10px',
        cursor: 'pointer',
        margin: '0 20px',
    },

    /* Dropdown Button */
    dropbtn :{
      position: "absolute",
      top: "208px",
      left: "520px",
      width: "200px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#7b0708",
      padding: "10px",
    }
}

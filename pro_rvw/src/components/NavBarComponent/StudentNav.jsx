import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../../store'
import { setCurrentAccesor, setCurrentUser } from '../../actions'
class StudentNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  handleLogout = () => {
    console.log('logout');    
    localStorage.clear();
    store.dispatch(setCurrentUser(null));
    store.dispatch(setCurrentAccesor(null));  
  }
  render() {
    return (
      <div style={styles.body}>
        <Link to='/Student'>
          <button style={styles.button}>Home</button>
        </Link>
        <button style={styles.button} onClick={() => window.open("https://www.annauniv.edu/DIST/faculties.html",'_blank')}>Faculties</button>    
        <Link to='/MyGuide'>
          <button style={styles.button}>My Guide</button>        
        </Link> 
        <Link to='/time'>
          <button style={styles.button}>TimeSlot</button>        
        </Link>   
        <Link to='/Communicate'>
          <button style={styles.button}>Communicate</button>        
        </Link>   
        <Link to ='/Research'>
          <button style={styles.button}>Research</button>
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

export default StudentNav

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

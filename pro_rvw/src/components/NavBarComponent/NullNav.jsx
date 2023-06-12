import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store from '../../store'
import { setCurrentUser } from '../../actions'
class NullNav extends Component {

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
    store.dispatch(setCurrentUser(null));
  }
  render() {
    return (
      <div style={styles.body}>
        <Link to='/Home'>
          <button style={styles.button}>Home</button>
        </Link>
        <button style={styles.button} onClick={() => window.open("https://www.annauniv.edu/DIST/faculties.html",'_blank')}>Faculties</button>
        <Link to ='/Research'>
          <button style={styles.button}>Research</button>
        </Link>
        <Link to='/Publications'>
          <button style={styles.button}>Publications</button>
        </Link>        
        <button style={styles.button} onClick={this.toggleDropdown}>Previous Student</button>
        {this.state.isDropdownOpen && (
          <div className="dropdown-content" style={styles.dropbtn}>
            <Link to='/PreviousStudent' onClick={this.toggleDropdown}>
              <button style={styles.button}>PhD</button>
            </Link>
            <Link to='/Previous'>
              <button style={styles.button} onClick={this.toggleDropdown}>M.S</button>
            </Link>
          </div>
        )}
        <Link to='/Contact'>
          <button style={styles.button}>Contact</button>        
        </Link>  
        <Link to='/' onClick={this.handleLogout}>
          <button style={styles.button}>LogIn</button>
        </Link>
      </div>
    )
  }
}

export default NullNav

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
      top: "188px",
      left: "475px",
      width: '180px',
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#7b0708",
      padding: "10px",
    }
}

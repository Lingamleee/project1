import React, { Component } from 'react'
import CollegeLogo from '../../assests/CEG_col.png'
class MobileHeader extends Component {
  render() {
    return (
        <center>
            <div style={styles.body}>                
                <img style={styles.img} src={CollegeLogo} alt=''/><br/> 
                <div style={styles.text}>
                    <h3>DEPARTMENT OF INFORMATION SCIENCE AND TECHNOLOGY</h3>
                    <p  style={{fontSize:12}}>Anna University, Chennai</p>
                    <p style={{fontSize:10}}>(AISHE Code: C-25072)</p>
                </div>
            </div>
        </center>
    )
  }
}

export default MobileHeader

const styles = {
    body:{        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        position: 'fixed',
        width: '100%',
    },
    img:{
        width: '120px',
        height: '120px',
    },
    text: {
        fontWeight: 'bold',
        margin: '0 20px',
    }

}


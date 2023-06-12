import React, { Component } from 'react'
import CollegeLogo from '../../assests/CEG_col.png'
class PcHeader extends Component {
  render() {
    return (
        <center>
            <div style={styles.body}>                
                <img style={styles.img} src={CollegeLogo} alt=''/><br/> 
                <div style={styles.text}>
                    <h4>NextGen Project Semester</h4>
                    <h4>DEPARTMENT OF INFORMATION SCIENCE AND TECHNOLOGY </h4>
                    <p  style={{fontSize:16}}>Anna University, Chennai</p>
                    <p style={{fontSize:14}}>(AISHE Code: C-25072)</p>
                </div>
            </div>
        </center>
    )
  }
}

export default PcHeader

const styles = {
    body:{        
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        width: '100%',
    },
    img:{
        width: '100px',
        height: '100px',
    },
    text: {
        fontWeight: 'bold',
        margin: '0 20px',
    }

}


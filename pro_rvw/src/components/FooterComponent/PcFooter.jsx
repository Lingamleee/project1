import React, { Component } from 'react'
// Footer for pc
class PcFooter extends Component {
  render() {
    return (
        <div style={styles.footer}>
            &copy;&nbsp;2021&nbsp;Department of Information Science and Technology, Anna University, Chennai
        </div>
    )
  }
}

export default PcFooter

// add a style
//footer fixed at the bottom of the page



const styles = {

    footer: {
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        height: '50px',
        backgroundColor: '#3f51b5',
        color: 'white',
        textAlign: 'center',
        padding: '10px',
        fontSize: '12px',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    }
}
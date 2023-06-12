import { Button } from '@mui/material';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { setCurrentUser } from '../../actions';
import store from '../../store';


class CardView extends Component {

    

    handleClick = () => {
        console.log('clicked', this.props.title);
        store.dispatch(setCurrentUser(this.props.title));
    }

    render() {
        return(
            
            <Button 
                onClick={this.handleClick} 
                component={Link} 
                to= {{
                        pathname:'/Login',
                        state: {
                            user: this.props.title,
                        }
                }}>
                <div style={styles.card}>
                            <img style={styles.img} src={this.props.img} alt="img"/>
                            <div style={styles.title}>{this.props.title}</div>
                            <div style={styles.text}>{this.props.text}</div>    
                </div>                    
            </Button>

        )
    }
}

export default CardView

const styles = {
    card: {
        width: '200px',
        height: '250px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        cursor: 'pointer',
    },
    img: {
        width: '100px',
        height: '100px',
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    text: {
        fontSize: '16px',
        margin: '10px 0',
    }
}


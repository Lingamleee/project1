import { useNavigate } from 'react-router';
import CardView from './CardView'
import React, { useEffect } from 'react'

function PcLogin() {

  const navigate = useNavigate();
     
    useEffect(() => {
      if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
        const user = localStorage.getItem('user');
        console.log(user,"user");
        navigate('/'+user);
      }
    }, [])

    return (
      <div style={styles.card}>
        <CardView
            title="Admin"
            text="Admin Login"
            img="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824144_960_720.png"        
        />
        <CardView
            title="Student"
            text="Student Login"
            img="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824144_960_720.png"
        />
        <CardView
            title="Staff"
            text="Staff Login"
            img="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824144_960_720.png"
        />
      </div>
    )
}

export default PcLogin

const styles = {
    card: {
        display : 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        padding: '20px',
        alignSelf: 'center',
        marginTop : '100px',
        marginBottom : '100px',
        marginLeft : '50px',
    },
}
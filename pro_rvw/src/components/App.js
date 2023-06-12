import React, { Component } from 'react'
import Topbar from './MenuComponent/TopBar';
import store from '../store';
import { setCurrentAccesor, setOngoingProcess } from '../actions';
import { getOnGoingRoute, setOnGoingRoute } from '../routes/APIRoutes';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);    
    if(localStorage.getItem('user')){ 
      store.dispatch(setCurrentAccesor(localStorage.getItem('user')));
    }
  }

  async componentDidMount() {
    console.log('app mounted')
    //subscribe to the store
    store.subscribe(() => {
      console.log('store updated using subscribe', store.getState());
      this.forceUpdate();
    });
    // dispatch an action
    const res = await axios.get(getOnGoingRoute);
    if(res.data.onGoing.length > 0){  
      store.dispatch(setOngoingProcess(res.data.onGoing[0].progress));
    }else{      
          store.dispatch(setOngoingProcess(0));
          const respone = axios.post(setOnGoingRoute, {progress: 0});
          if(respone.data){
            console.log("ongoing process set to 0");
          }else{
            console.log("ongoing process not set to 0");
          }
    }

  }

  render() { 
    return (
      <div>
        <Topbar />
        {/* <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>course</th>
              <th>year</th>
              <th>college</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>{student.college}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

      </div>
    )
  }
}

export default App
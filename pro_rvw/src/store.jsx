import { createStore } from 'redux';
import students from './reducers';

const store = createStore(students);
console.log(store.getState());

export default store;
import { combineReducers } from 'redux';
import {simpleReducer, login, store} from './simpleReducer';
export default combineReducers({
 simpleReducer,
 login, 
 store
});
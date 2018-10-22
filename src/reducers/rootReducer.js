import { combineReducers } from 'redux';
import {simpleReducer, login} from './simpleReducer';
export default combineReducers({
 simpleReducer,
 login
});
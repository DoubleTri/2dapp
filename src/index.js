import React, { setGlobal } from 'reactn';
import { auth } from "./firebase";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

setGlobal({
    cards: [1,2,3,4,5,65],
    disabled: false,
    initial: 'values',
    x: 1,
    user: null,
    uid: null,
    obj: {one:1,two:2,three:3}
  });


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
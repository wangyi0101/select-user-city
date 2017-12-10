import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import User from './components/user/User';
import Controller from './components/controller/controller'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Controller />, document.getElementById('root'));
registerServiceWorker();

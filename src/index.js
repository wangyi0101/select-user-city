import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import User from './components/user/User';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<User />, document.getElementById('root'));
registerServiceWorker();

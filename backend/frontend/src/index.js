import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Webmanager from './components/manager';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
    <Webmanager />
    </BrowserRouter>
    ,document.getElementById('roota')
);
//ReactDOM.render(
//   <React.StrictMode>
//     < />
//     </React.StrictMode>,
//   document.getElementById('f_content')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

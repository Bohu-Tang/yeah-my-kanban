import React from 'react';
import ReactDOM from 'react-dom/client';
// import {Provider} from 'react-redux';
import Kanban from './components/kanban/Kanban.jsx';
// import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Kanban />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

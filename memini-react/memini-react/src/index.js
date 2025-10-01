import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import {Provider} from 'react-redux';
import store from './store/index.ts';
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') 
);

root.render(


    <BrowserRouter>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>      
      </Provider>
    </BrowserRouter>


);

reportWebVitals();

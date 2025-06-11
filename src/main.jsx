import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.styles.scss'
import { Provider } from 'react-redux'
import React from "react";
import { store } from './store.js'
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
    <Provider store={store} >
      <App />
    </Provider>
)

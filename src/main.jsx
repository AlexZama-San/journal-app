import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { JournalApp } from './JournalApp'
import { store } from './store/store'

import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <JournalApp></JournalApp>
      </Router>
      
    </Provider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <RecoilRoot>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </RecoilRoot>

  ,
  document.getElementById('root')
)

serviceWorker.unregister()


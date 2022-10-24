import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {StatusOfGame} from "./providers/StatusOfGame";
import {LoadingProvider} from "./providers/LoadingProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <LoadingProvider>
          <StatusOfGame>
              <App />
          </StatusOfGame>
      </LoadingProvider>
  </React.StrictMode>
)

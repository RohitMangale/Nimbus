import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store.js'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <ToastContainer theme='light' position='top-center' autoClose={3000} closeOnClick pauseOnHover={false} />
    <App />
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </StrictMode>
)

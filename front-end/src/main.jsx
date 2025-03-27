import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

// 319604150752-vpfc05fm7svkcgdfrkufqgusjamg75k5.apps.googleusercontent.com

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="319604150752-vpfc05fm7svkcgdfrkufqgusjamg75k5.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ThemeProvider from "./ThemeContext";

<<<<<<< HEAD
// 319604150752-vpfc05fm7svkcgdfrkufqgusjamg75k5.apps.googleusercontent.com

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="319604150752-vpfc05fm7svkcgdfrkufqgusjamg75k5.apps.googleusercontent.com">
      <App />
=======
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1059491385080-dbgkekb59g3dcjflmue4g21pn9nj973n.apps.googleusercontent.com">
      <ThemeProvider>
        <App />
      </ThemeProvider>
>>>>>>> c928fdb44ae62c75d04d82f0dd8b0a20bb71c560
    </GoogleOAuthProvider>
  </StrictMode>
);

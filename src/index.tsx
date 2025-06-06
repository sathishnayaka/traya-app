import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./components/theme/theme.css";
import { ThemeProvider } from "./components/theme/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

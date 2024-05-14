import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { store, persistor } from "./store";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider style={{ color: "#fff"}} maxSnack={1}>
          <Router>
            <App />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 2500,
              }}
              reverseOrder={false}
            />
          </Router>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

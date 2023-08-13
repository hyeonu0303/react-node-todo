import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import RouterInfo from "./router/router.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

const Router = createBrowserRouter(RouterInfo);
export let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <RouterProvider router={Router}>
            <App />
          </RouterProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

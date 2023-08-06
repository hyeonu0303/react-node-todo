import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import RouterInfo from "./router/router.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = createBrowserRouter(RouterInfo);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </RouterProvider>
  </React.StrictMode>
);

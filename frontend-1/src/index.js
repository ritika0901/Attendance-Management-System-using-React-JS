import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {StrictMode} from 'react';
import { BrowserRouter } from "react-router-dom";
import {createRoot} from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from './context';
import { StudContext } from './studcontext';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render( 
  <ContextProvider>
    <StudContext>
      <ChakraProvider>
        <BrowserRouter>
          <StrictMode>
            <App />
          </StrictMode>
        </BrowserRouter>
      </ChakraProvider>
    </StudContext>
  </ContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

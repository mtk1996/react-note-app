import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { LabelContextProvider } from "./context/LabelContext";

import { MessageContextProvider } from "./context/MessageContext";
import MainRouter from "./MainRouter";
export default function App() {
  return (
    <LabelContextProvider>
      <MessageContextProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </AuthContextProvider>
      </MessageContextProvider>
    </LabelContextProvider>
  );
}

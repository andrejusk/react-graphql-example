import React from "react";

import { ThemeProvider } from "@primer/react";

import { AuthnProvider } from "../contexts/AuthnContext";

const AppWrapper = (props) => (
  <React.StrictMode>
    <ThemeProvider>
      <AuthnProvider {...props} />
    </ThemeProvider>
  </React.StrictMode>
);

export default AppWrapper;

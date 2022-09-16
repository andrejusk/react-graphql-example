import React from "react";

import { AuthnProvider } from "../contexts/AuthnContext";

const AppWrapper = (props) => (
  <React.StrictMode>
    <AuthnProvider {...props} />
  </React.StrictMode>
);

export default AppWrapper;

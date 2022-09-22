import React from "react";

import AppFooter from "../components/appFooter";
import AppHeader from "../components/appHeader";

const AppShell = ({ children }) => (
  <>
    <AppHeader />
    <main className="App-content">{children}</main>
    <AppFooter>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React!
      </a>
    </AppFooter>
  </>
);

export default AppShell;

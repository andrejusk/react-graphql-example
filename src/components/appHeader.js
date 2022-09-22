import React from 'react';

import "./appHeader.css";

const NAME = process.env.REACT_APP_NAME;
const VERSION = process.env.REACT_APP_VERSION;

const AppHeader = ({ children }) => {
  return (
    <header className="App-header">
      <span>{`${NAME} v${VERSION}`}</span>
      <div className="App-header-aside">{children}</div>
    </header>
  );
};

export default AppHeader;

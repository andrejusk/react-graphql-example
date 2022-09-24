import React from "react";

import { Header } from "@primer/react";

const NAME = process.env.REACT_APP_NAME;
const VERSION = process.env.REACT_APP_VERSION;

const AppHeader = ({ children }) => {
  return (
    <Header>
      <Header.Item>
        <Header.Link href="#" fontSize={2}>
          <span>{NAME}</span>
          <span>&nbsp;v</span>
          <span>{VERSION}</span>
        </Header.Link>
      </Header.Item>
      <Header.Item full>{children}</Header.Item>
    </Header>
  );
};

export default AppHeader;

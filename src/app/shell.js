import React from "react";

import { BaseStyles, Box, Link } from "@primer/react";

import AppHeader from "../components/appHeader";

const AppShell = ({ children }) => (
  <BaseStyles>
    <AppHeader />
    <Box sx={{ m: 3 }}>
      <Box>{children}</Box>
      <Box as={"footer"} sx={{ mt: 5 }}>
        <Link href="#">Learn React!</Link>
      </Box>
    </Box>
  </BaseStyles>
);

export default AppShell;

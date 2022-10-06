import React from "react";

import { BaseStyles, Box, Link } from "@primer/react";

import AppHeader from "../components/header";

const AppShell = ({ children }) => (
  <Box
    sx={{
      height: "100%",
      bg: "canvas.default",
    }}
  >
    <BaseStyles>
      <AppHeader />
      <Box sx={{ m: 3 }}>
        <Box>{children}</Box>
        <Box as={"footer"} sx={{ mt: 5 }}>
          <Link href="#">Learn React!</Link>
        </Box>
      </Box>
    </BaseStyles>
  </Box>
);

export default AppShell;

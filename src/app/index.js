import React from 'react';

import "./index.css";

import AppContent from "./content";
import AppWrapper from "./wrapper";
import AppShell from "./shell";

const App = () => (
  <AppWrapper>
    <AppShell>
      <AppContent />
    </AppShell>
  </AppWrapper>
);

export default App;

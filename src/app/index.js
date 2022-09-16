import AppContent from "./appContent";
import AppWrapper from "./appWrapper";
import AppShell from "./appShell";

import "./app.css";

const App = () => (
  <AppWrapper>
    <AppShell>
      <AppContent />
    </AppShell>
  </AppWrapper>
);

export default App;

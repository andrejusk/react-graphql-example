import React from "react";

import "./content.css";

import useAuthn from "../hooks/useAuthn";

const LoginPage = React.lazy(() => import("../pages/login.page"));
const MainPage = React.lazy(() => import("../pages/main.page"));
const RelayProvider = React.lazy(() => import("../services/relay"));

/// Once the user is authenticated, we can render the app content
/// and initialise any services that require authentication
const AppContentWrapper = (props) => <RelayProvider {...props} />;

const AppContent = () => {
  const { tokenState } = useAuthn();

  // Auth guard for GraphQL
  if (tokenState !== "valid")
    return (
      <React.Suspense>
        <LoginPage />
      </React.Suspense>
    );
  return (
    <React.Suspense>
      <AppContentWrapper>
        <MainPage />
      </AppContentWrapper>
    </React.Suspense>
  );
};

export default AppContent;

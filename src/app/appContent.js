import React from "react";

import useAuthn from "../hooks/useAuthn";

const AuthnForm = React.lazy(() => import("../components/authnForm"));
const AuthnPage = React.lazy(() => import("../components/authnPage"));

const AppContent = () => {
  const { tokenState } = useAuthn();

  // Auth guard for GraphQL
  if (tokenState !== "valid")
    return (
      <React.Suspense>
        <AuthnForm />
      </React.Suspense>
    );
  return (
    <React.Suspense>
      <AuthnPage />
    </React.Suspense>
  );
};

export default AppContent;

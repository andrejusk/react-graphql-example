import useAuthn from "../hooks/useAuthn";
import AuthnForm from "../components/authnForm";

const AppContent = () => {
  const { tokenState } = useAuthn();

  // Auth guard for GraphQL
  if (tokenState !== "valid") return <AuthnForm />;

  return (
    <>
      <code>Token: '{tokenState}'</code>
    </>
  );
};

export default AppContent;

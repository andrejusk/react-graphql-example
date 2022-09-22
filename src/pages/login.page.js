
import React from "react";

import './login.page.css';

import API_CONSTANTS from "../constants/api";
import useAuthn from "../hooks/useAuthn";

const { TOKEN_URL } = API_CONSTANTS;

const LoginPage = () => {
  const { setToken, tokenState } = useAuthn();
  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const token = e.target[0].value
      setToken(token);
    },
    [setToken]
  );
  return (
    <>
      <h1>Authn</h1>
      <form className="authnForm" onSubmit={onSubmit}>
        <label>
          <h2>
            <span>Personal Access Token</span>
          </h2>
          <input type="password" />
          <button disabled={tokenState === "pending"}>Submit</button>
          {tokenState === "error" && (
            <p className="error">
              <span>Failed to validate token, try again later</span>
            </p>
          )}
          {tokenState === "invalid" && (
            <p className="error">
              <span>Invalid token</span>
            </p>
          )}
          <p>
            <span>Please generate a "legacy" PAT </span>
            <a href={TOKEN_URL}>here.</a>
          </p>
        </label>
      </form>
    </>
  );
};

export default LoginPage;

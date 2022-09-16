import React from "react";

import API_CONSTANTS from "../constants/api";
import useAuthn from "../hooks/useAuthn";
import Spinner from "./spinner";

const { TOKEN_URL } = API_CONSTANTS;

const AuthnForm = () => {
  const { setToken, tokenState } = useAuthn();
  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log({ e });
      setToken(e.target[0].value);
    },
    [setToken]
  );
  return (
    <>
      <h1>Authn</h1>
      <form onSubmit={onSubmit}>
        <label>
          <h2>
            <span>Personal Access Token</span>
          </h2>
          <input type="password" />
          {tokenState === "pending" && (
            <>
              <p>Valdiating token...</p>
              <Spinner />
            </>
          )}
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

export default AuthnForm;

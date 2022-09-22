import React from "react";

import { graphqlFetchFactory } from "../services/graphql";

const AuthnContext = React.createContext({
  token: null,
  setToken: () => {},
  tokenState: null,

  username: null,
});

const AuthnProvider = (props) => {
  const [last, setLast] = React.useState(Date.now());
  const [token, setToken] = React.useState(null);
  const setTokenCallback = React.useCallback(
    (token) => {
      setToken(token);
      setLast(Date.now());
    },
    [setToken, setLast]
  );
  const [username, setUsername] = React.useState(null);
  const [tokenState, setTokenState] = React.useState("idle");
  React.useEffect(
    function clearUsername() {
      setUsername(null);
    },
    [token, setUsername]
  );
  React.useEffect(
    function verifyToken() {
      if (!token) return;
      setTokenState("pending");
      graphqlFetchFactory(token)({ text: "query { viewer { login } }" }, {})
        .then(async (res) => {
          if (res.status >= 500) {
            setTokenState("error");
            return;
          }
          if (res.status >= 400) {
            setTokenState("invalid");
            return;
          }
          const { data } = await res.json();
          const user = data.viewer.login ?? null;
          if (user) {
            setTokenState("valid");
            setUsername(user);
            return;
          }
          setTokenState("missing");
        })
        .catch((err) => {
          console.log({ err });
          setTokenState("error");
        });
    },
    [last, token, setUsername]
  );
  return (
    <AuthnContext.Provider
      value={{ token, setToken: setTokenCallback, username, tokenState }}
      {...props}
    />
  );
};

export default AuthnContext;

export { AuthnProvider };

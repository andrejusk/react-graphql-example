import React from "react";

import API_CONSTANTS from "../constants/api";

const { HOST } = API_CONSTANTS;

const AuthnContext = React.createContext({
  token: null,
  setToken: () => {},
  tokenState: null,

  username: null,
});

const AuthnProvider = (props) => {
  const [token, setToken] = React.useState(null);
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
      fetch(`${HOST}/graphql`, {
        method: "POST",
        body: JSON.stringify({
          query: "query { viewer { login } }",
        }),
        headers: [["Authorization", `Bearer ${token}`]],
      })
        .then((res) => {
          if (res.status >= 500) {
            setTokenState("error");
            return;
          } else if (res.status >= 400) {
            setTokenState("invalid");
            return;
          }
          return res.json();
        })
        .then((payload) => {
          const user = payload.data.viewer.login ?? null;
          if (user) {
            setTokenState("valid");
            setUsername(user);
            return;
          }
          setTokenState("missing");
        })
        .catch((err) => {
          console.log({ err });
        });
    },
    [token, setUsername]
  );
  return (
    <AuthnContext.Provider
      value={{ token, setToken, username, tokenState }}
      {...props}
    />
  );
};

export default AuthnContext;

export { AuthnProvider };

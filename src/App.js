import React from "react";

import "./App.css";

const HOST = "https://api.github.com";

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
  )
  React.useEffect(
    function verifyToken() {
      if (!token) return;
      setTokenState("pending");
      fetch(`${HOST}/graphql`, {
        method: "POST",
        body: JSON.stringify({
          query: "query { viewer { login } }",
        }),
        headers: [
          ['Authorization', `Bearer ${token}`]
        ]
      }).then((res) => {
        if (res.status >= 500) {
          setTokenState("error");
          return;
        } else if (res.status >= 400) {
          setTokenState("invalid");
          return;
        }
        return res.json()
      }).then((payload) => {
        const user = payload.data.viewer.login ?? null;
        if (user) {
          setTokenState("valid");
          setUsername(user);
          return
        }
        setTokenState("missing");
      }).catch((err) => {
        console.log({err})
      });
    },
    [token, setUsername]
  );
  return (
    <AuthnContext.Provider value={{ token, setToken, username, tokenState }} {...props} />
  );
};
const useAuthn = () => React.useContext(AuthnContext);

const AuthnForm = (props) => {
  const { setToken, tokenState } = useAuthn();
  const onSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      console.log({ e });
      setToken(e.target[0].value);
    },
    [setToken]
  );
  if (tokenState === "valid") return null;
  return (
    <>
      <h1>Authn</h1>
      <form onSubmit={onSubmit} {...props}>
        <label>
          <h2>
            <span>Personal Access Token</span>
          </h2>
          <input type="text" />
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
            <span>Generate a "legacy" PAT </span>
            <a href="https://github.com/settings/tokens">here</a>
          </p>
        </label>
      </form>
    </>
  );
};

const AppWrapper = (props) => (
  <React.StrictMode>
    <AuthnProvider {...props} />
  </React.StrictMode>
);

const AppHeader = (props) => {
  const name = process.env.REACT_APP_NAME;
  const version = process.env.REACT_APP_VERSION;
  const { username } = useAuthn();
  return (
    <header className="App-header" {...props}>
      <span>{`${name} v${version}`}</span>
      <div className="App-user">
        <code>{username && `@${username}`}</code>
      </div>
    </header>
  );
};

const App = () => (
  <AppWrapper>
    <AppHeader />
    <main className="App-content">
      <AuthnForm />
    </main>
    <footer className="App-footer">
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </footer>
  </AppWrapper>
);

export default App;

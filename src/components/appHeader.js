const AppHeader = ({ children }) => {
  const name = process.env.REACT_APP_NAME;
  const version = process.env.REACT_APP_VERSION;
  return (
    <header className="App-header">
      <span>{`${name} v${version}`}</span>
      <div className="App-header-aside">{children}</div>
    </header>
  );
};

export default AppHeader;

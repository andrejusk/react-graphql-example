import AppFooter from '../components/appFooter';
import AppHeader from '../components/appHeader';

import useAuthn from '../hooks/useAuthn';

const AppShell = ({ children }) => {
  const { username } = useAuthn();

  return (
    <>
      <AppHeader>
        <code>{username && `@${username}`}</code>
      </AppHeader>
      <main className="App-content">{children}</main>
      <AppFooter>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </AppFooter>
    </>
  );
};

export default AppShell;

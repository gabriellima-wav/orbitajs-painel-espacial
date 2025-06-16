import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import { AuthContext } from './context/AuthContext';
import { useFakeAuth } from './hooks/useFakeAuth';

function App() {
  const auth = useFakeAuth();

  return (
    <AuthContext.Provider value={auth}>
      {auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </AuthContext.Provider>
  );
}

export default App;

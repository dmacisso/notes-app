import { createContext, useContext, useEffect, useState } from 'react';
import authService  from '../services/authService';

const AuthContext = createContext();

//* Provider is what wraps the application, so components have access to the state that is in the context. The children will be whatever is wrapped.
export const AuthProvider = ({ children }) => {
  //* state for this auth context
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //* functions to execute when page loads.
  useEffect(() => {
    checkUser();
  }, []);

  //* Check for a logged in user
  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getUser();
    // console.log("Response",response);

    if (response?.error) {
      setUser(null);
    } else {
      setUser(response);
    }
    setLoading(false);
  };

  //* functions to send down to the wrapped components (children)
  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response?.error) {
      return response;
    }

    await checkUser();
    return { success: true };
  };

  const register = async (email, password) => {
    const response = await authService.register(email, password);
    if (response?.error) {
      return response;
    }

    //* auto-login after register
    return login(email, password);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  //* pass all this  (functions and state) down to components so they can be run
  //* takes in a value, an object passing the user and loading state, as well as the login, register,logout functions that get passed into our context as children
  // MARK: JSX
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {' '}
      {children}
    </AuthContext.Provider>
  );
};

//* then we  create and export this hook called useAuth.
export const useAuth = () => useContext(AuthContext);

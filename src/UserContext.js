import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    // Décoder le token pour extraire les informations de l'utilisateur
    return token ? jwtDecode(token) : null;
  });
  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode(token);
    console.log('Decoded User:', decodedUser); // Ajouter ce log
    setUser(decodedUser);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Optionnel: Vérifier la validité du token au montage du composant
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } else {
      setUser(null);
    }
  }, []);
  
  

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

import { useContext } from 'react';
import { AuthContext } from '../proviers/AuthProvider';

const useAuth = () => {
  const auth = useContext(AuthContext);
  
  // Add a check to ensure `auth` is not null
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};

export default useAuth;

import { useEffect, useState } from 'react';
import { isAuthenticated } from './authService';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      if (!auth) {
        navigate('/login');
      } else {
        setIsAuth(true);
      }
    };

    checkAuth();
  }, [navigate]);

  return isAuth;
};

export default useAuth;

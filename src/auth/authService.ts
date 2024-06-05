import axios from 'axios';

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

const removeToken = () => {
  localStorage.removeItem('token');
};

const refreshToken = async (): Promise<string | null> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post('http://localhost:8080/api/refresh-token', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newToken = response.data.token;
    setToken(newToken);
    return newToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    removeToken();
    return null;
  }
};

const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    await axios.get('http://localhost:8080/api/validate-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    const newToken = await refreshToken();
    return !!newToken;
  }
};

export { getToken, setToken, removeToken, refreshToken, isAuthenticated };

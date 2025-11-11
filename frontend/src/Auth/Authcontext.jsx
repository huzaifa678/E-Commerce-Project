import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && refreshToken && !originalRequest._retry) {
          originalRequest._retry = true;
          await renewAccessToken();
          originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
          return axios(originalRequest);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken]);

  const login = async (username, password) => {
    const response = await axios.post('/login', { UserName: username, Password: password });
    const { accessToken: at, refreshToken: rt, user: u } = response.data;

    setAccessToken(at);
    setRefreshToken(rt);
    setUser(u);

    localStorage.setItem('accessToken', at);
    localStorage.setItem('refreshToken', rt);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const renewAccessToken = async () => {
    if (!refreshToken) return logout();

    try {
      const response = await axios.post('/renew', { refreshToken });
      const { accessToken: newAccess, refreshToken: newRefresh } = response.data;

      setAccessToken(newAccess);
      setRefreshToken(newRefresh);

      localStorage.setItem('accessToken', newAccess);
      localStorage.setItem('refreshToken', newRefresh);
    } catch (err) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


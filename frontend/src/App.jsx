import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import About from './parts/About';
import Layout from './components/Layout';
import Signup from './parts/Signup';
import Products from './parts/Products';
import Login from './parts/Login';
import Payment from './parts/Payment';
import { AuthProvider } from './Auth/Authcontext';
import PrivateRoute from './private/PrivateRoute';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element:<Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: '/payments',
          element: <PrivateRoute element={<Payment />} />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;


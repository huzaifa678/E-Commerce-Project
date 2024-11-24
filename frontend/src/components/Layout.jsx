import { Outlet, Link } from 'react-router-dom';
import '../styles.css';
import { useAuth } from '../Auth/Authcontext'; 

function Layout() {

  const { isAuthenticated } = useAuth();


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-white font-bold text-3xl cursor-default">
            Welcome to our E-commerce page!
          </h1>
          <nav className="flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-200 transition duration-300 hover:scale-110 ">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-gray-200 transition duration-300 hover:scale-110">
              About
            </Link>
            <Link to="/products" className="text-white hover:text-gray-200 transition duration-300 hover:scale-110">
              Products
            </Link>
            {!isAuthenticated && (  
              <>
                <Link to="/signup" className="text-white hover:text-gray-200 transition duration-300 hover:scale-110">
                  Signup
                </Link>
                <Link to="/login" className="text-white hover:text-gray-200 transition duration-300 hover:scale-110">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 E-commerce Page. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;


import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, linkText, linkPath }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="py-6 px-4 sm:px-8">
        <div className="text-2xl font-bold text-red-500">Movie app</div>
      </header>
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow flex items-center justify-center p-4"
      >
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-gray-400">{subtitle}</p>
            </div>
            
            {children}
            
            <div className="mt-6 text-center text-sm text-gray-400">
              {linkText} <Link to={linkPath} className="text-red-500 hover:text-red-400 font-medium">{linkText.includes('Sign up') ? 'Sign up' : 'Log in'}</Link>
            </div>
          </div>
        </div>
      </motion.main>
      
      <footer className="py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} StreamFlix. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
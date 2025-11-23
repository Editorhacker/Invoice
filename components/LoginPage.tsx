import React from 'react';
import ThemeToggle from './ThemeToggle';

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
  onSwitchToHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignup, onSwitchToHome }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-deep-purple flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
       <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <button onClick={onSwitchToSignup} className="font-medium text-muted-magenta hover:text-dusty-pink">
            create a new account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-black/20 dark:backdrop-blur-sm dark:border dark:border-white/10 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue="demo@example.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-dusty-pink focus:border-dusty-pink sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  defaultValue="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-dusty-pink focus:border-dusty-pink sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-muted-magenta hover:bg-dusty-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted-magenta"
              >
                Sign in
              </button>
            </div>
          </form>
           <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <button onClick={onSwitchToHome} className="font-medium text-muted-magenta hover:text-dusty-pink">
              &larr; Back to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
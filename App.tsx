import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import InvoicePage from './components/InvoicePage';
import HomePage from './components/HomePage';
import { AuthStatus, AuthView } from './types';
import { ThemeProvider } from './components/ThemeContext';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('unauthenticated');
  const [authView, setAuthView] = useState<AuthView>('landing');

  const handleLogin = () => {
    setAuthStatus('authenticated');
  };

  const handleSignup = () => {
    setAuthStatus('authenticated');
  };

  const handleLogout = () => {
    setAuthStatus('unauthenticated');
    setAuthView('landing');
  };

  const renderAuthView = () => {
    switch (authView) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} onSwitchToHome={() => setAuthView('landing')} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setAuthView('login')} onSwitchToHome={() => setAuthView('landing')} />;
      case 'landing':
      default:
        return <HomePage onNavigateToLogin={() => setAuthView('login')} onNavigateToSignup={() => setAuthView('signup')} />;
    }
  }

  return (
    <ThemeProvider>
      <div className="bg-gray-50 dark:bg-deep-purple min-h-screen font-sans">
        {authStatus === 'unauthenticated' ? renderAuthView() : <InvoicePage onLogout={handleLogout} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import Button from '../common/Button';
import * as FiIcons from 'react-icons/fi';

const { FiSun, FiMoon, FiLogOut, FiBell } = FiIcons;

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Continue sua jornada de transformação
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <SafeIcon
              icon={theme === 'dark' ? FiSun : FiMoon}
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
            />
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.user_metadata?.name || user?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Membro desde {new Date(user?.created_at).getFullYear()}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {(user?.user_metadata?.name || user?.email)?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="p-2"
          >
            <SafeIcon icon={FiLogOut} className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
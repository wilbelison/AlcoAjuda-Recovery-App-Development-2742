import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: <LucideIcons.Home className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/progress', icon: <LucideIcons.BarChart3 className="w-5 h-5" />, label: 'Progresso' },
    { path: '/journal', icon: <LucideIcons.Book className="w-5 h-5" />, label: 'Diário' },
    { path: '/appointments', icon: <LucideIcons.Calendar className="w-5 h-5" />, label: 'Consultas' },
    { path: '/blog', icon: <LucideIcons.FileText className="w-5 h-5" />, label: 'Blog' },
    { path: '/profile', icon: <LucideIcons.User className="w-5 h-5" />, label: 'Perfil' },
    { path: '/settings', icon: <LucideIcons.Settings className="w-5 h-5" />, label: 'Configurações' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <LucideIcons.BeerOff className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Zero Alcool
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Transforme Seu Amanhã
                </p>
              </div>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? (
              <LucideIcons.Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <LucideIcons.X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                <div className="w-5 h-5 flex-shrink-0">{item.icon}</div>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-3 font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
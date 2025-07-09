import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { requestNotificationPermission } from '../utils/notifications';
import SafeIcon from '../components/common/SafeIcon';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import * as FiIcons from 'react-icons/fi';

const {
  FiSun,
  FiMoon,
  FiBell,
  FiVolume2,
  FiGlobe,
  FiDownload,
  FiTrash2,
  FiHelpCircle,
  FiShield,
  FiLogOut,
} = FiIcons;

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    reminders: true,
    achievements: true,
    tips: true,
    emails: true,
  });
  const [language, setLanguage] = useState('pt-BR');
  
  const handleToggleNotification = async (key) => {
    if (!notifications[key] && key !== 'emails') {
      const permissionGranted = await requestNotificationPermission();
      if (!permissionGranted) {
        alert('Para receber notificações, você precisa permitir o acesso no seu navegador.');
        return;
      }
    }
    
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };
  
  const handleExportData = () => {
    // Here you would typically implement data export functionality
    console.log('Exporting user data...');
  };
  
  const handleDeleteAccount = () => {
    // Here you would typically implement account deletion with confirmation
    if (window.confirm('Esta ação não pode ser desfeita. Tem certeza que deseja excluir sua conta?')) {
      console.log('Deleting account...');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Configurações
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Personalize sua experiência no aplicativo
        </p>
      </div>
      
      {/* Appearance Settings */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Aparência
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Tema
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Escolha entre o tema claro e escuro
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => theme !== 'light' && toggleTheme()}
              className={`p-3 rounded-lg border-2 transition-colors ${
                theme === 'light'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <SafeIcon icon={FiSun} className="w-5 h-5 text-primary-600" />
            </button>
            <button
              onClick={() => theme !== 'dark' && toggleTheme()}
              className={`p-3 rounded-lg border-2 transition-colors ${
                theme === 'dark'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <SafeIcon icon={FiMoon} className="w-5 h-5 text-primary-600" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-gray-800 my-6"></div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Tamanho da Fonte
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ajuste o tamanho do texto para melhor leitura
            </p>
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <span className="text-sm">A</span>
            </button>
            <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-2">
              <div className="w-1/2 h-full bg-primary-500 rounded-full"></div>
            </div>
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <span className="text-lg">A</span>
            </button>
          </div>
        </div>
      </Card>
      
      {/* Notification Settings */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Notificações
        </h2>
        
        <div className="space-y-6">
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start">
              <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Lembretes Diários
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receber lembretes para registrar seu dia
                </p>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="reminderToggle"
                className="opacity-0 w-0 h-0"
                checked={notifications.reminders}
                onChange={() => handleToggleNotification('reminders')}
              />
              <label
                htmlFor="reminderToggle"
                className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
              ></label>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start">
              <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Conquistas
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ser notificado quando desbloquear conquistas
                </p>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="achievementsToggle"
                className="opacity-0 w-0 h-0"
                checked={notifications.achievements}
                onChange={() => handleToggleNotification('achievements')}
              />
              <label
                htmlFor="achievementsToggle"
                className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
              ></label>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start">
              <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Dicas e Motivação
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receber dicas e mensagens motivacionais
                </p>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="tipsToggle"
                className="opacity-0 w-0 h-0"
                checked={notifications.tips}
                onChange={() => handleToggleNotification('tips')}
              />
              <label
                htmlFor="tipsToggle"
                className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
              ></label>
            </div>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start">
              <SafeIcon icon={FiBell} className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  E-mails
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receber e-mails sobre progresso e novidades
                </p>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="emailsToggle"
                className="opacity-0 w-0 h-0"
                checked={notifications.emails}
                onChange={() => handleToggleNotification('emails')}
              />
              <label
                htmlFor="emailsToggle"
                className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
              ></label>
            </div>
          </motion.div>
        </div>
      </Card>
      
      {/* Sound Settings */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Som e Idioma
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <SafeIcon icon={FiVolume2} className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Sons do Aplicativo
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ativar sons para notificações e conquistas
                </p>
              </div>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                id="soundToggle"
                className="opacity-0 w-0 h-0"
                defaultChecked
              />
              <label
                htmlFor="soundToggle"
                className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
              ></label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <SafeIcon icon={FiGlobe} className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Idioma
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Selecione o idioma do aplicativo
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* Data and Privacy */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Dados e Privacidade
        </h2>
        
        <div className="space-y-6">
          <Button
            variant="outline"
            onClick={handleExportData}
            className="flex items-center space-x-2 w-full justify-start"
          >
            <SafeIcon icon={FiDownload} className="w-5 h-5" />
            <span>Exportar Meus Dados</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 w-full justify-start"
          >
            <SafeIcon icon={FiShield} className="w-5 h-5" />
            <span>Política de Privacidade</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center space-x-2 w-full justify-start"
          >
            <SafeIcon icon={FiHelpCircle} className="w-5 h-5" />
            <span>Termos de Uso</span>
          </Button>
          
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            className="flex items-center space-x-2 w-full justify-start"
          >
            <SafeIcon icon={FiTrash2} className="w-5 h-5" />
            <span>Excluir Minha Conta</span>
          </Button>
        </div>
      </Card>
      
      {/* About */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Sobre o AlcoAjuda
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Versão 1.0.0
            </p>
          </div>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
          >
            <SafeIcon icon={FiHelpCircle} className="w-5 h-5" />
            <span>Ajuda e Suporte</span>
          </Button>
        </div>
        
        <div className="mt-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            AlcoAjuda é uma plataforma dedicada a ajudar pessoas a reduzir ou cessar o consumo de álcool, 
            oferecendo ferramentas, suporte e recursos para uma jornada de transformação.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            © 2024 AlcoAjuda. Todos os direitos reservados.
          </p>
        </div>
      </Card>
      
      <div className="flex justify-center py-4">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-danger-600 hover:text-danger-700 dark:text-danger-400 dark:hover:text-danger-300"
        >
          <SafeIcon icon={FiLogOut} className="w-5 h-5" />
          <span>Sair da Conta</span>
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
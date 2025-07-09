import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDuration, calculateSoberDays } from '../utils/dateUtils';
import { getRandomMotivationalMessage } from '../utils/notifications';
import SafeIcon from '../components/common/SafeIcon';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import * as FiIcons from 'react-icons/fi';

const {
  FiCalendar,
  FiTrendingUp,
  FiHeart,
  FiTarget,
  FiAward,
  FiPlus,
  FiBook,
  FiBarChart3,
} = FiIcons;

const DashboardPage = () => {
  const [soberDays, setSoberDays] = useState(15);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [todayMood, setTodayMood] = useState(null);

  useEffect(() => {
    setMotivationalMessage(getRandomMotivationalMessage());
  }, []);

  const stats = [
    {
      icon: FiCalendar,
      label: 'Dias Sóbrios',
      value: soberDays,
      subtitle: formatDuration(soberDays),
      color: 'success',
    },
    {
      icon: FiHeart,
      label: 'Saúde Melhorada',
      value: '85%',
      subtitle: 'Baseado em seus registros',
      color: 'primary',
    },
    {
      icon: FiTarget,
      label: 'Meta Mensal',
      value: '12/30',
      subtitle: 'Dias sem consumo',
      color: 'warning',
    },
    {
      icon: FiAward,
      label: 'Conquistas',
      value: '7',
      subtitle: 'Badges desbloqueados',
      color: 'success',
    },
  ];

  const quickActions = [
    {
      icon: FiPlus,
      label: 'Registrar Dia',
      description: 'Marque seu progresso de hoje',
      action: () => console.log('Registrar dia'),
    },
    {
      icon: FiBook,
      label: 'Escrever no Diário',
      description: 'Anote seus sentimentos',
      action: () => console.log('Abrir diário'),
    },
    {
      icon: FiBarChart3,
      label: 'Ver Progresso',
      description: 'Analise sua evolução',
      action: () => console.log('Ver progresso'),
    },
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Ótimo', value: 5 },
    { emoji: '😌', label: 'Bem', value: 4 },
    { emoji: '😐', label: 'Normal', value: 3 },
    { emoji: '😔', label: 'Triste', value: 2 },
    { emoji: '😰', label: 'Ansioso', value: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Parabéns pelos {soberDays} dias! 🎉
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {motivationalMessage}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center">
              <SafeIcon
                icon={stat.icon}
                className={`w-12 h-12 mx-auto mb-4 text-${stat.color}-600`}
              />
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {stat.subtitle}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Ações Rápidas
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    fullWidth
                    className="h-auto p-6 flex-col space-y-3"
                    onClick={action.action}
                  >
                    <SafeIcon icon={action.icon} className="w-8 h-8 text-primary-600" />
                    <div className="text-center">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {action.label}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Today's Mood */}
        <div>
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Como você está hoje?
            </h2>
            <div className="space-y-3">
              {moodOptions.map((mood) => (
                <motion.button
                  key={mood.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTodayMood(mood.value)}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                    todayMood === mood.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mood.emoji}</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {mood.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            {todayMood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-success-50 dark:bg-success-900 rounded-lg"
              >
                <p className="text-success-700 dark:text-success-300 text-sm font-medium">
                  Humor registrado com sucesso! 👍
                </p>
              </motion.div>
            )}
          </Card>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Visão Geral do Progresso
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiTrendingUp} className="w-10 h-10 text-success-600" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Tendência Positiva
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Seu progresso tem sido consistente nas últimas semanas
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiTarget} className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Meta em Andamento
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Você está 40% próximo da sua meta mensal
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <SafeIcon icon={FiAward} className="w-10 h-10 text-warning-600" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">
              Próxima Conquista
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Faltam 15 dias para o badge "1 Mês Sóbrio"
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
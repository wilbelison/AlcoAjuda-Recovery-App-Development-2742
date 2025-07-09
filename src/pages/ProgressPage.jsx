import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { formatDate, formatDuration } from '../utils/dateUtils';
import SafeIcon from '../components/common/SafeIcon';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import * as FiIcons from 'react-icons/fi';

const {
  FiTrendingUp,
  FiCalendar,
  FiAward,
  FiTarget,
  FiBarChart3,
  FiPieChart,
} = FiIcons;

const ProgressPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');

  // Mock data
  const soberDays = 45;
  const totalSavings = 1350.50;
  const healthImprovement = 78;

  const achievements = [
    { id: 1, title: '7 Dias Sóbrio', icon: '🎯', earned: true, date: '2024-01-08' },
    { id: 2, title: '2 Semanas Sóbrio', icon: '⭐', earned: true, date: '2024-01-15' },
    { id: 3, title: '1 Mês Sóbrio', icon: '🏆', earned: true, date: '2024-01-22' },
    { id: 4, title: '2 Meses Sóbrio', icon: '💎', earned: false, date: null },
    { id: 5, title: '100 Dias Sóbrio', icon: '👑', earned: false, date: null },
  ];

  const moodData = {
    title: { text: 'Evolução do Humor' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
    },
    yAxis: { type: 'value', min: 1, max: 5 },
    series: [{
      name: 'Humor Médio',
      type: 'line',
      data: [2.5, 3.2, 3.8, 4.1, 4.3, 4.5],
      smooth: true,
      itemStyle: { color: '#0ea5e9' },
      areaStyle: { opacity: 0.3 },
    }],
  };

  const savingsData = {
    title: { text: 'Economia Financeira' },
    tooltip: { trigger: 'axis', formatter: 'R$ {c}' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    },
    yAxis: { type: 'value' },
    series: [{
      name: 'Economia',
      type: 'bar',
      data: [150, 280, 420, 680, 950, 1350],
      itemStyle: { color: '#22c55e' },
    }],
  };

  const healthData = {
    title: { text: 'Indicadores de Saúde' },
    tooltip: { trigger: 'item' },
    series: [{
      name: 'Saúde',
      type: 'pie',
      radius: '70%',
      data: [
        { value: 78, name: 'Melhorado', itemStyle: { color: '#22c55e' } },
        { value: 22, name: 'A melhorar', itemStyle: { color: '#f59e0b' } },
      ],
    }],
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: FiBarChart3 },
    { id: 'mood', label: 'Humor', icon: FiTrendingUp },
    { id: 'achievements', label: 'Conquistas', icon: FiAward },
    { id: 'health', label: 'Saúde', icon: FiTarget },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Seu Progresso
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Acompanhe sua evolução e conquistas
          </p>
        </div>
        <div className="flex space-x-3">
          {['week', 'month', 'year'].map(range => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === 'week' ? 'Semana' : range === 'month' ? 'Mês' : 'Ano'}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center">
            <SafeIcon icon={FiCalendar} className="w-12 h-12 text-success-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {soberDays}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
              Dias Sóbrios
            </p>
            <p className="text-sm text-gray-500">
              {formatDuration(soberDays)}
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="text-center">
            <SafeIcon icon={FiTarget} className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              R$ {totalSavings.toFixed(2)}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
              Economia Total
            </p>
            <p className="text-sm text-gray-500">
              Dinheiro não gasto em álcool
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="text-center">
            <SafeIcon icon={FiTrendingUp} className="w-12 h-12 text-warning-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {healthImprovement}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
              Melhoria na Saúde
            </p>
            <p className="text-sm text-gray-500">
              Baseado em seus registros
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <ReactECharts option={moodData} style={{ height: '300px' }} />
            </Card>
            <Card>
              <ReactECharts option={savingsData} style={{ height: '300px' }} />
            </Card>
          </div>
        )}

        {activeTab === 'mood' && (
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Evolução do Humor
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Acompanhe como seu humor tem melhorado ao longo do tempo
              </p>
            </div>
            <ReactECharts option={moodData} style={{ height: '400px' }} />
          </Card>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`text-center ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-success-50 to-primary-50 dark:from-success-900 dark:to-primary-900 border-success-200 dark:border-success-700' 
                    : 'opacity-50'
                }`}>
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {achievement.title}
                  </h3>
                  {achievement.earned ? (
                    <div>
                      <p className="text-success-600 dark:text-success-400 font-medium mb-1">
                        Conquistado! 🎉
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(achievement.date)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Em progresso...
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'health' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <ReactECharts option={healthData} style={{ height: '300px' }} />
            </Card>
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Benefícios da Sobriedade
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Melhoria no sono (85% melhor)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Redução da ansiedade (70% melhor)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Aumento da energia (90% melhor)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Concentração (em melhoria)
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProgressPage;
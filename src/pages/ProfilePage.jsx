import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../components/common/SafeIcon';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import * as FiIcons from 'react-icons/fi';

const {
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit3,
  FiLock,
  FiSave,
  FiX,
  FiCamera,
  FiActivity,
  FiAward,
  FiHeart,
} = FiIcons;

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || 'Usuário',
    email: user?.email || 'usuario@example.com',
    gender: user?.user_metadata?.gender || 'male',
    birthDate: '1990-01-01',
    weight: user?.user_metadata?.weight || 70,
    height: user?.user_metadata?.height || 170,
    goal: user?.user_metadata?.goal || 'reduce',
    bio: 'Em busca de uma vida mais saudável e equilibrada. Apaixonado por esportes e leitura.',
    phone: '(11) 98765-4321',
    emergencyContact: 'Maria (Irmã) - (11) 91234-5678',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const achievements = [
    { id: 1, title: '7 Dias Sóbrio', icon: '🎯', date: '08/01/2024', description: 'Completou uma semana sem consumo de álcool.' },
    { id: 2, title: '2 Semanas Sóbrio', icon: '⭐', date: '15/01/2024', description: 'Manteve-se sóbrio por duas semanas consecutivas.' },
    { id: 3, title: '1 Mês Sóbrio', icon: '🏆', date: '22/01/2024', description: 'Completou um mês inteiro sem consumir álcool.' },
    { id: 4, title: 'Diário Consistente', icon: '📝', date: '25/01/2024', description: 'Registrou entradas no diário por 10 dias consecutivos.' },
    { id: 5, title: 'Primeira Consulta', icon: '🩺', date: '20/01/2024', description: 'Compareceu à primeira consulta de acompanhamento.' },
  ];
  
  const healthMetrics = [
    { id: 1, name: 'Pressão Arterial', value: '120/80', status: 'normal', date: '25/01/2024' },
    { id: 2, name: 'Frequência Cardíaca', value: '68 bpm', status: 'normal', date: '25/01/2024' },
    { id: 3, name: 'Qualidade do Sono', value: '7.5/10', status: 'good', date: '25/01/2024' },
    { id: 4, name: 'Nível de Energia', value: '8/10', status: 'good', date: '25/01/2024' },
    { id: 5, name: 'Nível de Ansiedade', value: '3/10', status: 'good', date: '25/01/2024' },
  ];
  
  const handleProfileUpdate = () => {
    // Here you would typically update the profile in the database
    console.log('Profile updated:', profile);
    setIsEditing(false);
  };
  
  const handlePasswordUpdate = () => {
    // Here you would typically update the password in the authentication system
    console.log('Password update requested:', passwordForm);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'primary';
      case 'good': return 'success';
      case 'warning': return 'warning';
      case 'bad': return 'danger';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Perfil do Usuário
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie suas informações pessoais e de saúde
          </p>
        </div>
        
        {activeTab === 'profile' && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2"
          >
            <SafeIcon icon={FiEdit3} className="w-5 h-5" />
            <span>Editar Perfil</span>
          </Button>
        )}
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'profile'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <SafeIcon icon={FiUser} className="w-5 h-5" />
            <span>Perfil</span>
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'security'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <SafeIcon icon={FiLock} className="w-5 h-5" />
            <span>Segurança</span>
          </button>
          
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'achievements'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <SafeIcon icon={FiAward} className="w-5 h-5" />
            <span>Conquistas</span>
          </button>
          
          <button
            onClick={() => setActiveTab('health')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'health'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <SafeIcon icon={FiHeart} className="w-5 h-5" />
            <span>Saúde</span>
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <div className="flex flex-col md:flex-row md:items-start">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center overflow-hidden">
                    <div className="text-5xl">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                      <SafeIcon icon={FiCamera} className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {!isEditing && (
                  <div className="mt-4 text-center">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {profile.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Membro desde {new Date(user?.created_at || '2024').getFullYear()}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Profile Information */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nome Completo
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          E-mail
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          disabled
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Telefone
                        </label>
                        <input
                          type="text"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Data de Nascimento
                        </label>
                        <input
                          type="date"
                          value={profile.birthDate}
                          onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Sexo
                        </label>
                        <select
                          value={profile.gender}
                          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="male">Masculino</option>
                          <option value="female">Feminino</option>
                          <option value="other">Outro</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Contato de Emergência
                        </label>
                        <input
                          type="text"
                          value={profile.emergencyContact}
                          onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Peso (kg)
                        </label>
                        <input
                          type="number"
                          value={profile.weight}
                          onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Altura (cm)
                        </label>
                        <input
                          type="number"
                          value={profile.height}
                          onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Objetivo
                        </label>
                        <select
                          value={profile.goal}
                          onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="reduce">Reduzir o consumo</option>
                          <option value="stop">Parar completamente</option>
                          <option value="control">Melhorar o autocontrole</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sobre Mim
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleProfileUpdate}
                        className="flex items-center space-x-2"
                      >
                        <SafeIcon icon={FiSave} className="w-5 h-5" />
                        <span>Salvar Alterações</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Informações Pessoais
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          E-mail
                        </h3>
                        <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                          <SafeIcon icon={FiMail} className="w-4 h-4 mr-2 text-gray-400" />
                          {profile.email}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Telefone
                        </h3>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {profile.phone}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Data de Nascimento
                        </h3>
                        <p className="mt-1 text-gray-900 dark:text-white flex items-center">
                          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(profile.birthDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Sexo
                        </h3>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {profile.gender === 'male' ? 'Masculino' : profile.gender === 'female' ? 'Feminino' : 'Outro'}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Contato de Emergência
                        </h3>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {profile.emergencyContact}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Peso e Altura
                        </h3>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {profile.weight} kg • {profile.height} cm
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Objetivo
                        </h3>
                        <p className="mt-1 text-gray-900 dark:text-white">
                          {profile.goal === 'reduce' ? 'Reduzir o consumo' : 
                            profile.goal === 'stop' ? 'Parar completamente' : 'Melhorar o autocontrole'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Sobre Mim
                      </h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {profile.bio}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
        
        {/* Security Tab */}
        {activeTab === 'security' && (
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Alterar Senha
            </h2>
            
            <div className="space-y-6 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  A senha deve ter pelo menos 8 caracteres e incluir letras e números.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <Button
                onClick={handlePasswordUpdate}
                disabled={
                  !passwordForm.currentPassword || 
                  !passwordForm.newPassword || 
                  !passwordForm.confirmPassword ||
                  passwordForm.newPassword !== passwordForm.confirmPassword
                }
              >
                Atualizar Senha
              </Button>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Privacidade e Dados
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Notificações por E-mail
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receber e-mails sobre atualizações e lembretes
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      className="opacity-0 w-0 h-0"
                      defaultChecked
                    />
                    <label
                      htmlFor="emailNotifications"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Compartilhar Dados Anônimos
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Contribuir com dados anônimos para pesquisas
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="shareData"
                      className="opacity-0 w-0 h-0"
                    />
                    <label
                      htmlFor="shareData"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Notificações Push
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receber alertas e lembretes no dispositivo
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      id="pushNotifications"
                      className="opacity-0 w-0 h-0"
                      defaultChecked
                    />
                    <label
                      htmlFor="pushNotifications"
                      className="block absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 peer-checked:before:translate-x-6 peer-checked:bg-primary-500"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{achievement.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Conquistado em {achievement.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {/* Health Tab */}
        {activeTab === 'health' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Métricas de Saúde
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Métrica
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {healthMetrics.map((metric) => (
                      <tr key={metric.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {metric.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {metric.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full bg-${getStatusColor(metric.status)}-100 text-${getStatusColor(metric.status)}-700 dark:bg-${getStatusColor(metric.status)}-900 dark:text-${getStatusColor(metric.status)}-300`}>
                            {metric.status === 'normal' ? 'Normal' : 
                             metric.status === 'good' ? 'Bom' : 
                             metric.status === 'warning' ? 'Atenção' : 'Ruim'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {metric.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <SafeIcon icon={FiActivity} className="w-5 h-5" />
                  <span>Adicionar Nova Medição</span>
                </Button>
              </div>
            </Card>
            
            <Card>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Histórico de Saúde
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="min-w-[80px] text-center">
                    <div className="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-lg py-2 px-3">
                      <div className="text-sm">JAN</div>
                      <div className="text-xl font-bold">15</div>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Consulta Inicial - Dr. Silva
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Avaliação geral de saúde. Exames de sangue solicitados para verificar função hepática.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 dark:border-gray-800 my-4"></div>
                
                <div className="flex items-start">
                  <div className="min-w-[80px] text-center">
                    <div className="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-lg py-2 px-3">
                      <div className="text-sm">JAN</div>
                      <div className="text-xl font-bold">22</div>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Resultados de Exames
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Resultados de exames indicaram leve elevação nas enzimas hepáticas. Recomendação para abstinência total de álcool.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 dark:border-gray-800 my-4"></div>
                
                <div className="flex items-start">
                  <div className="min-w-[80px] text-center">
                    <div className="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-lg py-2 px-3">
                      <div className="text-sm">FEV</div>
                      <div className="text-xl font-bold">05</div>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Consulta de Acompanhamento
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Melhora significativa após 3 semanas de abstinência. Padrão de sono melhorou, níveis de energia aumentaram.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                >
                  Ver Histórico Completo
                </Button>
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
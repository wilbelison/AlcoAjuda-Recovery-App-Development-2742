import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/dateUtils';
import SafeIcon from '../components/common/SafeIcon';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import * as FiIcons from 'react-icons/fi';

const {
  FiPlus,
  FiCalendar,
  FiClock,
  FiUser,
  FiPhone,
  FiVideo,
  FiMapPin,
  FiEdit3,
  FiTrash2,
  FiCheck,
  FiX,
} = FiIcons;

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: 'consultation',
      title: 'Consulta com Dr. Silva',
      doctor: 'Dr. João Silva',
      specialty: 'Psiquiatra',
      date: new Date('2024-01-20T14:00:00'),
      duration: 60,
      mode: 'presencial',
      location: 'Clínica Esperança - Sala 205',
      status: 'scheduled',
      notes: 'Consulta de acompanhamento mensal',
    },
    {
      id: 2,
      type: 'therapy',
      title: 'Sessão de Terapia',
      doctor: 'Dra. Maria Santos',
      specialty: 'Psicóloga',
      date: new Date('2024-01-22T16:30:00'),
      duration: 50,
      mode: 'online',
      location: 'Videochamada',
      status: 'scheduled',
      notes: 'Terapia cognitivo-comportamental',
    },
    {
      id: 3,
      type: 'group',
      title: 'Grupo de Apoio',
      doctor: 'Facilitador: Carlos Lima',
      specialty: 'Terapeuta',
      date: new Date('2024-01-15T18:00:00'),
      duration: 90,
      mode: 'presencial',
      location: 'Centro Comunitário - Sala A',
      status: 'completed',
      notes: 'Reunião semanal do grupo de apoio',
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    duration: 60,
    mode: 'presencial',
    location: '',
    notes: '',
  });

  const appointmentTypes = [
    { value: 'consultation', label: 'Consulta Médica', icon: FiUser },
    { value: 'therapy', label: 'Terapia', icon: FiUser },
    { value: 'group', label: 'Grupo de Apoio', icon: FiUser },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'scheduled': return 'Agendado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const handleCreateAppointment = () => {
    const appointment = {
      id: Date.now(),
      type: 'consultation',
      title: newAppointment.title,
      doctor: newAppointment.doctor,
      specialty: newAppointment.specialty,
      date: new Date(`${newAppointment.date}T${newAppointment.time}`),
      duration: newAppointment.duration,
      mode: newAppointment.mode,
      location: newAppointment.location,
      status: 'scheduled',
      notes: newAppointment.notes,
    };

    setAppointments([appointment, ...appointments]);
    setIsCreating(false);
    setNewAppointment({
      title: '',
      doctor: '',
      specialty: '',
      date: '',
      time: '',
      duration: 60,
      mode: 'presencial',
      location: '',
      notes: '',
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'scheduled' && apt.date > new Date()
  );
  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || apt.date < new Date()
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Consultas e Terapias
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gerencie seus compromissos de saúde
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Agendar Consulta</span>
        </Button>
      </div>

      {/* Create Appointment Form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Agendar Nova Consulta
              </h2>
              <Button
                variant="ghost"
                onClick={() => setIsCreating(false)}
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título da Consulta
                </label>
                <input
                  type="text"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Consulta com Dr. Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profissional
                </label>
                <input
                  type="text"
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Nome do médico/terapeuta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Especialidade
                </label>
                <input
                  type="text"
                  value={newAppointment.specialty}
                  onChange={(e) => setNewAppointment({ ...newAppointment, specialty: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Psiquiatra, Psicólogo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Modalidade
                </label>
                <select
                  value={newAppointment.mode}
                  onChange={(e) => setNewAppointment({ ...newAppointment, mode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="presencial">Presencial</option>
                  <option value="online">Online</option>
                  <option value="telefone">Telefone</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Horário
                </label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Local/Link
                </label>
                <input
                  type="text"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder={newAppointment.mode === 'online' ? 'Link da videochamada' : 'Endereço da consulta'}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Observações
                </label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Observações importantes sobre a consulta"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsCreating(false)}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateAppointment}
              >
                Agendar
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Próximas Consultas
        </h2>
        
        <div className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className={`w-full md:w-2 bg-${getStatusColor(appointment.status)}-500`}></div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {appointment.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {appointment.doctor} • {appointment.specialty}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'completed')}
                          className="text-success-600"
                        >
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                          className="text-danger-600"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                        <span>{formatDate(appointment.date, 'dd/MM/yyyy')}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                        <span>
                          {formatDate(appointment.date, 'HH:mm')} • {appointment.duration} min
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        {appointment.mode === 'online' ? (
                          <SafeIcon icon={FiVideo} className="w-4 h-4 mr-2" />
                        ) : appointment.mode === 'telefone' ? (
                          <SafeIcon icon={FiPhone} className="w-4 h-4 mr-2" />
                        ) : (
                          <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2" />
                        )}
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <p>{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="text-center py-8">
              <SafeIcon icon={FiCalendar} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Nenhuma consulta agendada
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Você não possui consultas ou terapias agendadas
              </p>
              <Button onClick={() => setIsCreating(true)}>
                Agendar Consulta
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Histórico de Consultas
          </h2>
          
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-0 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className={`w-full md:w-2 bg-${getStatusColor(appointment.status)}-500`}></div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                            {appointment.title}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full bg-${getStatusColor(appointment.status)}-100 text-${getStatusColor(appointment.status)}-700 dark:bg-${getStatusColor(appointment.status)}-900 dark:text-${getStatusColor(appointment.status)}-300`}>
                            {getStatusLabel(appointment.status)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {appointment.doctor} • {appointment.specialty}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
                        <span>{formatDate(appointment.date, 'dd/MM/yyyy')}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-2" />
                        <span>
                          {formatDate(appointment.date, 'HH:mm')} • {appointment.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
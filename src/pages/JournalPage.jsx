import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate, formatDateRelative } from '../utils/dateUtils';
import SafeIcon from '../components/common/SafeIcon';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import * as FiIcons from 'react-icons/fi';

const {
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiCalendar,
  FiHeart,
  FiSave,
  FiX,
} = FiIcons;

const JournalPage = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: new Date('2024-01-15'),
      mood: 4,
      content: 'Hoje foi um dia desafiador, mas consegui manter meu compromisso. Senti-me orgulhoso da minha determinação.',
      triggers: ['stress', 'trabalho'],
      emotions: ['orgulho', 'determinação'],
    },
    {
      id: 2,
      date: new Date('2024-01-14'),
      mood: 3,
      content: 'Dia normal. Fiz exercícios pela manhã e isso me ajudou muito com a ansiedade.',
      triggers: ['ansiedade'],
      emotions: ['calma', 'satisfação'],
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    content: '',
    mood: 3,
    triggers: [],
    emotions: [],
  });

  const moodEmojis = {
    1: '😰',
    2: '😔',
    3: '😐',
    4: '😌',
    5: '😊',
  };

  const moodLabels = {
    1: 'Muito difícil',
    2: 'Difícil',
    3: 'Normal',
    4: 'Bem',
    5: 'Ótimo',
  };

  const commonTriggers = [
    'stress', 'trabalho', 'família', 'solidão', 'ansiedade', 'tédio',
    'celebração', 'pressão social', 'cansaço', 'conflitos'
  ];

  const commonEmotions = [
    'orgulho', 'determinação', 'calma', 'satisfação', 'esperança',
    'gratidão', 'confiança', 'paz', 'alegria', 'força'
  ];

  const handleSaveEntry = () => {
    if (editingEntry) {
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...editingEntry, ...newEntry }
          : entry
      ));
    } else {
      const entry = {
        id: Date.now(),
        date: new Date(),
        ...newEntry,
      };
      setEntries([entry, ...entries]);
    }
    
    setIsEditing(false);
    setEditingEntry(null);
    setNewEntry({
      content: '',
      mood: 3,
      triggers: [],
      emotions: [],
    });
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setNewEntry({
      content: entry.content,
      mood: entry.mood,
      triggers: entry.triggers,
      emotions: entry.emotions,
    });
    setIsEditing(true);
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const toggleTag = (tag, type) => {
    const field = type === 'trigger' ? 'triggers' : 'emotions';
    const current = newEntry[field];
    const updated = current.includes(tag)
      ? current.filter(t => t !== tag)
      : [...current, tag];
    
    setNewEntry({ ...newEntry, [field]: updated });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Diário Pessoal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Registre seus sentimentos e reflexões diárias
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Nova Entrada</span>
        </Button>
      </div>

      {/* New/Edit Entry Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingEntry ? 'Editar Entrada' : 'Nova Entrada'}
              </h2>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setEditingEntry(null);
                  setNewEntry({
                    content: '',
                    mood: 3,
                    triggers: [],
                    emotions: [],
                  });
                }}
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Como você se sente hoje?
                </label>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map(mood => (
                    <button
                      key={mood}
                      onClick={() => setNewEntry({ ...newEntry, mood })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        newEntry.mood === mood
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl block">{moodEmojis[mood]}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {moodLabels[mood]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Como foi seu dia?
                </label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Escreva sobre seus sentimentos, desafios, conquistas..."
                />
              </div>

              {/* Triggers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Gatilhos ou Desafios
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonTriggers.map(trigger => (
                    <button
                      key={trigger}
                      onClick={() => toggleTag(trigger, 'trigger')}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        newEntry.triggers.includes(trigger)
                          ? 'bg-warning-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {trigger}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emotions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Emoções Positivas
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonEmotions.map(emotion => (
                    <button
                      key={emotion}
                      onClick={() => toggleTag(emotion, 'emotion')}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        newEntry.emotions.includes(emotion)
                          ? 'bg-success-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button onClick={handleSaveEntry} className="flex items-center space-x-2">
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Salvar</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingEntry(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Entries List */}
      <div className="space-y-6">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{moodEmojis[entry.mood]}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {formatDateRelative(entry.date)}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(entry.date, 'EEEE, dd \'de\' MMMM \'de\' yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditEntry(entry)}
                  >
                    <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-danger-600 hover:bg-danger-50"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {entry.content}
              </p>

              {(entry.triggers.length > 0 || entry.emotions.length > 0) && (
                <div className="space-y-3">
                  {entry.triggers.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                        Gatilhos:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {entry.triggers.map(trigger => (
                          <span
                            key={trigger}
                            className="px-2 py-1 bg-warning-100 dark:bg-warning-900 text-warning-700 dark:text-warning-300 text-xs rounded-full"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.emotions.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                        Emoções:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {entry.emotions.map(emotion => (
                          <span
                            key={emotion}
                            className="px-2 py-1 bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 text-xs rounded-full"
                          >
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {entries.length === 0 && !isEditing && (
        <Card className="text-center py-12">
          <SafeIcon icon={FiHeart} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Seu diário está vazio
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Comece registrando como você se sente hoje
          </p>
          <Button onClick={() => setIsEditing(true)}>
            Criar primeira entrada
          </Button>
        </Card>
      )}
    </div>
  );
};

export default JournalPage;
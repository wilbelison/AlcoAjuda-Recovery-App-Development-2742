import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import * as LucideIcons from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  const features = [
    {
      icon: <LucideIcons.TrendingUp className="w-12 h-12 text-primary-600" />,
      title: 'Acompanhe seu Progresso',
      description: 'Visualize sua jornada com gráficos detalhados e marcos importantes.',
    },
    {
      icon: <LucideIcons.Shield className="w-12 h-12 text-primary-600" />,
      title: 'Dados Seguros',
      description: 'Suas informações são protegidas com criptografia de ponta.',
    },
    {
      icon: <LucideIcons.Users className="w-12 h-12 text-primary-600" />,
      title: 'Suporte Profissional',
      description: 'Conecte-se com profissionais de saúde especializados.',
    },
  ];

  const benefits = [
    'Registro diário simplificado',
    'Calculadora de álcool no sangue',
    'Lembretes personalizados',
    'Diário de sentimentos',
    'Gamificação motivacional',
    'Conteúdo educativo',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-success-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <LucideIcons.BeerOff className="w-16 h-16 text-primary-600 mx-auto mb-6" />
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
                Zero Alcool
              </h1>
              <p className="text-xl md:text-2xl text-primary-600 dark:text-primary-400 font-medium mb-8">
                Transforme Seu Amanhã, Um Dia de Cada Vez
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                Uma plataforma completa para apoiar sua jornada de redução ou cessação do consumo de álcool,
                com ferramentas profissionais, acompanhamento personalizado e suporte especializado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-4">
                  Comece Agora
                  <LucideIcons.ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Já tenho conta
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Por que escolher o Zero Alcool?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Uma abordagem científica e humana para sua transformação pessoal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="mx-auto mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Funcionalidades Completas
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <LucideIcons.Check className="w-5 h-5 text-success-600 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-primary-600 to-success-600 rounded-2xl p-8 text-white"
            >
              <h4 className="text-2xl font-bold mb-4">Comece Hoje Mesmo</h4>
              <p className="mb-6 opacity-90">
                Junte-se a milhares de pessoas que já transformaram suas vidas com o Zero Alcool.
                Sua jornada de transformação começa com um simples clique.
              </p>
              <Link to="/register">
                <Button variant="secondary" size="lg" fullWidth>
                  Criar Conta Gratuita
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
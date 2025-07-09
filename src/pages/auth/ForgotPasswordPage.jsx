import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import * as LucideIcons from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ForgotPasswordPage = () => {
  const { resetPassword, loading, authError } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const result = await resetPassword(data.email);
    if (!result.error) {
      setEmailSent(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow bg-gradient-to-br from-primary-50 to-success-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <LucideIcons.BeerOff className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Recuperar Senha
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Digite seu e-mail para receber as instruções de recuperação
            </p>
          </div>

          <Card>
            {authError && (
              <div className="mb-4 p-3 bg-danger-100 border border-danger-200 text-danger-700 rounded-lg">
                <p className="flex items-center">
                  <LucideIcons.AlertCircle className="w-5 h-5 mr-2" />
                  <span>{authError}</span>
                </p>
              </div>
            )}
            
            {emailSent ? (
              <div className="text-center py-6">
                <LucideIcons.CheckCircle className="w-16 h-16 text-success-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  E-mail Enviado!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                </p>
                <Link to="/login">
                  <Button variant="outline" fullWidth>
                    Voltar para o Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <LucideIcons.Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'E-mail é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'E-mail inválido',
                        },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>
                  )}
                </div>

                <Button type="submit" loading={loading} fullWidth size="lg">
                  Enviar Instruções
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
              >
                <LucideIcons.ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
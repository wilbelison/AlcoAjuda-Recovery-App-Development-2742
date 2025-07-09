import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/dateUtils';
import SafeIcon from '../components/common/SafeIcon';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import * as FiIcons from 'react-icons/fi';

const {
  FiSearch,
  FiBookmark,
  FiClock,
  FiHeart,
  FiMessageSquare,
  FiShare2,
} = FiIcons;

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'recovery', label: 'Recuperação' },
    { id: 'health', label: 'Saúde' },
    { id: 'motivation', label: 'Motivação' },
    { id: 'stories', label: 'Histórias' },
    { id: 'science', label: 'Ciência' },
  ];
  
  const articles = [
    {
      id: 1,
      title: 'Como o álcool afeta seu cérebro a longo prazo',
      excerpt: 'Estudos recentes mostram os efeitos do consumo prolongado de álcool no cérebro e como a recuperação é possível após a abstinência.',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: 'Dra. Amanda Silva',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      date: new Date('2024-01-15'),
      readTime: 8,
      category: 'science',
      featured: true,
      saved: false,
    },
    {
      id: 2,
      title: 'Minha jornada de 1 ano sem álcool',
      excerpt: 'Um relato pessoal sobre como superar a dependência e reconstruir a vida após um ano de sobriedade.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: 'Carlos Mendes',
      authorImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      date: new Date('2024-01-10'),
      readTime: 12,
      category: 'stories',
      featured: false,
      saved: true,
    },
    {
      id: 3,
      title: '5 exercícios para controlar a ansiedade sem recorrer ao álcool',
      excerpt: 'Técnicas práticas de respiração e mindfulness que podem ajudar a gerenciar a ansiedade e reduzir o desejo de beber.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: 'Juliana Costa',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      date: new Date('2024-01-05'),
      readTime: 6,
      category: 'health',
      featured: false,
      saved: false,
    },
    {
      id: 4,
      title: 'Benefícios da abstinência: o que muda no seu corpo',
      excerpt: 'Um guia completo sobre as melhorias físicas e mentais que ocorrem quando você para de beber, desde o primeiro dia até o primeiro ano.',
      image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Ricardo Alves',
      authorImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      date: new Date('2024-01-02'),
      readTime: 10,
      category: 'health',
      featured: false,
      saved: false,
    },
    {
      id: 5,
      title: 'Como encontrar motivação nos dias difíceis',
      excerpt: 'Estratégias para manter-se motivado durante sua jornada de recuperação, mesmo quando os desafios parecem insuperáveis.',
      image: 'https://images.unsplash.com/photo-1543157145-f78c636d023d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: 'Mariana Souza',
      authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      date: new Date('2023-12-28'),
      readTime: 7,
      category: 'motivation',
      featured: false,
      saved: true,
    },
  ];
  
  const [savedArticles, setSavedArticles] = useState(
    articles.filter(article => article.saved).map(article => article.id)
  );
  
  const toggleSaved = (id) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(articleId => articleId !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const featuredArticle = articles.find(article => article.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Blog e Conteúdo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Artigos, dicas e histórias para apoiar sua jornada
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SafeIcon
            icon={FiSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar artigos..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap mx-1 transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Article */}
      {featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto bg-gray-200 dark:bg-gray-700">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-full text-sm font-medium">
                    Destaque
                  </span>
                  <button
                    onClick={() => toggleSaved(featuredArticle.id)}
                    className={`p-2 rounded-full ${
                      savedArticles.includes(featuredArticle.id)
                        ? 'text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900'
                        : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <SafeIcon icon={FiBookmark} className="w-5 h-5" />
                  </button>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 my-4 flex-grow">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <img
                      src={featuredArticle.authorImage}
                      alt={featuredArticle.author}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {featuredArticle.author}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{formatDate(featuredArticle.date)}</span>
                        <span className="mx-2">•</span>
                        <SafeIcon icon={FiClock} className="w-4 h-4 mr-1" />
                        <span>{featuredArticle.readTime} min de leitura</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button>Ler Artigo</Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-0 overflow-hidden h-full flex flex-col">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleSaved(article.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm ${
                    savedArticles.includes(article.id)
                      ? 'text-primary-600'
                      : 'text-gray-500'
                  }`}
                >
                  <SafeIcon icon={FiBookmark} className="w-5 h-5" />
                </button>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-1 bg-gray-900 bg-opacity-70 text-white rounded-lg text-xs">
                    {categories.find(c => c.id === article.category)?.label}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <img
                      src={article.authorImage}
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {article.author}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <SafeIcon icon={FiClock} className="w-3 h-3 mr-1" />
                        <span>{article.readTime} min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <SafeIcon icon={FiHeart} className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <SafeIcon icon={FiShare2} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <Card className="text-center py-12">
          <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Nenhum artigo encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tente ajustar seus filtros ou termos de pesquisa
          </p>
          <Button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
            Limpar Filtros
          </Button>
        </Card>
      )}
    </div>
  );
};

export default BlogPage;
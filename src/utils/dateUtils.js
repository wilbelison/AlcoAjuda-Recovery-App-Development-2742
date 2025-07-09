import { format, differenceInDays, isToday, isYesterday, startOfWeek, endOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date, pattern = 'dd/MM/yyyy') => {
  return format(new Date(date), pattern, { locale: ptBR });
};

export const formatDateRelative = (date) => {
  const targetDate = new Date(date);
  
  if (isToday(targetDate)) return 'Hoje';
  if (isYesterday(targetDate)) return 'Ontem';
  
  return formatDate(targetDate, 'dd/MM');
};

export const calculateSoberDays = (startDate) => {
  if (!startDate) return 0;
  return differenceInDays(new Date(), new Date(startDate));
};

export const getWeekRange = (date = new Date()) => {
  return {
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  };
};

export const formatDuration = (days) => {
  if (days === 0) return 'Hoje é o primeiro dia!';
  if (days === 1) return '1 dia';
  if (days < 7) return `${days} dias`;
  
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  
  let result = '';
  if (weeks === 1) result += '1 semana';
  else if (weeks > 1) result += `${weeks} semanas`;
  
  if (remainingDays > 0) {
    if (result) result += ' e ';
    result += `${remainingDays} dia${remainingDays > 1 ? 's' : ''}`;
  }
  
  return result;
};
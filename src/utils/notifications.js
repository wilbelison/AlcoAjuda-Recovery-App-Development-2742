// Notification utilities for reminders and motivational messages

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    return new Notification(title, {
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      ...options,
    });
  }
};

export const scheduleReminder = (title, message, time) => {
  const now = new Date();
  const scheduledTime = new Date(time);
  const delay = scheduledTime.getTime() - now.getTime();

  if (delay > 0) {
    setTimeout(() => {
      showNotification(title, {
        body: message,
        tag: 'reminder',
      });
    }, delay);
  }
};

export const motivationalMessages = [
  "Cada dia sóbrio é uma vitória! 🎉",
  "Você está mais forte do que imagina! 💪",
  "Um dia de cada vez, você consegue! ⭐",
  "Sua jornada inspira outros! 🌟",
  "Cuidar de si mesmo é um ato de coragem! 🦋",
  "Você merece uma vida plena e saudável! 🌈",
  "Cada escolha consciente conta! ✨",
  "Sua determinação é admirável! 🏆",
];

export const getRandomMotivationalMessage = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};
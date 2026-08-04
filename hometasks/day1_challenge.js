"use strict";
// Наш "защищенный" конфиг
const authConfig = {
  stage: 'STAGE-1',
  credentials: {
    admin: 'admin_user',
    password: 'super_secret_password'
  }
};

// Замораживаем и верхний уровень, и вложенный!
Object.freeze(authConfig);
Object.freeze(authConfig.credentials); 

// Функция, которая имитирует тест, где неопытный тестировщик
// попытался локально поменять пароль для своего конкретного теста.
function juniorTestSession() {
  console.log('--- Джуниор запускает свой тест ---');
  
  // Джуниор пытается поменять стенд целиком (вызовет ли это ошибку?)
  try {
    authConfig = { stage: 'LOCAL-DEV' }; 
  } catch (error) {
    console.log('❌ Ошибка при попытке заменить authConfig целиком!');
  }

  // Джуниор решает поменять только пароль для своего теста
  try {
    authConfig.credentials.password = '12345';
    console.log('🔑 Пароль успешно изменен джуниором на "12345"');
  } catch (error) {
    console.log('❌ Не удалось изменить пароль!');
  }
}

// Функция, которая имитирует ваш критически важный тест, 
// который должен идти СЛЕДУЮЩИМ на чистом STAGE-1 стенде.
function seniorCriticalTest() {
  console.log('\n--- Сеньор запускает критический тест ---');
  console.log('Текущий стенд: ' + authConfig.stage);
  console.log('Пароль администратора в конфиге: ' + authConfig.credentials.password);
  
  if (authConfig.credentials.password === 'super_secret_password') {
    console.log('✅ ТЕСТ ПРОЙДЕН: Конфиг в безопасности!');
  } else {
    console.log('💥 ТЕСТ УПАЛ! Конфиг был испорчен предыдущим тестом!');
  }
}

// Запуск нашей "тестовой сессии"
juniorTestSession();
seniorCriticalTest();
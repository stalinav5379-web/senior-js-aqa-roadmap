"use strict";

// Наш универсальный клиент (сервис отправки запросов)
class ApiClient {
  constructor() {
    this.baseUrl = "https://api.test-app.com";
    // Обратите внимание: у самого ApiClient НЕТ свойства token!
  }

  // Обычный метод отправки GET запроса
  sendGetRequest(endpoint) {
    // Метод ожидает, что в его контексте 'this' будет лежать свойство token!
    if (!this || !this.token) {
      throw new Error("💥 Ошибка безопасности! Запрос отклонен: Отсутствует токен авторизации!");
    }
    
    console.log(`📡 [API] Запрос отправлен на: ${this.baseUrl || "https://api.test-app.com"}${endpoint}`);
    console.log(`🔑 [AUTH] Использован токен: "${this.token}"`);
    return { status: 200, success: true };
  }
}

// Наши пользователи (хранители токенов)
const adminUser = {
  name: "Администратор",
  token: "SUPER-ADMIN-SECRET-TOKEN-123"
};

const guestUser = {
  name: "Гость",
  token: "GUEST-TOKEN-ABC-999"
};

// Создаем экземпляр нашего клиента
const client = new ApiClient();

// === ТЕСТОВЫЕ СЦЕНАРИИ (Ваша задача — запустить их успешно) ===

console.log("--- Сценарий 1: Запрос от лица Админа (Используем метод .call) ---");
try {
  // 💻 ЗАДАЧА 1: 
  // Вызовите метод client.sendGetRequest мгновенно, но так, чтобы 'this' 
  // внутри него указывал на объект 'adminUser'.
  // Подсказка: Используйте метод .call(). 
  // Синтаксис: функция.call(новый_контекст, аргумент1, аргумент2...)
  
  let response; // = ... ваш код ...
  response = client.sendGetRequest.call(adminUser, 'endpoint');
  
} catch (error) {
  console.log(error.message);
}


console.log("\n--- Сценарий 2: Создание выделенного клиента для Гостя (Используем метод .bind) ---");
try {
  // 💻 ЗАДАЧА 2:
  // Представьте, что нам нужно сделать много запросов от лица Гостя.
  // Мы не хотим каждый раз писать .call(). Мы хотим один раз создать
  // готовую функцию 'sendGuestRequest', которая ВСЕГДА будет делать запросы с токеном гостя.
  // Подсказка: Используйте метод .bind() для создания такой функции на основе client.sendGetRequest.
  // Синтаксис: const новая_функция = функция.bind(новый_контекст)
  
  const sendGuestRequest = (endpoint) => {
    const request = client.sendGetRequest.bind(guestUser);
    request(endpoint);
  }; // = ... ваш код ...
  
  // Вызываем созданную функцию напрямую (она должна отработать успешно!)
  sendGuestRequest("/products");
  sendGuestRequest("/catalog");
  
} catch (error) {
  console.log(error.message);
}
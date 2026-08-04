"use strict";

// Имитируем браузерное окружение для теста
const browser = {
  clickElement(selector) {
    console.log(`🌐 [Браузер] Клик по элементу на странице: ${selector}`);
  }
};

// === КЛАСС, КОТОРЫЙ НУЖНО ИСПРАВИТЬ ===
class Button {
  constructor(name, selector) {
    this.name = name;
    this.selector = selector;
  }

  // Данный метод сейчас написан как Regular Function.
  // При передаче в качестве коллбека он теряет свой 'this'.
  click() {
    console.log(`🖱️ [Фреймворк] Попытка кликнуть по кнопке: "${this.name}"`);
    browser.clickElement(this.selector);
  }
}

// === СЕНАРИЙ ИСПОЛЬЗОВАНИЯ (Симулируем работу тест-раннера) ===

const loginButton = new Button("Войти", "#submit-login-btn");

// Имитируем тест-раннер, который принимает функцию-шаг и запускает её асинхронно
function runTestStep(stepCallback) {
  console.log("🏃‍♂️ [Тест-раннер] Запуск шага теста...");
  try {
    stepCallback(); // Запуск переданного коллбека
  } catch (error) {
    console.log("💥 [Тест-раннер] Шаг упал с ошибкой!");
    console.log(error.message);
  }
}

// Передаем метод клика в тест-раннер как ссылку на функцию (коллбек)
runTestStep(loginButton.click.bind(loginButton)); 
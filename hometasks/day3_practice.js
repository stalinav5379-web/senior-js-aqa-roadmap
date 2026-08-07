'use strict';

// Наш объект-настройщик оформления (Reporter Theme)
const beautifulReporter = {
	prefix: '🚀 [AUTO-TEST]',
	emoji: '✔',
	suffix: '[SUCCESS]',
};

// Универсальная функция форматирования
// ВНИМАНИЕ: Она не принимает аргументы по одному!
// Она ожидает, что её будут вызывать с динамическим количеством аргументов.
function formatAndLog(...args) {
	// Проверяем, что контекст 'this' передан и содержит настройки темы
	if (!this || !this.prefix) {
		throw new Error(
			"💥 Ошибка репортера! Контекст 'this' потерян или не содержит настроек темы!",
		);
	}

	// 💻 ЗАДАЧА:
	// 1. Склейте все переданные аргументы из массива `args` в одну строку через пробел.
	// 2. Соберите итоговую строку лога в формате:
	//    "PREFIX EMOJI -> [Ваши склеенные аргументы] SUFFIX"
	//    (Используйте свойства из `this`!)
	// 3. Выведите итоговую строку в консоль через console.log.

	// ... ваш код здесь ...
	const message = args.join(' ');
	console.log(`${this.prefix} ${this.emoji} -> [${message}] ${this.suffix}`);
}

// === ТЕСТОВЫЕ СЦЕНАРИИ ===

console.log('--- Сценарий 1: Быстрый лог шага (Используем .apply) ---');
const testStepArgs = [
	'Пользователь',
	'успешно',
	'кликнул',
	'на',
	'кнопку',
	'оплаты',
];

try {
	// 💻 ЗАДАЧА 1:
	// Вызовите функцию formatAndLog мгновенно, передав в неё:
	// - в качестве контекста 'this' -> объект 'beautifulReporter'
	// - в качестве аргументов -> массив 'testStepArgs'
	// Использовать нужно метод .apply()!
	// ... ваш код здесь ...
	formatAndLog.apply(beautifulReporter, testStepArgs);
} catch (error) {
	console.log(error.message);
}

console.log(
	'\n--- Сценарий 2: Фиксация репортера для тестов API (Используем .bind) ---',
);
const apiArgs = ['GET', '/api/v1/users', 'вернул', 'статус', '200'];

try {
	// 💻 ЗАДАЧА 2:
	// Создайте новую функцию 'logApiStep' на основе 'formatAndLog'.
	// Привяжите к ней контекст 'beautifulReporter' намертво с помощью .bind().

	const logApiStep = formatAndLog.bind(beautifulReporter);
	// ... ваш код здесь ...

	// Запуск созданной функции с массивом аргументов (используем spread оператор `...` при вызове)
	logApiStep(...apiArgs);
	logApiStep('БД', 'соединение', 'установлено');
} catch (error) {
	console.log(error.message);
}

'use strict';

// База статических данных для стендов
const environments = {
	local: {
		baseUrl: 'http://localhost:3000',
		dbPort: 5432,
	},
	staging: {
		baseUrl: 'https://staging.test-app.com',
		dbPort: 5439,
	},
};

/**
 * Рекурсивная функция глубокой заморозки объекта.
 */
function deepFreeze(obj) {
	// 💻 ВАШ КОД ЗДЕСЬ (Шаг 4):
	// Напишите рекурсивную заморозку объекта (с использованием Object.keys и typeof).
	Object.keys(obj).forEach((name) => {
		const value = obj[name];
		if (value && typeof value === 'object') {
			deepFreeze(value);
		}
	});
	return Object.freeze(obj);
}

/**
 * Строит итоговый замороженный конфиг на основе окружения.
 */
function buildConfig() {
	// 💻 ВАШ КОД ЗДЕСЬ:
	//
	// Шаг 1: Определите целевое окружение (TARGET_ENV) из process.env.
	//        Если оно не задано в process.env, используйте по умолчанию "local".
	//        Если задано окружение, которого нет в объекте `environments`, выбросьте ошибку!

	const targetEnv = process.env.TARGET_ENV || 'local';
	if (!environments[targetEnv]) {
		throw new Error(
			`❌ Configuration Error: Environment "${targetEnv}" is not defined inside environments!`,
		);
	}

	//
	// Шаг 2: Сделайте глубокую копию (structuredClone) базового конфига из объекта `environments` для целевого стенда.
	//        Назовите переменную, например, `config`.
	//
	let config = structuredClone(environments[targetEnv]);

	// Шаг 3: Добавьте в `config` новые свойства и приведите типы:
	//        - config.env = целевое окружение (строка)
	//        - config.apiKey = значение из process.env.API_KEY
	//        - config.timeout = значение из process.env.TIMEOUT (преобразованное в число!) или дефолтные 10000, если в process.env пусто.
	//

	config.env = targetEnv;
	config.apiKey = process.env.API_KEY;
	config.timeout = Number(process.env.TIMEOUT) || 10000;

	// Шаг 4: Валидация (Fail-Fast). Проверьте, что в `config` заданы `baseUrl` и `apiKey`.
	//        Если какого-то из этих свойств нет (оно undefined/пустое) — выбросьте ошибку с понятным описанием!
	//

	if (!config.baseUrl) {
		throw new Error(`❌ Configuration Error: BaseUrl is absent or undefined!`);
	}

	if (!config.apiKey) {
		throw new Error(`❌ Configuration Error: ApiKey is absent or undefined!`);
	}

	// Шаг 5: Заморозьте получившийся `config` с помощью вашей функции deepFreeze().
	//

	deepFreeze(config);

	// Шаг 6: Верните готовый `config`.

	return config;
}

// === ПРОВЕРКА РАБОТЫ (Имитируем запуск тестов в CI/CD) ===

// Имитируем переменные окружения, которые обычно прилетают из пайплайна или .env файла
process.env.TARGET_ENV = 'staging';
process.env.API_KEY = 'SUPER-SECRET-CI-KEY-999';
process.env.TIMEOUT = '15000'; // Прилетает как строка!

try {
	const config = buildConfig();

	console.log('--- Проверка генерации конфигурации ---');
	console.log(`Текущий стенд: ${config.env.toUpperCase()}`); // Ожидается: STAGING
	console.log(`Адрес стенда: ${config.baseUrl}`); // Ожидается: https://staging.test-app.com
	console.log(`API Токен: ${config.apiKey}`); // Ожидается: SUPER-SECRET-CI-KEY-999

	console.log(`Тип таймаута: ${typeof config.timeout}`); // Ожидается: number (Критично!)
	console.log(`Таймаут: ${config.timeout} мс`); // Ожидается: 15000

	console.log('\n--- Проверка защиты от изменений ---');
	// Попытка хакнуть конфиг во время выполнения теста
	config.baseUrl = 'https://hacked-url.com'; // Должно вызвать ошибку в strict mode
} catch (error) {
	console.log(`✅ Безопасность сработала! Ошибка: "${error.message}"`);
}

// Проверка Fail-Fast валидации
console.log('\n--- Проверка Fail-Fast Валидации ---');
try {
	// Специально стираем секретный ключ, имитируя ошибку настройки CI/CD
	delete process.env.API_KEY;

	console.log('Пытаемся собрать конфиг без API_KEY...');
	buildConfig(); // Должно упасть с ошибкой!
	console.log(
		'💥 ОШИБКА: Фреймворк запустился с пустым API_KEY! Валидация не сработала!',
	);
} catch (error) {
	console.log(
		`✅ Валидация сработала отлично! Ошибка при сборке: "${error.message}"`,
	);
}

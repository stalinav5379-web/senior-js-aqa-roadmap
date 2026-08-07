'use strict';

// Наш эталонный базовый конфиг (Должен остаться нетронутым!)
const baseConfig = {
	project: 'My Awesome Framework',
	api: {
		timeout: 5000,
		retryCount: 3,
	},
	db: {
		host: 'localhost',
		port: 5432,
		username: 'postgres',
	},
};

/**
 * Создает замороженный и глубоко объединенный конфиг окружения.
 * @param {Object} envOverrides - Изменения для конкретного окружения
 * @returns {Object} - Новый, полностью независимый и замороженный объект конфига
 */
function createEnvironmentConfig(envOverrides = {}) {
	// 💻 ВАШ КОД ДОЛЖЕН БЫТЬ ЗДЕСЬ:
	//
	// Шаг 1: Сделайте глубокую копию объекта `baseConfig` и сохраните её в переменную (например, `config`).
	let config = structuredClone(baseConfig);
	//
	// Шаг 2: Реализуйте глубокое слияние (Deep Merge) для вложенных объектов `api` и `db`.
	//        Вам нужно проверить: если в `envOverrides` есть объект `db`,
	//        то нужно обновить только те свойства внутри `config.db`, которые переданы в `envOverrides.db`.
	//        То же самое сделайте для объекта `api`.
	//        (Подсказка: используйте обычные if-условия или Object.assign для вложенных объектов отдельно!)
	//
	if (envOverrides.db) {
		config.db = Object.assign(config.db, envOverrides.db);
	}
	if (envOverrides.api) {
		config.api = Object.assign(config.api, envOverrides.api);
	}

	// Шаг 3: Заморозьте полученный `config` с помощью Object.freeze() и его вложенные объекты тоже!
	//
	for (let item in config) {
		Object.freeze(config[item]);
	}
	Object.freeze(config);
	// Шаг 4: Верните готовый `config`.
	return config;
}

// === ПРОВЕРКА РАБОТЫ (Тест-кейс) ===

try {
	// Имитируем настройки для Stage-окружения
	// Мы хотим поменять только порт в БД и timeout в API!
	const stageOverrides = {
		api: {
			timeout: 10000, // Хотим увеличить тайм-аут, сохранив retryCount: 3
		},
		db: {
			port: 9999, // Хотим поменять только порт, сохранив host: "localhost" и username: "postgres"
		},
	};

	console.log('DEFAULT:     ' + JSON.stringify(baseConfig));
	console.log('NEW:     ' + JSON.stringify(stageOverrides));
	const finalConfig = createEnvironmentConfig(stageOverrides);

	console.log('FINAL:     ' + JSON.stringify(finalConfig));
	console.log('--- Результаты слияния конфигов ---');
	console.log(`Проект: ${finalConfig.project}`); // Ожидается: "My Awesome Framework"
	console.log(
		`API Timeout: ${finalConfig.api.timeout} (Retries: ${finalConfig.api.retryCount})`,
	);
	// Ожидается: API Timeout: 10000 (Retries: 3) — retryCount не должен пропасть!

	console.log(
		`DB Port: ${finalConfig.db.port} (Host: ${finalConfig.db.host}, User: ${finalConfig.db.username})`,
	);
	// Ожидается: DB Port: 9999 (Host: localhost, User: postgres) — host и username не должны пропасть!

	console.log('\n--- Проверка защиты от изменений (Immutability Check) ---');
	// Попытка изменить замороженный конфиг
	finalConfig.api.timeout = 4563;
} catch (error) {
	console.log(`✅ Безопасность сработала! Ошибка: "${error.message}"`);
}

// Финальная проверка на порчу базового эталона
console.log('\n--- Проверка базового конфига на порчу данных ---');
if (baseConfig.db.port === 5432 && baseConfig.api.timeout === 5000) {
	console.log('✅ БАЗОВЫЙ КОНФИГ В ПОЛНОЙ БЕЗОПАСНОСТИ!');
} else {
	console.log('💥 ОШИБКА: Базовый конфиг был случайно изменен в памяти!');
	console.log('Текущее состояние базы:', baseConfig);
}

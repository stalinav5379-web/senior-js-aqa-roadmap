'use strict';

/**
 * Готовит запрос к отправке и логирует его безопасную версию.
 *
 * Входной объект 'options' содержит:
 * {
 *   url: "string",
 *   method: "string" (опционально),
 *   headers: { ... } (опционально),
 *   body: {
 *     username: "string",
 *     password: "string" (КОНФИДЕНЦИАЛЬНО!),
 *     apiToken: "string" (КОНФИДЕНЦИАЛЬНО!),
 *     role: "string"
 *   }
 * }
 */
function prepareRequestAndLog(options = {}) {
	// 💻 ВАШ КОД ЗДЕСЬ:
	//
	// 1. Деструктурируйте из объекта `options`: url, method (дефолт: "GET"), headers (дефолт: {}), и body (дефолт: {}).
	//
	const { url, method = 'GET', headers = {}, body = {} } = options;
	// 2. Сгенерируйте объект `finalHeaders` с помощью Spread-оператора,
	//    объединив {"Content-Type": "application/json"} и переданные headers.
	const finalHeaders = { ...headers, 'Content-Type': 'application/json' };
	//
	// 3. Из полученного объекта `body` деструктурируйте свойства `password` и `apiToken`,
	//    а все остальные свойства соберите в объект `safeBody` с помощью Rest-оператора.
	//
	const { password, apiToken, ...safeBody } = body;
	// 4. Выведите лог в консоль в следующем формате:
	//    "📡 [API] Sending [METHOD] to [URL]"
	//    "Headers: [FINAL_HEADERS_JSON_STRING]"
	//    "Body (Safe): [SAFE_BODY_JSON_STRING]"
	//
	console.log(`📡 [API] Sending ${method} to ${url}`);
	console.log(`Headers: ${JSON.stringify(finalHeaders)}`);
	console.log(`Body (Safe): ${JSON.stringify(safeBody)}}`);

	// 5. Верните объект конфигурации для отправки:
	//    { url, method, headers: finalHeaders, body: safeBody }
	return { url, method, headers: finalHeaders, body: safeBody };
}

// === ПРОВЕРКА РАБОТЫ (Тест-кейс) ===

const myRequestOptions = {
	url: 'https://api.test-app.com/v1/login',
	method: 'POST',
	headers: {
		'X-Request-ID': 'REQ-12345',
	},
	body: {
		username: 'alina_qa',
		password: 'MySuperSecretPassword!!!', // СЕКРЕТНО! Не должно быть в логах
		apiToken: 'TOKEN-XYZ-999-ABC', // СЕКРЕТНО! Не должно быть в логах
		role: 'admin',
	},
};

try {
	const preparedRequest = prepareRequestAndLog(myRequestOptions);

	console.log('\n--- Проверка возвращенного объекта (Проверка Сеньора) ---');

	// Проверяем заголовки
	if (
		preparedRequest.headers['Content-Type'] === 'application/json' &&
		preparedRequest.headers['X-Request-ID'] === 'REQ-12345'
	) {
		console.log('✅ Заголовки сгенерированы верно!');
	} else {
		console.log('💥 ОШИБКА: Заголовки сгенерированы неверно!');
	}

	// Проверяем маскирование тела запроса в возвращаемом значении (оно должно быть чистым)
	if (
		preparedRequest.body.password === undefined &&
		preparedRequest.body.apiToken === undefined &&
		preparedRequest.body.username === 'alina_qa'
	) {
		console.log('✅ Конфиденциальные данные успешно вырезаны из тела запроса!');
	} else {
		console.log('💥 ОШИБКА: Пароль или токен не были удалены!');
	}
} catch (error) {
	console.log(`💥 Что-то пошло не так: ${error.message}`);
}

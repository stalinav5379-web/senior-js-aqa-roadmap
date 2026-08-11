// 💻 ВАШ КОД ДОЛЖЕН БЫТЬ ЗДЕСЬ:

// 1. Функция buildSelector
function buildSelector(baseId: string, childClass?: string) {
	const selector: string = childClass
		? `#${baseId} .${childClass}`
		: `#${baseId}`;
	return selector;
}

// 2. Функция parseCsvRow
function parseCsvRow([testName, retry, critical]: [string, number, boolean]) {
	console.log(
		`[TEST: ${testName}] retries allowed: ${retry}, critical: ${critical}`,
	);
}

// 3. Функция filterBrokenLocators
function filterBrokenLocators(selectors: string[]) {
	const newArray: string[] = selectors.filter(
		(selector) => selector.startsWith('#') || selector.startsWith('.'),
	);
	return newArray;
}

// === СЦЕНАРИИ ТЕСТИРОВАНИЯ (Код для проверки вашего решения) ===

try {
	console.log('--- Тест 1: buildSelector ---');
	const simpleSelector: string = buildSelector('login-form');
	const nestedSelector: string = buildSelector('login-form', 'submit-btn');

	console.log(`Простой селектор: ${simpleSelector}`); // Ожидается: #login-form
	console.log(`Вложенный селектор: ${nestedSelector}`); // Ожидается: #login-form .submit-btn

	console.log('\n--- Тест 2: parseCsvRow (Tuple) ---');
	// Объявляем строго типизированный кортеж (Tuple)
	const testRow: [string, number, boolean] = ['Verify Login Page', 3, true];
	parseCsvRow(testRow); // Ожидается вывод: [TEST: Verify Login Page] retries allowed: 3, critical: true

	console.log('\n--- Тест 3: filterBrokenLocators (Arrays) ---');
	const rawLocators: string[] = [
		'.btn-success',
		'',
		'#input-email',
		'invalid_locator',
		'.active',
	];
	const validLocators: string[] = filterBrokenLocators(rawLocators);

	console.log('Отфильтрованные селекторы:', validLocators);
	// Ожидается: [".btn-success", "#input-email", ".active"]
} catch (error) {
	console.log('💥 Ошибка выполнения кода:', (error as Error).message);
}

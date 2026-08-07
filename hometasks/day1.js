// Тест со старым var
function runTestWithVar() {
	for (var i = 1; i <= 3; i++) {
		setTimeout(function () {
			console.log('Клик по кнопке номер (с var): ' + i);
		}, 100);
	}
}

// Тест с современным let
function runTestWithLet() {
	for (let i = 1; i <= 3; i++) {
		setTimeout(function () {
			console.log('Клик по кнопке номер (с let): ' + i);
		}, 100);
	}
}

console.log('Запуск теста с var:');
runTestWithVar();

// Запустим второй тест чуть позже, чтоб логи не перемешались
setTimeout(() => {
	console.log('\nЗапуск теста с let:');
	runTestWithLet();
}, 500);

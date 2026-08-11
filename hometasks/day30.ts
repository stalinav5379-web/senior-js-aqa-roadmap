type PaymentMethod = 'credit_card' | 'crypto' | 'paypal';

interface BaseOrder {
	id: string;
	amount: number;
	currency: string;
	paymentMethod: PaymentMethod;
}

interface CardOrder extends BaseOrder {
	paymentMethod: 'credit_card';
	cardNumber: string;
	cardHolder: string;
}

interface CryptoOrder extends BaseOrder {
	paymentMethod: 'crypto';
	walletAddress: string;
	txHash?: string;
}

function processPayment(order: CardOrder | CryptoOrder) {
	if (order.paymentMethod === 'credit_card') {
		console.log(
			`Processing card payment of ${order.amount} USD for ${order.cardHolder}. Card: ${order.cardNumber}`,
		);
	}

	if (order.paymentMethod === 'crypto') {
		console.log(
			`Processing crypto payment of ${order.amount} USD. Wallet: ${order.walletAddress}`,
		);
	}
}

// === СЦЕНАРИИ ТЕСТИРОВАНИЯ (Код проверки вашего решения) ===

try {
	console.log('--- Тест 1: Обработка платежа по карте ---');
	const myCardOrder: CardOrder = {
		id: 'ORD-9981',
		amount: 150,
		currency: 'USD',
		paymentMethod: 'credit_card',
		cardNumber: '4400-1122-3344-5566',
		cardHolder: 'Alina Stavitskaya',
	};

	processPayment(myCardOrder);
	// Ожидается вывод: Processing card payment of 150 USD for Alina Stavitskaya. Card: 4400-1122-3344-5566

	console.log('\n--- Тест 2: Обработка крипто-платежа ---');
	const myCryptoOrder: CryptoOrder = {
		id: 'ORD-0021',
		amount: 2500,
		currency: 'USDT',
		paymentMethod: 'crypto',
		walletAddress: '0x71C...39c9',
	};

	processPayment(myCryptoOrder);
	// Ожидается вывод: Processing crypto payment of 2500 USDT. Wallet: 0x71C...39c9

	// console.log("\n--- Тест 3: Проверка защиты компилятора ---");
	// // ПОПРОБУЙТЕ РАСКОММЕНТИРОВАТЬ ЭТОТ КОД. Он должен подчеркиваться красным в VS Code!
	// const badOrder: CardOrder = {
	//   id: "ORD-FAIL",
	//   amount: 10,
	//   currency: "USD",
	//   paymentMethod: "crypto", // ОШИБКА! Метод "crypto" не совместим с CardOrder!
	//   cardNumber: "1234",
	//   cardHolder: "Fail User"
	// };
} catch (error) {
	console.log('💥 Ошибка:', (error as Error).message);
}

'use strict';

// function extractPrice(text) {
// 	const match = text.match(/\d+(?:\s\d{3})*(?:[.,]\d+)?/);
// 	return parseFloat(match[0].replace(/\s/g, ''));
// }

// const priceText = 'Итого к оплате: 12 500.50 руб (включая НДС)';
// console.log(extractPrice(priceText));

const actualPrices = [10, 5, 100, 20, 2];

// Копируем и сортируем для создания эталона
const expectedPrices = [...actualPrices].sort((a, b) => a - b);

console.log(expectedPrices);

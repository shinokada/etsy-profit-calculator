import { expect, test } from 'vitest';
import { calculateTotalFees, calculateDiscount, calculateAdPrice, calculateTotalCoGSAndShipping, calculateTotalRevenue, calculateTotalCosts, calculateNetProfit, calculateNetProfitMargin } from './lib/calculations';

// condition values
const salesPrice = 25;
const shippingPrice = 5.5;
const discountPercentage = 20;
const costOfItem = 3.59;
const shippingCostForOrder = 6.79;
const vatPercentageOnCostAndShipping = 25;
const vatPercentageOnEtsyFees = 25;
const dicountDollar = false;
const adDollar = false;
const adValue = 0;
// calculated values
const discountPrice: number = calculateDiscount(dicountDollar, discountPercentage, salesPrice);
const adPrice: number = calculateAdPrice(adDollar, adValue, salesPrice, discountPrice)

test('discountPrice', () => {
  expect(calculateDiscount(dicountDollar, discountPercentage, salesPrice)).toBeCloseTo(5, 2);
});

test('calculateAdPrice', () => {
  expect(calculateAdPrice(adDollar, adValue, salesPrice, discountPrice)).toBeCloseTo(0, 2);
});

// calculateEtsyTransactionFee(salesPrice: number, shippingPrice: number)


// calculateTotalFees(salesPrice: number, shippingPrice: number, discountPrice: number, adPrice: number)



// calculateTotalCoGSAndShipping(costOfItem: number, shippingCostForOrder: number)

// calculateTotalRevenue(salesPrice: number, shippingPrice: number, discountPrice: number)
test('calculation calculateTotalRevenue', () => {
	expect(calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(25.5, 2);
});
	
// calculatePaymentProcessingFee(salesPrice: number, shippingPrice: number, discountPrice: number)



// calculateVatEtsy( totalFees: number, vatEtsyPercentage: number )



// calculateVatCosts(costOfItem: number, costOfShipping: number, vatCostPercentage: number)


// calculateTotalCosts(costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number)



// calculateNetProfit(salesPrice: number, shippingPrice: number, costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number, vatPercentageOnEtsyFees: number, discountPercentage: number, discountPrice: number)


// calculateNetProfitMargin(salesPrice: number, shippingPrice: number, costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number, vatPercentageOnEtsyFees: number, discountPercentage: number, discountPrice: number)
import { describe, expect, it } from 'vitest';
import { calculateTotalFees, calculateDiscount, calculateAdPrice, calculateTotalCoGSAndShipping, calculateTotalRevenue, calculateEtsyTransactionFee, calculateTotalCosts, calculateNetProfit, calculateNetProfitMargin } from './lib/calculations';

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

describe('calculateDiscount', () => {
  it('calculates discount price', () => {
    expect(calculateDiscount(dicountDollar, discountPercentage, salesPrice)).toBeCloseTo(5, 2);
  });
});

describe('calculateAdPrice', () => {
  it('calculates Ad price', () => {
    expect(calculateAdPrice(adDollar, adValue, salesPrice, discountPrice)).toBeCloseTo(0, 2);
  });
});

// calculateEtsyTransactionFee(salesPrice: number, shippingPrice: number)
describe('calculateEtsyTransactionFee', () => {
  it('calculates etsy transaction fee', () => {
    expect(calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(1.66, 2);
  });
});


// calculateTotalFees(salesPrice: number, shippingPrice: number, discountPrice: number, adPrice: number)
describe('calculateTotalFees', () => {
  it('calculates total fees', () => {
    expect(calculateTotalFees(salesPrice, shippingPrice, discountPrice, adPrice)).toBeCloseTo(2.87, 2);
  });
});


// calculateTotalCoGSAndShipping(costOfItem: number, shippingCostForOrder: number)
describe('calculateTotalCoGSAndShipping', () => {
  it('calculates total cogs and shipping', () => {
    expect(calculateTotalCoGSAndShipping(costOfItem, shippingCostForOrder)).toBeCloseTo(13.69, 2);
  });
});

// calculateTotalRevenue(salesPrice: number, shippingPrice: number, discountPrice: number)
describe('calculateTotalRevenue', () => {
  it('calculates total revenue', () => {
    expect(calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(25.5, 2);
  });
});

	
// calculatePaymentProcessingFee(salesPrice: number, shippingPrice: number, discountPrice: number)



// calculateVatEtsy( totalFees: number, vatEtsyPercentage: number )



// calculateVatCosts(costOfItem: number, costOfShipping: number, vatCostPercentage: number)


// calculateTotalCosts(costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number)



// calculateNetProfit(salesPrice: number, shippingPrice: number, costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number, vatPercentageOnEtsyFees: number, discountPercentage: number, discountPrice: number)


// calculateNetProfitMargin(salesPrice: number, shippingPrice: number, costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number, vatPercentageOnEtsyFees: number, discountPercentage: number, discountPrice: number)
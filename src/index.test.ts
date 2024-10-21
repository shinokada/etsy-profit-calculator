import { describe, expect, it } from 'vitest';
import { calculateTotalFees, calculateDiscount, calculateAdPrice, calculateTotalCoGSAndShipping, calculateTotalRevenue, calculateEtsyTransactionFee, calculatePaymentProcessingFee, calculateOffsiteAdPrice, calculateVatEtsyFees, calculateVatOnCosts, calculateTotalTax, calculateTotalCosts, calculateNetProfit, calculateNetProfitMargin } from './lib/calculations';

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
const offsitePercentage = 0;
// calculated values
const discountPrice: number = calculateDiscount(dicountDollar, discountPercentage, salesPrice);
let etsyAds: number = calculateAdPrice(adDollar,adValue, salesPrice, discountPrice);
let offsiteAds: number = calculateOffsiteAdPrice(salesPrice, discountPrice, offsitePercentage);
const totalFees: number = calculateTotalFees(salesPrice, shippingPrice, discountPrice, etsyAds, offsiteAds);
const vatonEtsyFees: number = calculateVatEtsyFees(totalFees, vatPercentageOnEtsyFees);
const vatOnCost: number = calculateVatOnCosts(costOfItem, shippingCostForOrder, vatPercentageOnCostAndShipping);
const totalTax = calculateTotalTax(vatonEtsyFees, vatOnCost)
const totalCost = calculateTotalCosts(totalFees, costOfItem, shippingCostForOrder)
const totalRevenue = calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)
const netProfit = calculateNetProfit(totalRevenue, totalCost, totalTax)

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

// calculateOffsiteAdPrice (salesPrice: number, discountPrice: number, offSitePercentage: number)
describe('calculateOffsiteAdPrice', () => {
  it('calculates offsite ad price', () => {
    expect(calculateOffsiteAdPrice(salesPrice, discountPrice, offsitePercentage)).toBeCloseTo(0, 2);
  })
});


// calculateVatEtsy( totalFees: number, vatEtsyPercentage: number  )
describe('calculateVatEtsyFees', () => {
  it('calculates vat etsy fees', () => {
    expect(calculateVatEtsyFees(totalFees, vatPercentageOnEtsyFees)).toBeCloseTo(0.718, 3);
  });
});

// calculateVatCosts(costOfItem: number, costOfShipping: number, vatCostPercentage: number)
describe('calculateVatOnCosts', () => {
	it('calculates vat on costs', () => {
		expect(Math.round(calculateVatOnCosts(costOfItem, shippingCostForOrder, vatPercentageOnCostAndShipping) * 100) / 100).toBeCloseTo(2.60, 2);
	});
});

// salesPrice: number, shippingPrice: number, discountPrice: number, etsyAds: number, offsiteAds: number
describe('calculateTotalFees', () => {
  it('calculates total fees', () => {
    expect(calculateTotalFees(salesPrice, shippingPrice, discountPrice, etsyAds, offsiteAds)).toBeCloseTo(2.87, 2);
  });
});

// calculateTotalCoGSAndShipping(costOfItem: number, shippingCostForOrder: number)
describe('calculateTotalCoGSAndShipping', () => {
  it('calculates total cogs and shipping', () => {
    expect(calculateTotalCoGSAndShipping(costOfItem, shippingCostForOrder)).toBeCloseTo(10.38, 2);
  });
});

// calculateTotalTax(vatonEtsyFees: number, vatOnCost: number)
describe('calculateTotalTax', () => {
  it('calculates total tax', () => {
    expect(calculateTotalTax(vatonEtsyFees, vatOnCost)).toBeCloseTo(3.313, 3);
  });
});

// calculateTotalCosts(totalFees: number, costOfItem: number, shippingCostForOrder: number)
describe('calculateTotalCosts', () => {
  it('calculates total costs', () => {
    expect(calculateTotalCosts(totalFees, costOfItem, shippingCostForOrder)).toBeCloseTo(13.253, 3);
  });
});

// calculateTotalRevenue(salesPrice: number, shippingPrice: number, discountPrice: number)
describe('calculateTotalRevenue', () => {
  it('calculates total revenue', () => {
    expect(calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(25.5, 2);
  });
});

// calculateNetProfit(totalRevenue: number, totalCosts: number, totalTax: number)
describe('calculateNetProfit(totalRevenue: number, totalCost: number, totalTax: number)', () => {
  it('calculate net profit', () => {
    expect(calculateNetProfit(totalRevenue, totalCost, totalTax)).toBeCloseTo(8.934, 3);
  })  
})


// calculateNetProfit(totalRevenue: number, totalCost: number, totalTax: number)
describe('calculateNetProfitMargin', () => {
  it('calculate net profit margin', () => {
    expect(calculateNetProfitMargin(netProfit, totalRevenue)).toBeCloseTo(35.04, 2);
  })  
})

// calculateEtsyTransactionFee(salesPrice: number, shippingPrice: number)
describe('calculateEtsyTransactionFee', () => {
  it('calculates etsy transaction fee', () => {
    expect(calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(1.66, 2);
  });
});
	
// calculatePaymentProcessingFee(salesPrice: number, shippingPrice: number, discountPrice: number)
describe('calculatePaymentProcessingFee', () => {
  it('calculates payment processing fee', () => {
    expect(calculatePaymentProcessingFee(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(1.02, 2);
  });
});


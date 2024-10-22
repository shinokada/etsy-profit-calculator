import { describe, expect, it } from 'vitest';
import { calculateTotalFees, calculateDiscount, calculateEtsyAdPrice, calculateTotalCoGSAndShipping, calculateTotalRevenue, calculateEtsyTransactionFee, calculatePaymentProcessingFee, calculateOffsiteAdPrice, calculateVatEtsyFees, calculateVatOnCosts, calculateTotalTax, calculateTotalCost, calculateNetProfit, calculateNetProfitMargin } from '../lib/calculations';

// condition values
const salesPrice = 25;
const shippingPrice = 5.5;
const discountPercentage = 20;
const costOfItem = 3.59;
const shippingCostForOrder = 6.79;
const vatPercentageOnCostAndShipping = 25;
const vatPercentageOnEtsyFees = 25;
const dicountDollar = false;
const etsyAdValue = 10; // 10%
const offsitePercentage = 0;
const isEtsyAdPriceInDollars = false;
const hasEtsyAds = true; // for etsyAdValue
const hasOffsiteAds = false;
// calculated values
const discountPrice: number = calculateDiscount(dicountDollar, discountPercentage, salesPrice);
// isEtsyAdPriceInDollars: boolean, etsyAdValue: number, salesPrice: number, discountPrice: number, hasEtsyAds: boolean
let etsyAds: number = calculateEtsyAdPrice(isEtsyAdPriceInDollars, etsyAdValue, salesPrice, discountPrice, hasEtsyAds);
// salesPrice: number, discountPrice: number, offSitePercentage: number, hasOffsiteAds: boolean
let offsiteAds: number = calculateOffsiteAdPrice(salesPrice, discountPrice, offsitePercentage, hasOffsiteAds);
const totalFees: number = calculateTotalFees(salesPrice, shippingPrice, discountPrice, etsyAds, offsiteAds);
const vatonEtsyFees: number = calculateVatEtsyFees(totalFees, vatPercentageOnEtsyFees);
const vatOnCost: number = calculateVatOnCosts(costOfItem, shippingCostForOrder, vatPercentageOnCostAndShipping);
const totalTax = calculateTotalTax(vatonEtsyFees, vatOnCost)
const totalCost = calculateTotalCost(totalFees, costOfItem, shippingCostForOrder)
const totalRevenue = calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)
const netProfit = calculateNetProfit(totalRevenue, totalCost, totalTax)

describe('3: calculateDiscount', () => {
  it('3: calculates discount price', () => {
    expect(calculateDiscount(dicountDollar, discountPercentage, salesPrice)).toBeCloseTo(5, 2);
  });
});

describe('3: calculateEtsyAdPrice', () => {
  it('3: calculates Ad price', () => {
    expect(calculateEtsyAdPrice(isEtsyAdPriceInDollars, etsyAdValue, salesPrice, discountPrice, hasEtsyAds)).toBeCloseTo(2.00, 2);
  });
});

// calculateOffsiteAdPrice (salesPrice: number, discountPrice: number, offSitePercentage: number)
describe('3: calculateOffsiteAdPrice', () => {
  it('3: calculates offsite ad price', () => {
    expect(calculateOffsiteAdPrice(salesPrice, discountPrice, offsitePercentage, hasOffsiteAds)).toBeCloseTo(0, 2);
  })
});


// calculateVatEtsy( totalFees: number, vatEtsyPercentage: number  )
describe('3: calculateVatEtsyFees', () => {
  it('3: calculates vat etsy fees', () => {
    expect(calculateVatEtsyFees(totalFees, vatPercentageOnEtsyFees)).toBeCloseTo(1.218, 3);
  });
});

// calculateVatCosts(costOfItem: number, costOfShipping: number, vatCostPercentage: number)
describe('3: calculateVatOnCosts', () => {
	it('3: calculates vat on costs', () => {
		expect(Math.round(calculateVatOnCosts(costOfItem, shippingCostForOrder, vatPercentageOnCostAndShipping) * 100) / 100).toBeCloseTo(2.60, 2);
	});
});

// salesPrice: number, shippingPrice: number, discountPrice: number, etsyAds: number, offsiteAds: number
describe('3: calculateTotalFees', () => {
  it('3: calculates total fees', () => {
    expect(calculateTotalFees(salesPrice, shippingPrice, discountPrice, etsyAds, offsiteAds)).toBeCloseTo(4.873, 2);
  });
});

// calculateTotalCoGSAndShipping(costOfItem: number, shippingCostForOrder: number)
describe('3: calculateTotalCoGSAndShipping', () => {
  it('3: calculates total cogs and shipping', () => {
    expect(calculateTotalCoGSAndShipping(costOfItem, shippingCostForOrder)).toBeCloseTo(10.38, 2);
  });
});

// calculateTotalTax(vatonEtsyFees: number, vatOnCost: number)
describe('3: calculateTotalTax', () => {
  it('3: calculates total tax', () => {
    expect(calculateTotalTax(vatonEtsyFees, vatOnCost)).toBeCloseTo(3.813, 3);
  });
});

// calculateTotalCost(totalFees: number, costOfItem: number, shippingCostForOrder: number)
describe('3: calculateTotalCost', () => {
  it('3: calculates total costs', () => {
    expect(calculateTotalCost(totalFees, costOfItem, shippingCostForOrder)).toBeCloseTo(15.253, 3);
  });
});

// calculateTotalRevenue(salesPrice: number, shippingPrice: number, discountPrice: number)
describe('3: calculateTotalRevenue', () => {
  it('3: calculates total revenue', () => {
    expect(calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(25.5, 2);
  });
});

// calculateNetProfit(totalRevenue: number, totalCosts: number, totalTax: number)
describe('3: calculateNetProfit(totalRevenue: number, totalCost: number, totalTax: number)', () => {
  it('3: calculate net profit', () => {
    expect(calculateNetProfit(totalRevenue, totalCost, totalTax)).toBeCloseTo(6.434, 3);
  })  
})


// calculateNetProfitMargin(netProfit: number, totalRevenue: number)
describe('3: calculateNetProfitMargin', () => {
  it('3: calculate net profit margin', () => {
    expect(calculateNetProfitMargin(netProfit, totalRevenue)).toBeCloseTo(25.23, 2);
  })  
})

// calculateEtsyTransactionFee(salesPrice: number, shippingPrice: number)
describe('3: calculateEtsyTransactionFee', () => {
  it('3: calculates etsy transaction fee', () => {
    expect(calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(1.66, 2);
  });
});
	
// calculatePaymentProcessingFee(salesPrice: number, shippingPrice: number, discountPrice: number)
describe('3: calculatePaymentProcessingFee', () => {
  it('3: calculates payment processing fee', () => {
    expect(calculatePaymentProcessingFee(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(1.02, 2);
  });
});


import { describe, expect, it } from 'vitest';
import {
	calculateTotalFees,
	calculateDiscount,
	calculateEtsyAdPrice,
	calculateTotalCoGSAndShipping,
	calculateTotalRevenue,
	calculateEtsyTransactionFee,
	calculatePaymentProcessingFee,
	calculateOffsiteAdPrice,
	calculateVatEtsyFees,
	calculateVatOnCosts,
	calculateTotalTax,
	calculateTotalCost,
	calculateNetProfit,
	calculateNetProfitMargin
} from '../src/lib/calculations';

// condition values
const salesPrice = 30;
const shippingPrice = 5.5;
const discountPercentage = 20;
const costOfItem = 4.29;
const shippingCostForOrder = 6.79;
const vatPercentageOnCostAndShipping = 25;
const vatPercentageOnEtsyFees = 25;
const dicountDollar = false;
const etsyAdValue = 0;
const offsitePercentage = 0;
const isEtsyAdPriceInDollars = false;
const hasEtsyAds = false;
const hasOffsiteAds = false;
// calculated values
const discountPrice: number = calculateDiscount(dicountDollar, discountPercentage, salesPrice);
// isEtsyAdPriceInDollars: boolean, etsyAdValue: number, salesPrice: number, discountPrice: number, hasEtsyAds: boolean
const etsyAds: number = calculateEtsyAdPrice(
	isEtsyAdPriceInDollars,
	etsyAdValue,
	salesPrice,
	discountPrice,
	hasEtsyAds
);
// salesPrice: number, discountPrice: number, offSitePercentage: number, hasOffsiteAds: boolean
const offsiteAds: number = calculateOffsiteAdPrice(
	salesPrice,
	discountPrice,
	offsitePercentage,
	hasOffsiteAds
);
const totalFees: number = calculateTotalFees(
	salesPrice,
	shippingPrice,
	discountPrice,
	etsyAds,
	offsiteAds
);
const vatonEtsyFees: number = calculateVatEtsyFees(totalFees, vatPercentageOnEtsyFees);
const vatOnCost: number = calculateVatOnCosts(
	costOfItem,
	shippingCostForOrder,
	vatPercentageOnCostAndShipping
);
const totalTax = calculateTotalTax(vatonEtsyFees, vatOnCost);
const totalCost = calculateTotalCost(totalFees, costOfItem, shippingCostForOrder);
const totalRevenue = calculateTotalRevenue(salesPrice, shippingPrice, discountPrice);
const netProfit = calculateNetProfit(totalRevenue, totalCost, totalTax);

describe('2: calculateDiscount', () => {
	it('2: calculates discount price', () => {
		expect(calculateDiscount(dicountDollar, discountPercentage, salesPrice)).toBeCloseTo(6, 2);
	});
});

describe('2: calculateEtsyAdPrice', () => {
	it('2: calculates Ad price', () => {
		expect(
			calculateEtsyAdPrice(
				isEtsyAdPriceInDollars,
				etsyAdValue,
				salesPrice,
				discountPrice,
				hasEtsyAds
			)
		).toBeCloseTo(0, 2);
	});
});

// calculateOffsiteAdPrice (salesPrice: number, discountPrice: number, offSitePercentage: number)
describe('2: calculateOffsiteAdPrice', () => {
	it('2: calculates offsite ad price', () => {
		expect(
			calculateOffsiteAdPrice(salesPrice, discountPrice, offsitePercentage, hasOffsiteAds)
		).toBeCloseTo(0, 2);
	});
});

// calculateVatEtsy( totalFees: number, vatEtsyPercentage: number  )
describe('2: calculateVatEtsyFees', () => {
	it('2: calculates vat etsy fees', () => {
		expect(calculateVatEtsyFees(totalFees, vatPercentageOnEtsyFees)).toBeCloseTo(0.813, 3);
	});
});

// calculateVatCosts(costOfItem: number, costOfShipping: number, vatCostPercentage: number)
describe('2: calculateVatOnCosts', () => {
	it('2: calculates vat on costs', () => {
		expect(
			Math.round(
				calculateVatOnCosts(costOfItem, shippingCostForOrder, vatPercentageOnCostAndShipping) * 100
			) / 100
		).toBeCloseTo(2.77, 2);
	});
});

// salesPrice: number, shippingPrice: number, discountPrice: number, etsyAds: number, offsiteAds: number
describe('2: calculateTotalFees', () => {
	it('2: calculates total fees', () => {
		expect(
			calculateTotalFees(salesPrice, shippingPrice, discountPrice, etsyAds, offsiteAds)
		).toBeCloseTo(3.253, 3);
	});
});

// calculateTotalCoGSAndShipping(costOfItem: number, shippingCostForOrder: number)
describe('2: calculateTotalCoGSAndShipping', () => {
	it('2: calculates total cogs and shipping', () => {
		expect(calculateTotalCoGSAndShipping(costOfItem, shippingCostForOrder)).toBeCloseTo(11.08, 2);
	});
});

// calculateTotalTax(vatonEtsyFees: number, vatOnCost: number)
describe('2: calculateTotalTax', () => {
	it('2: calculates total tax', () => {
		expect(calculateTotalTax(vatonEtsyFees, vatOnCost)).toBeCloseTo(3.58, 2);
	});
});

// calculateTotalCost(totalFees: number, costOfItem: number, shippingCostForOrder: number)
describe('2: calculateTotalCost', () => {
	it('2: calculates total costs', () => {
		expect(calculateTotalCost(totalFees, costOfItem, shippingCostForOrder)).toBeCloseTo(14.33, 2);
	});
});

// calculateTotalRevenue(salesPrice: number, shippingPrice: number, discountPrice: number)
describe('2: calculateTotalRevenue', () => {
	it('2: calculates total revenue', () => {
		expect(calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(29.5, 2);
	});
});

// calculateNetProfit(totalRevenue: number, totalCosts: number, totalTax: number)
describe('2: calculateNetProfit(totalRevenue: number, totalCost: number, totalTax: number)', () => {
	it('2: calculates net profit', () => {
		expect(calculateNetProfit(totalRevenue, totalCost, totalTax)).toBeCloseTo(11.58, 2);
	});
});

// calculateNetProfitMargin(netProfit: number, totalRevenue: number)
describe('2: calculateNetProfitMargin', () => {
	it('2: calculates net profit margin', () => {
		expect(calculateNetProfitMargin(netProfit, totalRevenue)).toBeCloseTo(39.3, 1);
	});
});

// calculateEtsyTransactionFee(salesPrice: number, shippingPrice: number)
describe('2: calculateEtsyTransactionFee', () => {
	it('2: calculates etsy transaction fee', () => {
		expect(calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(
			1.918,
			2
		);
	});
});

// calculatePaymentProcessingFee(salesPrice: number, shippingPrice: number, discountPrice: number)
describe('2: calculatePaymentProcessingFee', () => {
	it('2: calculates payment processing fee', () => {
		expect(calculatePaymentProcessingFee(salesPrice, shippingPrice, discountPrice)).toBeCloseTo(
			1.135,
			3
		);
	});
});

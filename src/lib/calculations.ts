import {
  ETSY_LISTING_FEE,
  ETSY_TRANSACTION_PERCENTAGE,
  PAYMENT_PROCESSING_PERCENTAGE,
  PAYMENT_PROCESSING_FIXED_FEE,
  ETSY_OFFSITE_AD_PERCENTAGE_MORE_THAN_10K_SALES,
  ETSY_OFFSITE_AD_PERCENTAGE_LESS_THAN_10K_SALES
} from './constants';

export function calculateDiscount(dicountDollar: boolean, discountValue: number, salesPrice: number): number {
  return dicountDollar ? discountValue : salesPrice * discountValue / 100;
}

export function calculateAdPrice( adDollar: boolean, adValue: number, salesPrice: number, discountPrice: number): number {
  return adDollar ? adValue : (salesPrice - discountPrice) * (adValue / 100)
}

export function calculateEtsyTransactionFee(salesPrice: number, shippingPrice: number, discountPrice: number): number {
  return (salesPrice + shippingPrice - discountPrice) * ETSY_TRANSACTION_PERCENTAGE / 100;
}

export function calculateTotalFees(salesPrice: number, shippingPrice: number, discountPrice: number, adPrice: number): number {
  let etsytransactionFee = calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice);
  let paymentProcessingFee = calculatePaymentProcessingFee(salesPrice, shippingPrice, discountPrice);
  
  return ETSY_LISTING_FEE + etsytransactionFee + paymentProcessingFee + adPrice;
}

// 25% MVA of total Etsy fees + Cost of Goods Sold + Shipping Cost + 25% MVA of costs
export function calculateTotalCoGSAndShipping(costOfItem: number, shippingCostForOrder: number): number {
  return costOfItem + shippingCostForOrder;
}

export function calculateTotalRevenue(salesPrice: number, shippingPrice: number, discountPrice: number): number {
  return salesPrice + shippingPrice - discountPrice;
}

export function calculatePaymentProcessingFee(salesPrice: number, shippingPrice: number, discountPrice: number): number {
  const totalRevenue = calculateTotalRevenue(salesPrice, shippingPrice, discountPrice);
  return (totalRevenue * PAYMENT_PROCESSING_PERCENTAGE / 100) + PAYMENT_PROCESSING_FIXED_FEE
}

export function calculateVatEtsy( totalFees: number, vatEtsyPercentage: number ): number {
  return totalFees * vatEtsyPercentage / 100
}

export function calculateVatCosts(costOfItem: number, costOfShipping: number, vatCostPercentage: number): number {
  return (costOfItem + costOfShipping) * (vatCostPercentage / 100)
}

export function calculateTotalCosts(costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number): number {
  const cogsAndShipping = calculateTotalCoGSAndShipping(costOfItem, shippingCostForOrder);
  return cogsAndShipping * (1 + vatPercentageOnCostAndShipping);
}

export function calculateNetProfit(salesPrice: number, shippingPrice: number, costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number, vatPercentageOnEtsyFees: number, discountPercentage: number, discountPrice: number): number {
  const totalRevenue = calculateTotalRevenue(salesPrice, shippingPrice, discountPrice);
  const totalCosts = calculateTotalCosts(costOfItem, shippingCostForOrder, vatPercentageOnCostAndShipping);
  const totalFees = calculateTotalFees(salesPrice, shippingPrice, discountPercentage, vatPercentageOnEtsyFees);
  return totalRevenue - totalCosts - totalFees;
}

export function calculateNetProfitMargin(salesPrice: number, shippingPrice: number, costOfItem: number, shippingCostForOrder: number, vatPercentageOnCostAndShipping: number, vatPercentageOnEtsyFees: number, discountPercentage: number, discountPrice: number): number {
  const netProfit = calculateNetProfit(salesPrice, shippingPrice, costOfItem, shippingCostForOrder, vatPercentageOnCostAndShipping, vatPercentageOnEtsyFees, discountPercentage, discountPrice);
  const totalRevenue = calculateTotalRevenue(salesPrice, shippingPrice, discountPrice);
  return netProfit / totalRevenue;
}

export function formatNumber(value: number): string {
  return isNaN(value) ? '0.00' : value.toFixed(2);
}

export function financial(x: string): string {
  return Number.parseFloat(x).toFixed(2);
}
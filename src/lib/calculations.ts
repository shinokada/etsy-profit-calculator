import {
  ETSY_LISTING_FEE,
  ETSY_TRANSACTION_PERCENTAGE,
  PAYMENT_PROCESSING_PERCENTAGE,
  PAYMENT_PROCESSING_FIXED_FEE,
  // ETSY_OFFSITE_AD_PERCENTAGE_MORE_THAN_10K_SALES,
  // ETSY_OFFSITE_AD_PERCENTAGE_LESS_THAN_10K_SALES
} from './constants';

// REVENE
/*
test: done
*/
export function calculateDiscount(dicountDollar: boolean, discountValue: number, salesPrice: number): number {
  return dicountDollar ? discountValue : salesPrice * discountValue / 100;
}

/*
test: done
*/
export function calculateTotalRevenue(salesPrice: number, shippingPrice: number, discountPrice: number): number {
  return salesPrice + shippingPrice - discountPrice;
}

// COSTS
// Etsy Listing Fees: ETSY_LISTING_FEE
/*
test: done
*/
export function calculateEtsyTransactionFee(salesPrice: number, shippingPrice: number, discountPrice: number): number {
  return (salesPrice + shippingPrice - discountPrice) * ETSY_TRANSACTION_PERCENTAGE / 100;
}

// Payment Processing Fee
/*
test: done
*/
export function calculatePaymentProcessingFee(salesPrice: number, shippingPrice: number, discountPrice: number): number {
  const totalRevenue = calculateTotalRevenue(salesPrice, shippingPrice, discountPrice);
  return (totalRevenue * PAYMENT_PROCESSING_PERCENTAGE / 100) + PAYMENT_PROCESSING_FIXED_FEE
}

// Advertising
// Etsy Ads
/*
test: done
*/
export function calculateEtsyAdPrice(isEtsyAdPriceInDollars: boolean, etsyAdValue: number, salesPrice: number, discountPrice: number, hasEtsyAds: boolean): number {
  if (!hasEtsyAds) return 0
  return isEtsyAdPriceInDollars ? etsyAdValue : (salesPrice - discountPrice) * (etsyAdValue / 100)
}

// off-site ads
/*
test: done
*/
export function calculateOffsiteAdPrice(salesPrice: number, discountPrice: number, offSitePercentage: number, hasOffsiteAds: boolean): number {
  if (!hasOffsiteAds) return 0
  return (salesPrice - discountPrice) * (offSitePercentage / 100)
}

// TAXES
/*
test: done
*/
export function calculateVatEtsyFees( totalFees: number, vatEtsyPercentage: number ): number {
  return totalFees * vatEtsyPercentage / 100
}

/*
test: done
*/
export function calculateVatOnCosts(costOfItem: number, costOfShipping: number, vatCostPercentage: number): number {
  return (costOfItem + costOfShipping) * (vatCostPercentage / 100)
}

// FEES
/*
test: done
*/
export function calculateTotalFees(salesPrice: number, shippingPrice: number, discountPrice: number, etsyAds: number, offsiteAds: number): number {
  let etsytransactionFee = calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice);
  let paymentProcessingFee = calculatePaymentProcessingFee(salesPrice, shippingPrice, discountPrice);

  return ETSY_LISTING_FEE + etsytransactionFee + paymentProcessingFee + etsyAds + offsiteAds;
}

/*
test: done
*/
export function calculateTotalCoGSAndShipping(costOfItem: number, shippingCostForOrder: number): number {
  return costOfItem + shippingCostForOrder;
}

/*
test: done
*/
export function calculateTotalTax(vatonEtsyFees: number, vatOnCost: number): number {
  return vatonEtsyFees + vatOnCost
}

// Total fees + Total CoGS + shipping cose
/*
test: done
*/
export function calculateTotalCost(totalFees: number, costOfItem: number, shippingCostForOrder: number): number {
  return totalFees + costOfItem + shippingCostForOrder;
}

/*
test: done
*/
export function calculateNetProfit(totalRevenue: number, totalCost: number, totalTax: number): number {
  return totalRevenue - totalCost - totalTax;
}

/*
test: done
*/
export function calculateNetProfitMargin(netProfit: number, totalRevenue: number): number {
  return netProfit / totalRevenue * 100;
}

export function formatNumber(value: number): string {
  return isNaN(value) ? '0.00' : value.toFixed(2);
}

export function financial(x: string): string {
  return Number.parseFloat(x).toFixed(2);
}
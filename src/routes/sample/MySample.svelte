<script lang="ts">
  import {
  Heading,
  Input,
  Label,
  Toggle,
  Layout,
  InputAddon,
  ButtonGroup,
  Hr
} from 'svelte-5-ui-lib';

import {
  calculateTotalFees,
  calculateTotalCoGSAndShipping,
  calculateTotalRevenue,
  calculateTotalCosts,
  calculateNetProfit,
  calculateNetProfitMargin
} from '$lib/calculations';
import {
  ETSY_LISTING_FEE,
  ETSY_TRANSACTION_PERCENTAGE,
  PAYMENT_PROCESSING_PERCENTAGE,
  PAYMENT_PROCESSING_FIXED_FEE
} from '$lib/constants';

// Helper function to format numbers
function formatNumber(value: number): string {
  return isNaN(value) ? '0.00' : value.toFixed(2);
}
function financial(x: string): string {
  return Number.parseFloat(x).toFixed(2);
}


// Input states
let salesPrice = $state(0);
let shippingPrice = $state(0);
let discountValue = $state(0);
let dicountDollar = $state(false);
let costOfItem = $state(0);
let costOfShipping = $state(0);
let vatCostPercentage = $state(0);
let vatEtsyPercentage = $state(0);
let adValue = $state(0);
let adDollar = $state(false);
let offsiteAd = $state(0);

// Derived values
let dicountMethod: string = $derived(dicountDollar ? '$' : '%');
let dicountPlaceholder: string = $derived(dicountDollar ? 'Enter discount amount' : 'Enter discount percentage');
let adMethod: string = $derived(adDollar ? '$' : '%');
let adPlaceholder: string = $derived(adDollar ? 'Enter ad amount' : 'Enter ad percentage');

let discountPrice: number = $derived(dicountDollar 
  ? discountValue 
  : (salesPrice + shippingPrice) * (discountValue / 100));

let adPrice: number = $derived(adDollar
  ? adValue
  : (salesPrice + shippingPrice) * (adValue / 100));

let totalRevenue: number = $derived(calculateTotalRevenue(salesPrice, shippingPrice) - discountPrice);

let etsyListingFees: number = $derived(ETSY_LISTING_FEE);
let transactionFee: number = $derived(totalRevenue * ETSY_TRANSACTION_PERCENTAGE);
let paymentProcessingFee: number = $derived(totalRevenue * PAYMENT_PROCESSING_PERCENTAGE + PAYMENT_PROCESSING_FIXED_FEE);

let totalFees: number = $derived(calculateTotalFees(salesPrice, shippingPrice, discountValue / 100, vatEtsyPercentage / 100) + adPrice + offsiteAd);

let vatEtsy: number = $derived(totalFees * (vatEtsyPercentage / 100));
let vatCosts: number = $derived((costOfItem + costOfShipping) * (vatCostPercentage / 100));

let totalCoGSAndShipping: number = $derived(calculateTotalCoGSAndShipping(costOfItem, costOfShipping) + vatCosts);

let totalCosts: number = $derived(calculateTotalCosts(costOfItem, costOfShipping, vatCostPercentage / 100) + totalFees + vatEtsy);

let netProfit: number = $derived(totalRevenue - totalCosts);

let netProfitMargin: number = $derived((netProfit / totalRevenue) * 100);
</script>

<Layout class="gap-6">
<div class="space-y-8">
  <Heading tag="h1" class="mb-8 text-primary-600">Etsy Profit Calculator</Heading>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Revenue</Heading>
    <Label>Sales Price</Label>
    <Input placeholder="Enter sales price" bind:value={salesPrice as number} />
    <Label>Shipping Price</Label>
    <Input placeholder="Enter shipping price" bind:value={shippingPrice as number} />
    <Label>Discount</Label>
    <Toggle bind:checked={dicountDollar}>
      Method (% | $) ({dicountMethod})
    </Toggle>
    <ButtonGroup class="w-full">
      <InputAddon>{dicountMethod}</InputAddon>
      <Input placeholder={dicountPlaceholder} bind:value={discountValue as number} />
    </ButtonGroup>
  </div>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Costs</Heading>
    <Label>Cost of Item</Label>
    <Input placeholder="Enter cost of item" bind:value={costOfItem as number} />
    <Label>Cost of Shipping</Label>
    <Input placeholder="Enter cost of shipping" bind:value={costOfShipping as number} />
  </div>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Tax</Heading>
    <Label>VAT Percentage on Cost & Shipping</Label>
    <ButtonGroup class="w-full">
      <InputAddon>%</InputAddon>
      <Input placeholder="Enter VAT of costs" bind:value={vatCostPercentage as number} />
    </ButtonGroup>
    <Label>VAT Percentage on Etsy Fees</Label>
    <ButtonGroup class="w-full">
      <InputAddon>%</InputAddon>
      <Input placeholder="Enter VAT of Etsy" bind:value={vatEtsyPercentage as number} />
    </ButtonGroup>
  </div>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Advertising</Heading>
    <Label>Etsy Adds-Est. ACoS</Label>
    <Toggle bind:checked={adDollar}>Method (% | $)</Toggle>
    <ButtonGroup class="w-full">
      <InputAddon>{adMethod}</InputAddon>
      <Input placeholder={adPlaceholder} bind:value={adValue as number} />
    </ButtonGroup>
    <Label>Off-site Ads</Label>
    <Input placeholder="Enter off-site ads" bind:value={offsiteAd as number} />
  </div>
</div>
<div class="space-y-8 bg-[#00533d] p-8 text-white">
  <Heading tag="h2" class="text-white">Summary</Heading>
  <div class="space-y-4">
    <Heading tag="h3" class="text-white">Revenue</Heading>
    <Label class="text-white">Sales</Label>
    $ {financial(salesPrice)}
    <Label class="text-white">Shipping Price</Label>
    $ {shippingPrice}
    <Label class="text-white">Discount</Label>
    $ {discountPrice}
    <Heading tag="h4" class="text-white">Total Revenue</Heading>
    $ {salesPrice} + $ {shippingPrice} - $ {discountPrice} = $ {totalRevenue}
    <Hr />
  </div>

  <div class="space-y-4">
    <Heading tag="h3" class="text-white">Costs</Heading>
    <Label class="text-white">Etsy Listing Fees</Label>
    $ {etsyListingFees}
    <Label class="text-white">Transaction Fees</Label>
    $ {transactionFee}
    <Label class="text-white">Payment Processing Fees</Label>
    $ {paymentProcessingFee}
    <Label class="text-white">Advertising Costs</Label>
    $ {adPrice}
    <Label class="text-white">Off-site Ads</Label>
    $ {offsiteAd}
    <Heading tag="h4" class="text-white">Total Fees</Heading>
    $ {totalFees}
    <Hr />
  </div>
  <div class="space-y-4">
    <Label class="text-white">Cost of Goods Sold</Label>
    $ {costOfItem}
    <Label class="text-white">Cost of Shipping</Label>
    $ {costOfShipping}
    <Label class="text-white">VAT on Etsy Fees</Label>
    $ {vatEtsy}
    <Label class="text-white">VAT on Cost & Shipping</Label>
    $ {vatCosts}
    <Heading tag="h4" class="text-white">Total CoGS+Shipping</Heading>
    $ {totalCoGSAndShipping}
  </div>

  <div class="space-y-4">
    <Heading tag="h4" class="text-white">Total Revenue</Heading>
    $ {totalRevenue}
    <Heading tag="h4" class="text-white">Total Costs</Heading>
    $ {totalCosts}
    <Hr />
    <Heading tag="h4" class="text-white">Net Profit</Heading>
    $ {netProfit}
    <Heading tag="h4" class="text-white">Net Profit Margin</Heading>
    {netProfitMargin} %
  </div>
</div>
</Layout>
<script lang="ts">
  	import {
		Heading,
		Input,
		Label,
		Toggle,
		Layout,
		InputAddon,
		ButtonGroup,
		Hr, Radio, Checkbox
	} from 'svelte-5-ui-lib';

import {
    calculateTotalFees,
    calculateTotalCoGSAndShipping,
    calculateTotalRevenue,
    calculateTotalCosts,
    calculateNetProfit,
    calculateNetProfitMargin,
    calculateDiscount,
    calculateAdPrice,
    calculatePaymentProcessingFee,
    calculateVatEtsy,
    calculateVatCosts,
    calculateEtsyTransactionFee
  } from '$lib/calculations';
  import {
    ETSY_LISTING_FEE
  } from '$lib/constants';

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
  $inspect('typeof salesPrice', typeof salesPrice);
  // Derived values
  let dicountMethod: string = $derived(dicountDollar ? '$' : '%');
  let dicountPlaceholder: string = $derived(dicountDollar ? 'Enter discount amount' : 'Enter discount percentage');

  // Advertising
  let lessThan10k = $state(false);
  let offsiteAdMethod: string = $derived(lessThan10k ? '15%' : '12%');
  let adMethod: string = $derived(adDollar ? '$' : '%');
  let adPlaceholder: string = $derived(adDollar ? 'Enter ad amount' : 'Enter ad percentage');
  let shopEarning = $state(false);
  let offsiteAdOptin = $state(false);

  let discountPrice: number = $derived(calculateDiscount(dicountDollar, discountValue, salesPrice));

  let adPrice: number = $derived(calculateAdPrice(adDollar, adValue, salesPrice, discountPrice));

  let totalRevenue: number = $derived(calculateTotalRevenue(salesPrice, shippingPrice, discountPrice));

  let etsyListingFees: number = ETSY_LISTING_FEE;
  let transactionFee: number = $derived(calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice));
  let paymentProcessingFee: number = $derived(calculatePaymentProcessingFee(salesPrice, shippingPrice, discountPrice));

  let totalFees: number = $derived(calculateTotalFees(salesPrice, shippingPrice, discountPrice, adPrice));

  let vatEtsy: number = $derived(calculateVatEtsy(totalFees, vatEtsyPercentage));
  let vatCosts: number = $derived(calculateVatCosts(costOfItem, costOfShipping, vatCostPercentage));



  let totalCoGSAndShipping: number = $derived(calculateTotalCoGSAndShipping(costOfItem, costOfShipping) + vatCosts);

  let totalCosts: number = $derived(calculateTotalCosts(costOfItem, costOfShipping, vatCostPercentage / 100) + totalFees + vatEtsy);

  let netProfit: number = $derived(totalRevenue - totalCosts);

  let netProfitMargin: number = $derived((netProfit / totalRevenue) * 100);

  // let netProfit: number = $derived(calculateNetProfit(salesPrice, shippingPrice, discountValue, vatCostPercentage, vatEtsyPercentage, adValue, offsiteAd, discountPrice));
  // $inspect('netProfitByfn', netProfit);
  // let netProfitMargin: number = $derived(calculateNetProfitMargin(salesPrice, shippingPrice, discountValue, vatCostPercentage, vatEtsyPercentage, adValue, offsiteAd));
  // $inspect('netProfitMarginByfn', netProfitMargin);
</script>


<Layout class="gap-6">
<div class="space-y-8">
  <Heading tag="h1" class="mb-8 text-primary-600">Etsy Profit Calculator</Heading>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Revenue</Heading>
    <Label>Sales Price</Label>
    <Input type="number" placeholder="Enter sales price" bind:value={salesPrice as number} />
    <Label>Shipping Price</Label>
    <Input type="number" placeholder="Enter shipping price" bind:value={shippingPrice as number} />
    <Label>Discount</Label>
    <Toggle bind:checked={dicountDollar}>
      Method (% | $) ({dicountMethod})
    </Toggle>
    <ButtonGroup class="w-full">
      <InputAddon>{dicountMethod}</InputAddon>
      <Input type="number" placeholder={dicountPlaceholder} bind:value={discountValue as number} />
    </ButtonGroup>
  </div>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Costs</Heading>
    <Label>Cost of Item</Label>
    <Input type="number" placeholder="Enter cost of item" bind:value={costOfItem as number} />
    <Label>Cost of Shipping</Label>
    <Input type="number" placeholder="Enter cost of shipping" bind:value={costOfShipping as number} />
  </div>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Tax</Heading>
    <Label>VAT Percentage on Cost & Shipping</Label>
    <ButtonGroup class="w-full">
      <InputAddon>%</InputAddon>
      <Input type="number" placeholder="Enter VAT of costs" bind:value={vatCostPercentage as number} />
    </ButtonGroup>
    <Label>VAT Percentage on Etsy Fees</Label>
    <ButtonGroup class="w-full">
      <InputAddon>%</InputAddon>
      <Input type="number" placeholder="Enter VAT of Etsy" bind:value={vatEtsyPercentage as number} />
    </ButtonGroup>
  </div>
  <div class="space-y-4">
    <Heading tag="h3" class="text-secondary-800">Advertising</Heading>
    <Label>Etsy Adds-Estimate Average Cost of Sale</Label>
    <Toggle bind:checked={adDollar}>Method (% | $)</Toggle>
    <ButtonGroup class="w-full">
      <InputAddon>{adMethod}</InputAddon>
      <Input type="number" placeholder={adPlaceholder} bind:value={adValue as number} />
    </ButtonGroup>
    <Label>Shop Earnings (last 365 days)</Label>
    <Checkbox custom bind:checked={shopEarning as boolean}>
      <div class="w-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-5 font-normal text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-primary-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300">
        <div class="w-full text-lg font-semibold">$10,000+</div>
        <div class="w-full text-sm">A JavaScript library for building user interfaces.</div>
      </div>
    </Checkbox>
    <Checkbox custom bind:checked={offsiteAdOptin as boolean}>
      <div class="w-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-5 font-normal text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-primary-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300">
        <div class="w-full text-lg font-semibold">Vue Js</div>
        <div class="w-full text-sm">Vue.js is an model–view front end JavaScript framework.</div>
      </div>
    </Checkbox>
    {#if shopEarning === true}
     12% charge
    {/if}
    <Toggle bind:checked={lessThan10k}>Method (15% | 12%)</Toggle>
      <ButtonGroup class="w-full">
        <InputAddon>{offsiteAdMethod}</InputAddon>
        <Input type="number" placeholder="Enter off-site ads" bind:value={offsiteAd as number} />
      </ButtonGroup>
  </div>
</div>
<div class="space-y-8 bg-[#00533d] p-8 text-white">
  <Heading tag="h2" class="text-white">Summary</Heading>
  <div class="space-y-4">
    <Heading tag="h3" class="text-white">Revenue</Heading>
    <Label class="text-white">Sales</Label>
    $ { salesPrice > 0 ? salesPrice.toFixed(2) : 0}
    <Label class="text-white">Shipping Price</Label>
    $ { shippingPrice > 0 ? shippingPrice.toFixed(2) : 0}
    <Label class="text-white">Discount</Label>
    $ { discountPrice > 0 ? discountPrice.toFixed(2) : 0}
    <Heading tag="h4" class="text-white">Total Revenue</Heading>
    $ { salesPrice > 0 ? salesPrice.toFixed(2) : 0} + $ { shippingPrice > 0 ? shippingPrice.toFixed(2) : 0} - $ { discountPrice > 0  ? discountPrice.toFixed(2) : 0} = $ { totalRevenue > 0 ?totalRevenue.toFixed(2) : 0}
    <Hr />
  </div>

  <div class="space-y-4">
    <Heading tag="h3" class="text-white">Costs</Heading>
    <Label class="text-white">Etsy Listing Fees</Label>
    $ { salesPrice > 0 ? etsyListingFees.toFixed(2) : 0 }
    <Label class="text-white">Transaction Fees</Label>
    $ { transactionFee > 0 ? transactionFee.toFixed(2) : 0}
    <Label class="text-white">Payment Processing Fees</Label>
    $ { salesPrice > 0 ? paymentProcessingFee.toFixed(2) : 0}
    <Label class="text-white">Advertising Costs</Label>
    $ { adPrice > 0 ? adPrice.toFixed(2) : 0}
    <Label class="text-white">Off-site Ads</Label>
    $ { offsiteAd > 0 ? offsiteAd.toFixed(2) : 0}
    <Heading tag="h4" class="text-white">Total Fees</Heading>
    $ { salesPrice > 0 ? totalFees.toFixed(2) : 0}
    <Hr />
  </div>
  <div class="space-y-4">
    <Label class="text-white">Cost of Goods Sold</Label>
    $ { costOfItem > 0 ? costOfItem.toFixed(2) : 0}
    <Label class="text-white">Cost of Shipping</Label>
    $ { costOfShipping > 0 ? costOfShipping.toFixed(2) : 0}
    <Label class="text-white">VAT on Etsy Fees</Label>
    $ { vatEtsy > 0 ? vatEtsy.toFixed(2) : 0}
    <Label class="text-white">VAT on Cost & Shipping</Label>
    $ { vatCosts > 0 ? vatCosts.toFixed(2) : 0}
    <Heading tag="h4" class="text-white">Total CoGS+Shipping</Heading>
    $ { totalCoGSAndShipping > 0 ? totalCoGSAndShipping.toFixed(2) : 0}
  </div>

  <div class="space-y-4">
    <Heading tag="h4" class="text-white">Total Revenue</Heading>
    $ {totalRevenue > 0 ? totalRevenue.toFixed(2) : 0}
    <Heading tag="h4" class="text-white">Total Costs</Heading>
    $ {totalCosts > 0 ? totalCosts.toFixed(2) : 0}
    <Hr />
    <Heading tag="h4" class="text-white">Net Profit</Heading>
    $ { netProfit > 0 ? netProfit.toFixed(2) : 0}
    <Heading tag="h4" class="text-white">Net Profit Margin</Heading>
    { netProfitMargin > 0 ? netProfitMargin : 0} % 
  </div>
</div>
</Layout>
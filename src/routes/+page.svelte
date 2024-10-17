<script lang="ts">
  import { Heading, Input, Label, Toggle, Layout, InputAddon, ButtonGroup, Hr } from "svelte-5-ui-lib"

  let salesPrice: number = $state(25);
  let shippingPrice: number | null = $state(5.5);
  let dicountDollar: boolean = $state(false);
  let dicountMethod: string = $derived(dicountDollar ? '$' : '%');
  let dicountPlaceholder: string = $derived(dicountDollar ? 'Enter in dollars' : 'Enter in %');
  let discountValue: number = $state(20);
  let discountPrice: number = $derived(
    dicountDollar ? Math.round(discountValue * 100) / 100 : (salesPrice * (discountValue / 100))
  );
  let totalRevenue: number = $derived(Math.round((Number(salesPrice) + Number(shippingPrice) - Number(discountPrice))*100)/100);

  // Costs
  let costOfItem: number = $state(3.59);
  let costOfShipping: number = $state(6.79);
  // Advertising
  let adDollar: boolean = $state(false);
  let adMethod: string = $derived(adDollar ? '$' : '%');
  let adPlaceholder: string = $derived(adDollar ? 'Enter in dollars' : 'Enter in %');
  let adValue: number = $state(0);
  let adPrice: number = $derived(
    adDollar ? adValue : (salesPrice * (adValue / 100))
  )
  let offsiteAd: number = $state(0);
  // Cost
  const etsyListingFees = 0.2;
  const transactionPercentage = 0.065;
  let transactionFee = $derived(Math.round((Number(totalRevenue) * Number(transactionPercentage)) * 100) / 100);
  const paymentProcessingPercentage: number = 0.03;
  const paymentProcessingBase: number = 0.25
  let paymentProcessingFee = $derived( Math.round((totalRevenue * Number(paymentProcessingPercentage) + Number(paymentProcessingBase))*100)/100);
  // advertising costs
  let totalFees: number = $derived( Math.round((Number(etsyListingFees) + Number(transactionFee) + Number(paymentProcessingFee) + Number(adPrice) + Number(offsiteAd)) * 100) / 100);
  // TAX
  let mvaCostPercentage: number = $state(25);
  let costAndShipping: number = $derived(Number(costOfItem) + Number(costOfShipping));
  let mvaCosts = $derived(Math.round((Number(costAndShipping) * Number(mvaCostPercentage / 100)) * 100) / 100);
  let mvaEtsyPercentage: number = $state(25);
  let mvaEtsy = $derived(Math.round((Number(totalFees) * Number(mvaEtsyPercentage / 100)) * 100) / 100);
  // Total CoGS+Shipping
  let totalCoGSAndShipping = $derived(Math.round((Number(costOfItem) + Number(costOfShipping) + Number(mvaCosts) + Number(mvaEtsy)) * 100) / 100);
  // Total
  let totalCosts = $derived(Number(totalFees) + Number(totalCoGSAndShipping));
  let netProfit = $derived(Math.round((Number(totalRevenue) - Number(totalCosts)) * 100) / 100);
  let netProfitMargin = $derived(Math.round((Number(netProfit) / Number(totalRevenue)) * 100));
</script>

<Layout class="gap-6">
  <div class="space-y-8">
    <Heading tag="h1" class="text-primary-600 mb-8">Etsy Profit Calculator</Heading>
    <div class="space-y-4">
      <Heading tag="h3">Revenue</Heading>
      <Label>Sales Price</Label>
      <Input placeholder="Enter sales price" bind:value={salesPrice as number} />
      <Label>Shipping Price</Label>
      <Input placeholder="Enter shipping price" bind:value={shippingPrice as number}/>
      <Label>Discount</Label>
      <Toggle bind:checked={dicountDollar}>
        Method (% | $) ({dicountDollar})
      </Toggle>
      <ButtonGroup class="w-full">
        <InputAddon>{dicountMethod}</InputAddon>
        <Input placeholder={dicountPlaceholder} bind:value={discountValue as number} />
      </ButtonGroup>
    </div>
    <div class="space-y-4">
      <Heading tag="h3">Costs</Heading>
      <Label>Cost of Item</Label>
      <Input placeholder="Enter cost of item" bind:value={costOfItem as number} />
      <Label>Cost of Shipping</Label>
      <Input placeholder="Enter cost of shipping" bind:value={costOfShipping as number} />
    </div>
    <div class="space-y-4">
      <Heading tag="h3">Tax</Heading>
      <Label>MVA Percentage on Cost & Shipping</Label>
      <ButtonGroup class="w-full">
        <InputAddon>%</InputAddon>
        <Input placeholder="Enter MVA of costs" bind:value={mvaCostPercentage as number} />
      </ButtonGroup>
      <Label>MVA Percentage on Etsy Fees</Label>
      <ButtonGroup class="w-full">
        <InputAddon>%</InputAddon>
        <Input placeholder="Enter MVA of Etsy" bind:value={mvaEtsyPercentage as number} />
      </ButtonGroup>
    </div>
    <div class="space-y-4">
      <Heading tag="h3">Advertising</Heading>
      <Label>Etsy Adds-Est. ACoS</Label>
      <Toggle bind:checked={adDollar}>
        Method (% | $)
      </Toggle>
      <ButtonGroup class="w-full">
        <InputAddon>{adMethod}</InputAddon>
        <Input placeholder={adPlaceholder} bind:value={adValue as number} />
      </ButtonGroup>
      <Label>Off-site Ads</Label>
      <Input placeholder="Enter off-site ads" bind:value={offsiteAd as number} />
    </div>
  </div>
<div class="space-y-8 p-8 bg-[#002753] text-white">
<Heading tag="h2" class="text-white">Summary</Heading>
  <div class="space-y-4">
    <Heading tag="h3" class="text-white">Revenue</Heading>
    <Label class="text-white">Sales</Label>
    ${salesPrice ? salesPrice : 0}
    <Label class="text-white">Shipping Price</Label>
    ${shippingPrice ? shippingPrice : 0}
    <Label class="text-white">Discount</Label>
    ${discountPrice ? discountPrice.toFixed(2) : 0}
    <Heading tag="h4" class="text-white">Total Revenue</Heading>
    ${salesPrice ? salesPrice : 0} + ${shippingPrice ? shippingPrice : 0} - ${discountPrice ? discountPrice.toFixed(2) : 0} =
    ${totalRevenue}
    <Hr />
  </div>

  <div class="space-y-4">
    <Heading tag="h3" class="text-white">Costs</Heading>
    <Label class="text-white">Etsy Listing Fees</Label>
    ${ salesPrice ? etsyListingFees : 0}
    <Label class="text-white">Transaction Fees</Label>
    ${ salesPrice ? transactionFee.toFixed(2) : 0}
    <Label class="text-white">Payment Processing Fees</Label>
    ${ salesPrice ? paymentProcessingFee : 0}
    <Label class="text-white">Advertising Costs</Label>
    ${ salesPrice ? adPrice : 0}
    <Label class="text-white">Off-site Ads</Label>
    ${ salesPrice ? offsiteAd : 0}
    <Heading tag="h4" class="text-white">Total Fees</Heading>
    ${ salesPrice ? totalFees : 0}
    <Hr />
  </div>
  <div class="space-y-4">
    <Label class="text-white">Cost of Goods Sold</Label>
    ${ salesPrice ? costOfItem : 0}
    <Label class="text-white">Cost of Shipping</Label>
    ${ salesPrice ? costOfShipping : 0}
    <Label class="text-white">MVA on Etsy Fees</Label>
    ${ salesPrice && mvaEtsyPercentage ? mvaEtsy : 0}
    <Label class="text-white">MVA on Cost & Shipping</Label>
    ${ salesPrice && mvaCostPercentage ? mvaCosts.toFixed(2) : 0}
    <Heading tag="h4" class="text-white">Total CoGS+Shipping</Heading>
    ${ salesPrice ? totalCoGSAndShipping.toFixed(2) : 0}
  </div>

  <div class="space-y-4">
    <Heading tag="h4" class="text-white">Total Revenue</Heading>
    ${totalRevenue}
    <Heading tag="h4" class="text-white">Total Costs</Heading>
    ${totalCosts}
    <Hr />
    <Heading tag="h4" class="text-white">Net Profit</Heading>
    ${netProfit}
    <Heading tag="h4" class="text-white">Net Profit Margin</Heading>
    {netProfitMargin} %
  </div>
</div>
</Layout>

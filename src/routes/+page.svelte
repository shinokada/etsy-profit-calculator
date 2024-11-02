<script lang="ts">
	import {
		Heading,
		Input,
		Label,
		Toggle,
		Layout,
		InputAddon,
		ButtonGroup,
		Hr,
		Radio,
		Checkbox,
		Span
	} from 'svelte-5-ui-lib';

	import {
		calculateTotalFees,
		calculateTotalCoGSAndShipping,
		calculateTotalRevenue,
		calculateTotalCost,
		calculateNetProfit,
		calculateNetProfitMargin,
		calculateDiscount,
		calculateEtsyAdPrice,
		calculateOffsiteAdPrice,
		calculatePaymentProcessingFee,
		calculateVatEtsyFees,
		calculateVatOnCosts,
		calculateEtsyTransactionFee,
		calculateTotalTax
	} from '$lib/calculations';
	import { ETSY_LISTING_FEE } from '$lib/constants';

	// Input states
	let salesPrice = $state(0);
	let shippingPrice = $state(0);
	let discountValue = $state(0);
	let isAdPriceInDollars = $state(false);
	let costOfItem = $state(0);
	let costOfShipping = $state(0);
	let vatCostPercentage = $state(0);
	let vatEtsyPercentage = $state(0);
	let etsyAdValue = $state(0);
	let isEtsyAdPriceInDollars = $state(false);
	let hasEtsyAds = $state(false);
	let hasOffsiteAds = $state(false);
	let offsitePercentage = $state(0);
	$inspect('typeof salesPrice', typeof salesPrice);
	// Derived values
	let dicountMethod: string = $derived(isAdPriceInDollars ? '$' : '%');
	let dicountPlaceholder: string = $derived(
		isAdPriceInDollars ? 'Enter discount amount' : 'Enter discount percentage'
	);

	// Advertising
	let etsyAdMethod: string = $derived(isEtsyAdPriceInDollars ? '$' : '%');
	let adPlaceholder: string = $derived(
		isEtsyAdPriceInDollars ? 'Enter ad amount' : 'Enter ad percentage'
	);
	// etsyAds
	let discountPrice: number = $derived(
		calculateDiscount(isAdPriceInDollars, discountValue, salesPrice)
	);
	let etsyAdsPrice: number = $derived(
		calculateEtsyAdPrice(isEtsyAdPriceInDollars, etsyAdValue, salesPrice, discountPrice, hasEtsyAds)
	);
	// off-site ads
	let offsiteAdsPrice: number = $derived(
		calculateOffsiteAdPrice(salesPrice, discountPrice, offsitePercentage, hasOffsiteAds)
	);

	let totalAdvertising: number = $derived(etsyAdsPrice + offsiteAdsPrice);

	let totalRevenue: number = $derived(
		calculateTotalRevenue(salesPrice, shippingPrice, discountPrice)
	);

	let etsyListingFees: number = ETSY_LISTING_FEE;

	let transactionFee: number = $derived(
		calculateEtsyTransactionFee(salesPrice, shippingPrice, discountPrice)
	);

	let paymentProcessingFee: number = $derived(
		calculatePaymentProcessingFee(salesPrice, shippingPrice, discountPrice)
	);

	let totalFees: number = $derived(
		calculateTotalFees(salesPrice, shippingPrice, discountPrice, etsyAdsPrice, offsiteAdsPrice)
	);

	// Tax
	let vatonEtsyFees: number = $derived(calculateVatEtsyFees(totalFees, vatEtsyPercentage));

	let vatOnCost: number = $derived(
		calculateVatOnCosts(costOfItem, costOfShipping, vatCostPercentage)
	);

	let totalTax: number = $derived(calculateTotalTax(vatonEtsyFees, vatOnCost));

	let totalCoGSAndShipping: number = $derived(
		calculateTotalCoGSAndShipping(costOfItem, costOfShipping) + vatOnCost
	);

	// totalFees: number, costOfItem: number, shippingCostForOrder: number
	let totalCost: number = $derived(calculateTotalCost(totalFees, costOfItem, costOfShipping));

	// totalRevenue, totalCost, totalTax
	let netProfit: number = $derived(calculateNetProfit(totalRevenue, totalCost, totalTax));
	// calculateNetProfit(totalRevenue: number, totalCost: number, totalTax: number)
	let netProfitMargin: number = $derived(calculateNetProfitMargin(netProfit, totalRevenue));
</script>

<Layout class="gap-6">
	<div class="space-y-8">
		<Heading tag="h1" class="mb-8 text-primary-600"
			><Span uppercase>Etsy Profit Calculator</Span></Heading
		>
		<div class="space-y-4">
			<Heading tag="h3" class="text-secondary-800">Revenue</Heading>
			<Label>Sales Price</Label>
			<Input type="number" placeholder="Enter sales price" bind:value={salesPrice as number} />
			<Label>Shipping Price</Label>
			<Input
				type="number"
				placeholder="Enter shipping price"
				bind:value={shippingPrice as number}
			/>
			<Label>Discount</Label>
			<Toggle bind:checked={isAdPriceInDollars}>Method (% | $)</Toggle>
			<ButtonGroup class="w-full">
				<InputAddon class="w-9">{dicountMethod}</InputAddon>
				<Input
					type="number"
					placeholder={dicountPlaceholder}
					bind:value={discountValue as number}
				/>
			</ButtonGroup>
		</div>
		<div class="space-y-4">
			<Heading tag="h3" class="text-secondary-800">Costs</Heading>
			<Label>Cost of Item</Label>
			<Input type="number" placeholder="Enter cost of item" bind:value={costOfItem as number} />
			<Label>Cost of Shipping</Label>
			<Input
				type="number"
				placeholder="Enter cost of shipping"
				bind:value={costOfShipping as number}
			/>
		</div>
		<div class="space-y-4">
			<Heading tag="h3" class="text-secondary-800">Tax</Heading>
			<Label>VAT Percentage on Cost & Shipping</Label>
			<ButtonGroup class="w-full">
				<InputAddon>%</InputAddon>
				<Input
					type="number"
					placeholder="Enter VAT of costs"
					bind:value={vatCostPercentage as number}
				/>
			</ButtonGroup>
			<Label>VAT Percentage on Etsy Fees</Label>
			<ButtonGroup class="w-full">
				<InputAddon>%</InputAddon>
				<Input
					type="number"
					placeholder="Enter VAT of Etsy"
					bind:value={vatEtsyPercentage as number}
				/>
			</ButtonGroup>
		</div>
		<div class="space-y-4">
			<Heading tag="h3" class="text-secondary-800">Advertising</Heading>
			<Checkbox custom bind:checked={hasEtsyAds as boolean}>
				<div
					class="w-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-5 font-normal text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-primary-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
				>
					<div class="w-full text-lg font-semibold">Etsy Ads</div>
					<div class="w-full text-sm">Average Cost of Sale</div>
				</div>
			</Checkbox>
			hasEtsyAds: {hasEtsyAds}
			{#if hasEtsyAds}
				<Toggle bind:checked={isEtsyAdPriceInDollars}>Method (% | $)</Toggle>
				<ButtonGroup class="w-full">
					<InputAddon class="w-9">{etsyAdMethod}</InputAddon>
					<Input type="number" placeholder={adPlaceholder} bind:value={etsyAdValue as number} />
				</ButtonGroup>
				etsyAdMethod: {etsyAdMethod}
				etsyAdValue: {etsyAdValue}
			{/if}
			<Checkbox custom bind:checked={hasOffsiteAds as boolean}>
				<div
					class="w-full cursor-pointer rounded-lg border-2 border-gray-200 bg-white p-5 font-normal text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-primary-600 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
				>
					<div class="w-full text-lg font-semibold">Etsy Off-site Ads</div>
					<div class="w-full text-sm">
						If your Etsy shop made less than $10,000 USD, you'll be charged a 15% fee for an order.
						Otherwise, you'll be charged a 12% fee.
					</div>
				</div>
			</Checkbox>
			{#if hasOffsiteAds === true}
				<Radio name="etsyAdsPercent" bind:group={offsitePercentage} value="0">0%</Radio>
				<Radio name="etsyAdsPercent" bind:group={offsitePercentage} value="12">12%</Radio>
				<Radio name="etsyAdsPercent" bind:group={offsitePercentage} value="15">15%</Radio>
			{/if}
			hasOffsiteAds: {hasOffsiteAds}
			offsitePercentage: {offsitePercentage}
		</div>
	</div>
	<div class="space-y-8 bg-[#00533d] p-8 text-white">
		<Heading tag="h2" class="text-white">Summary</Heading>
		<div class="space-y-4">
			<Heading tag="h3" class="text-white">Revenue</Heading>
			<Label class="text-white">Sales</Label>
			$ {salesPrice > 0 ? salesPrice.toFixed(2) : 0}
			<Label class="text-white">Shipping Price</Label>
			$ {shippingPrice > 0 ? shippingPrice.toFixed(2) : 0}
			<Label class="text-white">Discount</Label>
			$ {discountPrice > 0 ? discountPrice.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Total Revenue</Heading>
			$ {salesPrice > 0 ? salesPrice.toFixed(2) : 0} + $ {shippingPrice > 0
				? shippingPrice.toFixed(2)
				: 0} - $ {discountPrice > 0 ? discountPrice.toFixed(2) : 0} = $ {totalRevenue > 0
				? totalRevenue.toFixed(2)
				: 0}
			<Hr />
		</div>

		<div class="space-y-4">
			<Heading tag="h3" class="text-white">FEES</Heading>
			<Label class="text-white">Etsy Listing Fees</Label>
			$ {salesPrice > 0 ? etsyListingFees.toFixed(2) : 0}
			<Label class="text-white">Transaction Fees</Label>
			$ {transactionFee > 0 ? transactionFee.toFixed(2) : 0}
			<Label class="text-white">Payment Processing Fees</Label>
			$ {salesPrice > 0 ? paymentProcessingFee.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Total Fees</Heading>
			$ {salesPrice > 0 ? totalFees.toFixed(2) : 0}
			<Hr />
		</div>

		<div class="space-y-4">
			<Heading tag="h3" class="text-white">Advertising Costs</Heading>
			<Label class="text-white">Etsy Advertising Cost</Label>
			$ {etsyAdsPrice > 0 ? etsyAdsPrice.toFixed(2) : 0}
			<Label class="text-white">Off-site Advertising Cost</Label>
			$ {offsiteAdsPrice > 0 ? offsiteAdsPrice.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Total Advertising Cost</Heading>
			$ {totalAdvertising > 0 ? totalAdvertising.toFixed(2) : 0}
			<Hr />
		</div>

		<div class="space-y-4">
			<Heading tag="h3" class="text-white">TAXES</Heading>
			<Label class="text-white">VAT on Etsy Fees</Label>
			$ {vatonEtsyFees > 0 ? vatonEtsyFees.toFixed(2) : 0}
			<Label class="text-white">VAT on Cost & Shipping</Label>
			$ {vatOnCost > 0 ? vatOnCost.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Total Taxes</Heading>
			$ {totalTax > 0 ? totalTax.toFixed(2) : 0}
			<Hr />
		</div>

		<div class="space-y-4">
			<Label class="text-white">Cost of Goods Sold</Label>
			$ {costOfItem > 0 ? costOfItem.toFixed(2) : 0}
			<Label class="text-white">Cost of Shipping</Label>
			$ {costOfShipping > 0 ? costOfShipping.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Total CoGS+Shipping</Heading>
			$ {totalCoGSAndShipping > 0 ? totalCoGSAndShipping.toFixed(2) : 0}
			<Hr />
		</div>

		<div class="space-y-4">
			<Heading tag="h4" class="text-white">Total Revenue</Heading>
			$ {totalRevenue > 0 ? totalRevenue.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Total Costs</Heading>
			$ {totalCost > 0 ? totalCost.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Total Tax</Heading>
			$ {totalTax > 0 ? totalTax.toFixed(2) : 0}
			<Hr />
			<Heading tag="h4" class="text-white">Net Profit</Heading>
			$ {netProfit > 0 ? netProfit.toFixed(2) : 0}
			<Heading tag="h4" class="text-white">Net Profit Margin</Heading>
			{netProfitMargin > 0 ? netProfitMargin.toFixed(2) : 0} %
		</div>
	</div>
</Layout>

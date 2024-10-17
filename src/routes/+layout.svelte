<script lang="ts">
	import type { Snippet } from "svelte";
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<main class="m-8">
	{@render children()}
</main>

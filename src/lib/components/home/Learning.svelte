<script lang="ts" module>
	import Item from '$lib/components/list/Item.svelte';
	import List from '$lib/components/list/List.svelte';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
</script>

<List class="flex flex-col lg:flex-row-reverse {className}" title="Learning">
	{#snippet children({ popEffect })}
		<Item
			text="GSAP!"
			level={6}
			baseColor="green"
			gsaps={[(options) => popEffect(options, true)]} />

		<Item
			text="Three.js (threlte)"
			level={5}
			baseColor="yellowgreen"
			gsaps={[(options) => popEffect(options)]} />

		<Item text="Next" level={'?'} baseColor="white" gsaps={[(options) => popEffect(options)]} />

		<Item text="Go" level={'?'} baseColor="blue" gsaps={[(options) => popEffect(options)]} />

		<Item text="MongoDB" level={2} baseColor="green" gsaps={[(options) => popEffect(options)]} />
	{/snippet}
</List>

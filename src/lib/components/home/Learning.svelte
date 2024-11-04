<script lang="ts" module>
	import { List } from '$lib/components/list';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
</script>

<List.Root class="flex flex-col lg:flex-row-reverse {className}" title="Learning">
	{#snippet children({ popEffect })}
		<List.Item
			text="GSAP!"
			level={6}
			baseColor="green"
			gsaps={[(options) => popEffect(options, true)]} />

		<List.Item
			text="Three.js (threlte)"
			level={5}
			baseColor="yellowgreen"
			gsaps={[(options) => popEffect(options)]} />

		<List.Item
			text="Next"
			level={'?'}
			baseColor="white"
			gsaps={[(options) => popEffect(options)]} />

		<List.Item text="Go" level={'?'} baseColor="blue" gsaps={[(options) => popEffect(options)]} />

		<List.Item
			text="MongoDB"
			level={2}
			baseColor="green"
			gsaps={[(options) => popEffect(options)]} />
	{/snippet}
</List.Root>

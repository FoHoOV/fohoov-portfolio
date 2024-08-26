<script lang="ts" module>
	import Section from '$lib/components/section/Section.svelte';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
</script>

<Section class="lg:flex-row-reverse {className}" title="Projects">
	<span> </span>
</Section>

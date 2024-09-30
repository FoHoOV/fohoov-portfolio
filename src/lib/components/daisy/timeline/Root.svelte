<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type Props = {
		class: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	const { class: className, children }: Props = $props();
</script>

<ul class="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact {className}">
	{@render children()}
</ul>

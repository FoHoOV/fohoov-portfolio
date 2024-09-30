<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type Props = {
		class?: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	const { class: className, children }: Props = $props();
</script>

<div class="card {className}">
	<div class="card-body flex content-center items-center justify-center text-center">
		{@render children()}
	</div>
</div>

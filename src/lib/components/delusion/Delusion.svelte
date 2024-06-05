<script lang="ts" context="module">
	import { getDelusionStateFromStore } from '$lib';
</script>

<script lang="ts">
	const delusion = getDelusionStateFromStore();
</script>

<button
	class="btn btn-circle fixed left-5 top-5 z-10"
	onclick={() => {
		delusion.toggleDelusionState();
	}}
>
	D ({delusion.isDelusionOn$().current})
</button>

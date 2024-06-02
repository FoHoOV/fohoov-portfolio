<script lang="ts" context="module">
	import Fly from '$lib/components/animations/Fly.svelte';
</script>

<div class="flex h-full w-full items-center justify-center gap-2 text-7xl">
	{#each 'FoHoOV' as character, i}
		{#if i % 2 == 0}
			<Fly
				fromY={'5rem'}
				toY={'-0.3rem'}
				animationFillMode={'forwards'}
				animationTimingFunction={'cubic-bezier(1,.24,.57,.62)'}
			>
				<span>
					{character}
				</span>
			</Fly>
		{:else}
			<Fly
				fromY={'-5rem'}
				toY={'0.3rem'}
				animationFillMode={'forwards'}
				animationTimingFunction={'cubic-bezier(.15,1.57,.89,.87)'}
			>
				<span>
					{character}
				</span>
			</Fly>
		{/if}
	{/each}
</div>

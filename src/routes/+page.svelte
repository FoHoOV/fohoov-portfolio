<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import Fly from '$lib/components/animations/Fly.svelte';
	import Wiggle from '$lib/components/animations/Wiggle.svelte';
</script>

<script lang="ts">
	
	if(browser){
		const a = 
	}

</script>

<div class="flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	{#each 'FoHoOV' as character, i}
		{#if i % 2 == 0}
			<Fly
				fromY={'5rem'}
				toY={'-0.3rem'}
				animationDuration={'2s'}
				animationFillMode={'forwards'}
				animationTimingFunction={'cubic-bezier(1,.24,.57,.62)'}
			>
				<Fly start={false} toY={'1000px'} toX={'1000px'} animationFillMode={'forwards'}>
					<Wiggle animationDelay={'2s'} animationFillMode={'forwards'}>
						<span>
							{character}
						</span>
					</Wiggle>
				</Fly>
			</Fly>
		{:else}
			<Fly
				fromY={'-5rem'}
				toY={'0.3rem'}
				animationDuration={'2s'}
				animationFillMode={'forwards'}
				animationTimingFunction={'cubic-bezier(.15,1.57,.89,.87)'}
			>
				<Fly start={false} toY={'1000px'} toX={'1000px'} animationFillMode={'forwards'}>
					<Wiggle animationDelay={'2s'} animationFillMode={'forwards'}>
						<span>
							{character}
						</span>
					</Wiggle>
				</Fly>
			</Fly>
		{/if}
	{/each}
</div>

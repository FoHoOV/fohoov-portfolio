<p class="flex h-full w-full items-center justify-center gap-2 text-7xl">
	{#each 'FoHoOV' as character, i}
		<span class:translate-y-2={i % 2 == 0} class:translate-y-5={i % 2 == 1}>
			{character}
		</span>
	{/each}
</p>

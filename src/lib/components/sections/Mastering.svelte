<script lang="ts" context="module">
	import Skill from '$lib/components/skill/Skill.svelte';
	import SkillSet from '$lib/components/skill/SkillSet.svelte';

	import { getDelusionStateFromStore } from '$lib';
</script>

<script lang="ts">
	const delusion = getDelusionStateFromStore();
</script>

<SkillSet title="Learning">
	{#snippet children({ popEffect })}
		{#if !delusion.isDelusionOn$().current}
			<Skill
				text="React"
				level={'?'}
				baseColor="blue"
				gsaps={[(options) => popEffect(options, true)]}
			></Skill>
			<Skill
				text="Next"
				level={'?'}
				baseColor="greenyellow"
				gsaps={[(options) => popEffect(options)]}
			></Skill>
		{:else}
			<Skill text="React" level={1} baseColor={'blue'} gsaps={[(options) => popEffect(options)]}
			></Skill>
		{/if}
	{/snippet}
</SkillSet>

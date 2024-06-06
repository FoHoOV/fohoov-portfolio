<script lang="ts" context="module">
	import Skill from '$lib/components/skill/Skill.svelte';
	import SkillSet from '$lib/components/skill/SkillSet.svelte';

	import { getDelusionStateFromStore } from '$lib';
</script>

<script lang="ts">
	const delusion = getDelusionStateFromStore();
</script>

<SkillSet title="Skills">
	{#snippet children({ popEffect })}
		{#if !delusion.isDelusionOn$().current}
			<Skill
				text="Svelte"
				level={9}
				baseColor="orange"
				gsaps={[(options) => popEffect(options, true)]}
			></Skill>
			<Skill text="SvelteKit" level={7} baseColor="red" gsaps={[(options) => popEffect(options)]}
			></Skill>
			<Skill text="Fast API" level={6} baseColor={'green'} gsaps={[(options) => popEffect(options)]}
			></Skill>

			<Skill text="Flask" level={8} baseColor={'gray'} gsaps={[(options) => popEffect(options)]}
			></Skill>

			<Skill
				text="Tailwind (+daisyUI)"
				level={8}
				baseColor="blue"
				gsaps={[(options) => popEffect(options)]}
			></Skill>
			<Skill
				text="Typescript"
				level={9}
				baseColor={'#004cbb'}
				gsaps={[(options) => popEffect(options)]}
			></Skill>
		{:else}
			<Skill
				text="God level rust dev"
				level={11}
				baseColor={'orangered'}
				gsaps={[(options) => popEffect(options)]}
			></Skill>
		{/if}
	{/snippet}
</SkillSet>

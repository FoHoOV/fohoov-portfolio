<script lang="ts" module>
	import Skill from '$lib/components/skill/Skill.svelte';
	import SkillSet from '$lib/components/skill/SkillSet.svelte';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
</script>

<SkillSet class="flex flex-col lg:flex-row-reverse {className}" title="Learning">
	{#snippet children({ popEffect })}
		<Skill text="React" level={4} baseColor="blue" gsaps={[(options) => popEffect(options, true)]}>
		</Skill>

		<Skill text="GSAP!" level={3} baseColor="green" gsaps={[(options) => popEffect(options)]}>
		</Skill>

		<Skill text="Next" level={'?'} baseColor="greenyellow" gsaps={[(options) => popEffect(options)]}
		></Skill>

		<Skill
			text="Three.js (threlte)"
			level={'?'}
			baseColor="green"
			gsaps={[(options) => popEffect(options)]}>
		</Skill>
	{/snippet}
</SkillSet>

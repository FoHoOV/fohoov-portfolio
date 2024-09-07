<script lang="ts" module>
	import Skill from '$lib/components/skill/Skill.svelte';
	import SkillSet from '$lib/components/skill/SkillSet.svelte';
	import ThrelteSkillSet from '$lib/components/threlte/SkillSet.svelte';
	import { getThrelteSceneManager } from '$lib/stores';
	import { onMount } from 'svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
	const threlteSceneManager = getThrelteSceneManager();
	let skillSet: SkillSet | undefined = undefined;

	onMount(() => {
		const wrapper = skillSet?.getWrapper();
		if (!wrapper) {
			console.error('what?');
			return;
		}

		const skillSetSymbol = Symbol('ThrelteSkillSet');
		ScrollTrigger.create({
			trigger: wrapper,
			start: 'top center',
			end: 'end',
			onEnter: () => {
				console.log('oe called');
				threlteSceneManager.add(skillSetSymbol, {
					component: ThrelteSkillSet,
					props: () => {
						return {};
					},
					async beforeUnmount(component) {
						await component?.moveOutOfView();
					}
				});
			},
			onLeave: async () => {
				console.log('ol called');
				await threlteSceneManager.remove(skillSetSymbol);
			}
		});
	});
</script>

<SkillSet class="flex flex-col lg:flex-row {className}" title="Skills" bind:this={skillSet}>
	{#snippet children({ popEffect })}
		<!-- <Skill
			text="Svelte"
			level={9}
			baseColor="orange"
			gsaps={[(options) => popEffect(options, true)]}></Skill>

		<Skill text="SvelteKit" level={7} baseColor="red" gsaps={[(options) => popEffect(options)]}>
		</Skill>

		<Skill text="Fast API" level={6} baseColor={'green'} gsaps={[(options) => popEffect(options)]}>
		</Skill>

		<Skill text="Flask" level={8} baseColor={'gray'} gsaps={[(options) => popEffect(options)]}>
		</Skill>

		<Skill
			text="Tailwind (+daisyUI)"
			level={8}
			baseColor="blue"
			gsaps={[(options) => popEffect(options)]}>
		</Skill>

		<Skill
			text="TypeScript/JavaScript"
			level={9}
			baseColor={'#004cbb'}
			gsaps={[(options) => popEffect(options)]}>
		</Skill> -->
	{/snippet}
</SkillSet>

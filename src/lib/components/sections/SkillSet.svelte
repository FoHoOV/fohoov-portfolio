<script lang="ts" context="module">
	import type { TweenConfig } from '$lib/actions';
	import Skill from '$lib/components/Skill.svelte';
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
</script>

<script lang="ts">
	let timeLine: gsap.core.Timeline | undefined;
	function createPopEffect({ target, getTimeline }: TweenConfig, createTimeline: boolean = false) {
		if (createTimeline) {
			timeLine = getTimeline({
				scrollTrigger: {
					trigger: target,
					toggleActions: 'play reverse restart reverse'
				}
			});
		}
		if (!timeLine) {
			return;
		}
		timeLine.from(
			target,
			{
				scale: 0,
				duration: 0.45
			},
			createTimeline ? undefined : '>-0.27'
		);
	}
</script>

<div class="grid h-full w-full auto-rows-max items-center md:gap-20">
	<div class="sticky top-0 z-10 w-full self-start text-center">
		<GlowEffect>
			<h1 class="py-7 text-7xl font-extrabold backdrop-blur-sm sm:text-8xl">Skills</h1>
		</GlowEffect>
	</div>

	<Skill
		text="Svelte"
		level={9}
		baseColor="orange"
		gsaps={[(options) => createPopEffect(options, true)]}
	></Skill>
	<Skill text="SvelteKit" level={7} baseColor="red" gsaps={[(options) => createPopEffect(options)]}
	></Skill>
	<Skill
		text="Tailwind (+daisyUI)"
		level={8}
		baseColor="blue"
		gsaps={[(options) => createPopEffect(options)]}
	></Skill>
	<Skill
		text="Typescript"
		level={9}
		baseColor={'#004cbb'}
		gsaps={[(options) => createPopEffect(options)]}
	></Skill>
</div>

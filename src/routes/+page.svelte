<script lang="ts" module>
	import FoHoOV from '$lib/components/home/FoHoOV.svelte';
	import SkillSet from '$lib/components/home/SkillSet.svelte';
	import Learning from '$lib/components/home/Learning.svelte';
	import Projects from '$lib/components/home/Projects.svelte';
	import WorkExperience from '$lib/components/home/WorkExperience.svelte';
	import World from '$lib/components/threlte/World.svelte';

	import { Canvas } from '@threlte/core';
	import About from '$lib/components/home/About.svelte';
</script>

<script lang="ts">
	import ContactInfo from '$lib/components/home/ContactInfo.svelte';
</script>

<div class="fixed left-0 top-0 h-full w-full bg-transparent">
	<Canvas>
		<World bloom={false} debug={false}></World>
	</Canvas>
</div>

<FoHoOV />
<About />
<SkillSet />
<Learning class="pt-7" />
<Projects class="pt-7" />
<WorkExperience class="pt-7" />
<ContactInfo class="pt-7"></ContactInfo>

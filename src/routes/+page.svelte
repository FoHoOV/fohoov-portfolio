<script lang="ts" module>
	import FoHoOV from '$lib/components/home/FoHoOV.svelte';
	import WhatIKnow from '$lib/components/home/WhatIKnow.svelte';
	import Mastering from '$lib/components/home/Mastering.svelte';
	import Projects from '$lib/components/home/Projects.svelte';

	import World from '$lib/components/threlte/World.svelte';
	import { Canvas } from '@threlte/core';
</script>

<script lang="ts">
</script>

<div class="fixed left-0 top-0 z-50 h-full w-full bg-transparent">
	<Canvas>
		<World bloom={false} debug={false}></World>
	</Canvas>
</div>

<FoHoOV />
<WhatIKnow />
<Mastering class="pt-7" />
<Projects class="pt-7" />

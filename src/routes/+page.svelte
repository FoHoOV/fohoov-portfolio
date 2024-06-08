<script lang="ts" context="module">
	import FoHoOV from '$lib/components/home/FoHoOV.svelte';
	import WhatIKnow from '$lib/components/home/WhatIKnow.svelte';
	import Mastering from '$lib/components/home/Mastering.svelte';
	import Projects from '$lib/components/home/Projects.svelte';
	import Scene from '$lib/components/threlte-scenes/Scene.svelte';
	import { Canvas } from '@threlte/core';
</script>

<script lang="ts">
</script>

<div class="fixed left-0 top-0 h-full w-full">
	<Canvas>
		<Scene></Scene>
	</Canvas>
</div>

<FoHoOV />

<WhatIKnow />
<Mastering class="pt-7" />
<Projects class="pt-7" />

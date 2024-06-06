<script lang="ts" context="module">
	import FoHoOV from '$lib/components/home/FoHoOV.svelte';
	import WhatIKnow from '$lib/components/home/WhatIKnow.svelte';
	import Mastering from '$lib/components/home/Mastering.svelte';
</script>

<script lang="ts">
	import Projects from '$lib/components/home/Projects.svelte';
</script>

<FoHoOV />

<WhatIKnow />
<Mastering class="pt-7" />
<Projects class="pt-7" />

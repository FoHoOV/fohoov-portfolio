<script lang="ts" module>
	import Svg from '$lib/components/threlte/images/Svg.svelte';
	import SphereWithRotation, {
		type Props as SphereWithRotationProps
	} from '$lib/components/threlte/sphere/SphereWithRotation.svelte';

	export type Props = {
		url: string;
		distanceFromSphere?: number;
	} & SphereWithRotationProps;
</script>

<script lang="ts">
	let {
		url,
		distanceFromSphere = 0.2,
		ref = $bindable(undefined),
		children,
		...restProps
	}: Props = $props();
</script>

<SphereWithRotation bind:ref {...restProps}>
	<!-- TODO: scaling factor shouldn't be hardcoded like this, add a size? -->
	<Svg
		{url}
		scalingFactor={0.02}
		position={{ x: 0, y: 0, z: restProps.radius + distanceFromSphere }} />
	{@render children?.()}
</SphereWithRotation>

<script lang="ts" module>
	import Svg, { type SvgMaterialTypes } from '$lib/components/threlte/utils/images/Svg.svelte';
	import SphereWithRotation, {
		type Props as SphereWithRotationProps
	} from '$lib/components/threlte/utils/sphere/SphereWithRotation.svelte';

	export type Props = {
		url: string;
		distanceFromSphere?: number;
		svgMaterialType?: SvgMaterialTypes;
		size?: number;
	} & SphereWithRotationProps;
</script>

<script lang="ts">
	let {
		url,
		distanceFromSphere = 0.2,
		ref = $bindable(undefined),
		size = 2,
		svgMaterialType,
		children,
		...restProps
	}: Props = $props();
</script>

<SphereWithRotation bind:ref {...restProps}>
	<Svg
		{url}
		{size}
		position={{ x: 0, y: 0, z: restProps.radius + distanceFromSphere }}
		materialType={svgMaterialType} />
	{@render children?.()}
</SphereWithRotation>

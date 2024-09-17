<script lang="ts" module>
	import SphereWithImage, {
		type Props as SphereWithImageProps
	} from '$lib/components/threlte/sphere/SphereWithImage.svelte';

	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';

	export type Props = { scale?: never } & SphereWithImageProps;
</script>

<script lang="ts">
	let { ref = $bindable(undefined), ...restProps }: Props = $props();

	const zoom = fromStore(spring<number>(1));
</script>

<SphereWithImage
	bind:ref
	scale={zoom.current}
	onpointerenter={(e: unknown) => {
		zoom.current = 12 / 10;
	}}
	onpointerleave={(e: unknown) => {
		zoom.current = 10 / 12;
	}}
	{...restProps}>
</SphereWithImage>

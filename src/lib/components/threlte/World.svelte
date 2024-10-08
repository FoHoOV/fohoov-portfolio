<script lang="ts" module>
	import Scene from '$lib/components/threlte/Scene.svelte';

	import { T, useTask, useThrelte } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import { Color, EquirectangularReflectionMapping, Vector2 } from 'three';
	import {
		EffectComposer,
		OutputPass,
		RGBELoader,
		RenderPass,
		TAARenderPass,
		UnrealBloomPass
	} from 'three/examples/jsm/Addons.js';
	import { interactivity as enableInteractivity } from '@threlte/extras';

	export type Props = {
		bloom?: boolean;
		backgroundColor?: Color;
		interactivity?: boolean;
		/**
		 * relative to threlte/textures
		 */
		backgroundTexturePath?: string;
		debug?: boolean;
	};
</script>

<script lang="ts">
	const {
		bloom,
		backgroundColor,
		backgroundTexturePath,
		interactivity = true,
		debug = false
	}: Props = $props();
	const { scene, camera, renderer, renderStage } = useThrelte();
	let windowInnerHeight = $state(0);
	let windowInnerWidth = $state(0);

	if (backgroundColor) {
		addBackgroundColor(backgroundColor);
	}

	if (interactivity) {
		enableInteractivity();
	}

	if (backgroundTexturePath) {
		addBackgroundTexture(backgroundTexturePath);
	}

	if (bloom) {
		addBloom();
	}

	function addBackgroundTexture(textureName: string) {
		new RGBELoader().setPath('threlte/textures/').load(textureName, function (texture) {
			texture.mapping = EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;
		});
	}

	function addBackgroundColor(color: Color) {
		scene.background = color;
	}

	function addBloom() {
		const setupEffectComposer = (composer: EffectComposer) => {
			const renderPass = new RenderPass(scene, $camera);
			composer.addPass(renderPass);

			const taaRenderPass = new TAARenderPass(scene, $camera);
			composer.addPass(taaRenderPass);

			const bloomPass = new UnrealBloomPass(new Vector2(1, 1), 0.27, 0.2, 0.05);
			composer.addPass(bloomPass);

			const outputPass = new OutputPass();
			composer.addPass(outputPass);

			$effect.pre(() => {
				composer.setPixelRatio(window.devicePixelRatio);
				composer.setSize(windowInnerWidth, windowInnerHeight);
			});
		};

		$effect.pre(() => {
			const composer = new EffectComposer(renderer);
			setupEffectComposer(composer);

			useTask(
				() => {
					composer.render();
				},
				{ stage: renderStage, autoInvalidate: false }
			);
		});
	}
</script>

<svelte:window bind:innerHeight={windowInnerHeight} bind:innerWidth={windowInnerWidth} />

<T.PerspectiveCamera
	position={[0, 3, 25]}
	makeDefault
	oncreate={(ref) => {
		ref.lookAt(0, 0, 0);
	}}>
	{#if debug}
		<OrbitControls enableDamping target={[0, 0, 0]} />
	{/if}
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 0]} castShadow intensity={0.1}></T.DirectionalLight>
<T.AmbientLight intensity={10}></T.AmbientLight>

{#if debug}
	<T.AxesHelper args={[500]}></T.AxesHelper>

	<Grid
		cellColor="#ffffff"
		sectionColor="#ffffff"
		sectionThickness={0}
		fadeDistance={50}
		cellSize={1}
		infiniteGrid />
{/if}

<Scene></Scene>

<script lang="ts" context="module">
	import { T } from '@threlte/core';
	import Box from './Box.svelte';
</script>

<T.FogExp2 args={[0x00, 0.5]}></T.FogExp2>

<T.PerspectiveCamera
	makeDefault
	position={[1, 0, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}>
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 10, 10]} />

<T.AxesHelper args={[500]}></T.AxesHelper>

<Box></Box>

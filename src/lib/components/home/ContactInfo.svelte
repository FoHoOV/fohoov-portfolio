<script lang="ts" module>
	import Section from '$lib/components/section/Section.svelte';
	import Icon from '@iconify/svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
</script>

{#snippet info(
	title: string,
	icon: string,
	text: string,
	iconProps?: Partial<ComponentProps<Icon>>
)}
	<a
		class="group link flex flex-col items-center text-lg transition-transform hover:scale-125"
		href={text}
		target="_blank">
		<Icon {icon} class={'text-9xl'} {...iconProps} />
		<p
			class="md:-translate-y-5 md:scale-0 md:opacity-0 md:transition-all md:group-hover:translate-y-0 md:group-hover:scale-100 md:group-hover:opacity-100">
			{title}
		</p>
	</a>
{/snippet}

<Section title="Contact info" class="{className} flex h-full flex-col items-center">
	<div class="z-10 flex h-full flex-col items-center gap-20 pt-10 md:flex-row md:pt-0">
		{@render info('GitHub', 'mdi:github', 'https://github.com/FoHoOV')}
		{@render info(
			'LinkedIn',
			'mdi:linkedin',
			'https://www.linkedin.com/in/alireza-setayesh-mehr-891001332/',
			{
				color: '#0a66c2'
			}
		)}
		{@render info('Email', 'bxl:gmail', 'mailto:fohoov@gmail.com', { color: '#cf0000' })}
	</div>
</Section>

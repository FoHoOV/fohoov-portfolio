<script lang="ts" module>
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	export type Props = {
		year: string;
		title: string;
		lineColorClassName?: string;
		iconColorClassName?: string;
		direction?: 'start' | 'end';
		class?: string;
		children: Snippet;
		bottom?: Snippet;
	};
</script>

<script lang="ts">
	const {
		year,
		title,
		class: className,
		lineColorClassName,
		iconColorClassName,
		direction = 'start',
		children,
		bottom
	}: Props = $props();
</script>

<li class="px-2 {className}">
	<hr />
	<div class="timeline-middle">
		<Icon class={`text-4xl ${iconColorClassName}`} icon="lets-icons:check-ring"></Icon>
	</div>
	<div
		class="{direction === 'start'
			? 'timeline-start md:text-end'
			: 'timeline-end md:text-start'} timeline-box mb-10">
		<time class="font-mono text-2xl italic">{year}</time>
		<div class="text-4xl font-black">{title}</div>
		<div class="pt-2 text-lg {iconColorClassName}">
			{@render children()}
		</div>
		{#if bottom}
			<div class="pt-2">
				{@render bottom()}
			</div>
		{/if}
	</div>
	{#if lineColorClassName}
		<hr class={lineColorClassName} />
	{/if}
</li>

<script lang="ts" module>
	import Code from '$lib/components/daisy/Code.svelte';
	import Section from '$lib/components/section/Section.svelte';
	import { TimeLine } from '$lib/components/daisy/timeline';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
</script>

<Section class={className} title={'Work experience'}>
	<TimeLine.Root class="pt-10">
		<TimeLine.Item
			year={'2020'}
			title={'SAM Steel Sina'}
			lineColorClassName={'bg-secondary'}
			iconColorClassName={'text-secondary'}
			direction="start">
			Created a E-commerce from scratch using <Code text="python" />, <Code text="vanilla TS/JS" /> and
			<Code text="vanilla CSS" />
			{#snippet bottom()}
				<div class="badge badge-secondary badge-outline">Flask</div>
				<div class="badge badge-secondary badge-outline">TS/JS</div>
				<div class="badge badge-secondary badge-outline">CSS</div>
			{/snippet}
		</TimeLine.Item>
		<TimeLine.Item
			year={'2021'}
			title={'Teaching Web'}
			lineColorClassName={'bg-accent'}
			iconColorClassName={'text-accent'}
			direction="end">
			Started teaching online classes about web fundamentals
			{#snippet bottom()}
				<div class="badge badge-accent badge-outline">web fundamentals</div>
			{/snippet}
		</TimeLine.Item>
		<TimeLine.Item
			year={'2022'}
			title={'Intech'}
			lineColorClassName={'bg-primary'}
			iconColorClassName={'text-primary'}
			direction="start">
			We worked on <Code text="NativeScript + Angular" /> with <Code text="xplat" />
			to create a cross platform applications
			{#snippet bottom()}
				<div class="badge badge-primary badge-outline">NativeScript</div>
				<div class="badge badge-primary badge-outline">XPlat</div>
			{/snippet}
		</TimeLine.Item>
		<TimeLine.Item
			year={'now'}
			title={'Keshavarzi Bank'}
			lineColorClassName={'bg-success'}
			iconColorClassName={'text-success'}
			direction="end">
			<ol>
				<li>
					Maintaining and developing
					<a href="https://ib.bki.ir" target="_blank">Internet Banking</a> of Keshavarzi
				</li>
				<li>
					Maintaining and developing <a href="https://accounts.bki.ir" target="_blank"
						>Open Banking</a> of Keshavarzi
				</li>
				<li>
					Creating micro frontends using <Code text="React" /> and <Code text="MUI" />
				</li>
			</ol>
			{#snippet bottom()}
				<div class="badge badge-success badge-outline">React</div>
				<div class="badge badge-success badge-outline">ASP.NET</div>
				<div class="badge badge-success badge-outline">micro fronts</div>
				<div class="badge badge-success badge-outline">MUI</div>
			{/snippet}
		</TimeLine.Item>
	</TimeLine.Root>
</Section>

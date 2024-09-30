<script lang="ts" module>
	import Code from '$lib/components/daisy/Code.svelte';
	import Section from '$lib/components/section/Section.svelte';
	import { TimeLine } from '$lib/components/daisy/timeline/index.svelte';

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
			year={'2019'}
			title={'Intech'}
			lineColorClassName={'bg-primary'}
			iconColorClassName={'text-primary'}
			direction="start">
			We worked on <Code text="NativeScript + Angular" /> with <Code text="xplat" />
			to create a cross platform applications
		</TimeLine.Item>
		<TimeLine.Item
			year={'2020'}
			title={'Teaching Web'}
			lineColorClassName={'bg-accent'}
			iconColorClassName={'text-accent'}
			direction="end">
			Started teaching online classes about web fundamentals
		</TimeLine.Item>
		<TimeLine.Item
			year={'2021'}
			title={'SAM Steel Sina'}
			lineColorClassName={'bg-secondary'}
			iconColorClassName={'text-secondary'}
			direction="start">
			Created a E-commerce from scratch using <Code text="python, TS and vanilla CSS" />
		</TimeLine.Item>
		<TimeLine.Item
			year={'now'}
			title={'Keshavarzi Bank'}
			lineColorClassName={'bg-success'}
			iconColorClassName={'text-success'}
			direction="end">
			<ol>
				<li>
					Doing Full stack development maintaining and adding feature to
					<a href="ib.bki.ir" target="_blank">Internet Bank</a>
				</li>
				<li>
					Creating micro frontends using <Code text="React" /> and <Code text="MUI" />
				</li>
			</ol>
		</TimeLine.Item>
	</TimeLine.Root>
</Section>

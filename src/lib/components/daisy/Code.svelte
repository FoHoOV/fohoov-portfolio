<script lang="ts" module>
	export type Props = {
		text: string;
		prefix?: string;
		class?: string;
	};
</script>

<script lang="ts">
	const { prefix, text, class: cls }: Props = $props();
</script>

<pre data-prefix={prefix} class="inline font-bold {cls}"><code>{text}</code></pre>

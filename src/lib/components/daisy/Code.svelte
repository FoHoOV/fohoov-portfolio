<script lang="ts" module>
	export type Props = {
		text: string;
		prefix?: string;
	};
</script>

<script lang="ts">
	const { prefix, text }: Props = $props();
</script>

<pre data-prefix={prefix} class="inline font-bold"><code>{text}</code></pre>

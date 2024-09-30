<script lang="ts" module>
	export type Props = {
		text: string;
		prefix?: string;
	};
</script>

<script lang="ts">
	const { prefix, code }: Props = $props();
</script>

<pre data-prefix={prefix} class="inline"><code>{code}</code></pre>

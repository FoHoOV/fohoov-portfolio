import type { Options } from './css-var-types';

function convertToKebabCase(prop: string) {
	return prop.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function addPrefix(value: string, prefix: string) {
	return value.replace('--', `--${prefix}-`);
}

function convertToCssVars(node: HTMLElement, options: Options) {
	$effect(() => {
		Object.entries({ ...options.defaults, ...options.props }).forEach(([key, value]) => {
			if (key.startsWith('$$slots')) {
				return;
			}

			if (!key.startsWith('--')) {
				key = `--${convertToKebabCase(key)}`;
			}

			if (options.prefixWith) {
				key = addPrefix(key, options.prefixWith);
			}

			node.style.removeProperty(key);
			node.style.setProperty(key, value.toString());
		});
	});
}

export { convertToCssVars as cssVars };

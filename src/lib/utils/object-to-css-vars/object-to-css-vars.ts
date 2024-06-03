import type { Options } from './types';

function convertToKebabCase(prop: string) {
	return prop.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function addPrefix(value: string, prefix: string) {
	return value.replace('--', `--${prefix}-`);
}

export function getCssVarsObject(options: Options) {
	const result: Record<string, string> = {}; // TODO: type to --${prefix}-key: value
	Object.entries({ ...options.defaults, ...options.props }).forEach(([key, value]) => {
		if (key.startsWith('$$slots')) {
			return null;
		}

		if (!key.startsWith('--')) {
			key = `--${convertToKebabCase(key)}`;
		}

		if (options.prefixWith) {
			key = addPrefix(key, options.prefixWith);
		}
		result[key] = value.toString();
	});

	return result;
}

export function getCssVarsString(options: Options) {
	const varsObj = getCssVarsObject(options);
	return Object.entries(varsObj)
		.map(([key, value]) => `${key}: ${value}`)
		.join(';');
}

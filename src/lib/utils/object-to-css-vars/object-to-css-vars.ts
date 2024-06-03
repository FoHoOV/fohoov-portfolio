import type { Options, Prefix, Props } from './types';

type ConvertToKebabCase<TString> = TString extends `${infer T}${infer U}`
	? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${ConvertToKebabCase<U>}`
	: TString;

type ConvertToCssVar<TKey, TPrefix extends string> = {
	[K in keyof TKey as K extends string
		? K extends `--${string}`
			? K
			: `--${TPrefix}-${ConvertToKebabCase<K>}`
		: never]: string;
};

function convertToKebabCase<TString extends string>(prop: TString): ConvertToKebabCase<TString> {
	return prop.replace(/([A-Z])/g, '-$1').toLowerCase() as ConvertToKebabCase<TString>;
}

function addPrefix(value: string, prefix: string) {
	return value.replace('--', `--${prefix}-`);
}

export function getCssVarsObject<TProps extends Props, TPrefix extends Prefix>(
	options: Options<TProps, TPrefix>
): ConvertToCssVar<TProps, TPrefix> {
	const result: ConvertToCssVar<TProps, TPrefix> = {} as ConvertToCssVar<TProps, TPrefix>;

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(result as any)[key] = value.toString();
	});
	return result;
}

export function getCssVarsString<TProps extends Props, TPrefix extends Prefix>(
	options: Options<TProps, TPrefix>
) {
	const varsObj = getCssVarsObject(options);
	return Object.entries(varsObj)
		.map(([key, value]) => `${key}: ${value}`)
		.join(';');
}

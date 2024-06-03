import { getCssVarsObject, type Options } from "$lib/utils/object-to-css-vars";

function convertToCssVars(node: HTMLElement, options: Options) {
	$effect(() => {
		const varsObj = getCssVarsObject(options);
		Object.entries(varsObj).forEach(([key, value]) => {
			node.style.removeProperty(key);
			node.style.setProperty(key, value.toString());
		});
	});
}

export { convertToCssVars as cssVars };

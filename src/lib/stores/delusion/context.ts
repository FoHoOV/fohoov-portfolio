import { getContext, setContext } from '$lib/stores';
import type { DelusionManager } from './delusion.svelte';

export const DELUSION_CONTEXT_KEY = Symbol();

export function setDelusionManager(store: DelusionManager, setToRoot: boolean = true) {
	return setContext(store, DELUSION_CONTEXT_KEY, setToRoot);
}

export function getDelusionManager() {
	return getContext<DelusionManager>(DELUSION_CONTEXT_KEY);
}

import { getContext, setContext } from '$lib/stores';
import type { StorageProxy } from './storage-proxy';

const STORAGE_TYPES_CONTEXT_KEY = Symbol();

export function getStorageProxy() {
	return getContext<StorageProxy>(STORAGE_TYPES_CONTEXT_KEY);
}

export function setStorageProxy(store: StorageProxy, setToRoot: boolean = true) {
	return setContext(store, STORAGE_TYPES_CONTEXT_KEY, setToRoot);
}

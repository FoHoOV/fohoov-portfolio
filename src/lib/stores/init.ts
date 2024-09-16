import { createRootContextManager } from '$lib/stores/context-manager';
import { setDelusionManager, DelusionManager } from '$lib/stores/delusion';
import { Persisted, setPersistedUtils } from '$lib/stores/persisted';
import { setTheme, ThemeManager } from '$lib/stores/theme';
import { setThrelteSceneManager, ThrelteSceneManager } from '$lib/stores/threlte-scene';
import { StorageProxy, setStorageProxy } from '$lib/utils';

export function initGlobalStores(sharedCookies: App.Locals['sharedCookies']) {
	createRootContextManager();

	const storageProxy = new StorageProxy({ initialCookies: sharedCookies });
	const persisted = new Persisted(storageProxy);

	return {
		themeManager: setTheme(new ThemeManager(persisted)),
		delusionStateManager: setDelusionManager(new DelusionManager(persisted)),
		threlteSceneManager: setThrelteSceneManager(new ThrelteSceneManager()),
		persistedUtils: setPersistedUtils(persisted),
		storageTypes: setStorageProxy(storageProxy)
	};
}

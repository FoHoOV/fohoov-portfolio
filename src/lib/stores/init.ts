import { createRootContextManager } from '$lib/stores/context-manager';
import { setDelusionManager, DelusionManager } from '$lib/stores/delusion';
import { Persisted, setPersistedUtils } from '$lib/stores/persisted';
import { setTheme, ThemeManager } from '$lib/stores/theme';
import { setThrelteSceneManager, ThrelteSceneManager } from '$lib/stores/threlte-scene';
import { StorageTypes, setStorageTypes } from '$lib/utils';

export function initGlobalStores(sharedCookies: App.Locals['sharedCookies']) {
	createRootContextManager();

	const storageTypes = new StorageTypes({ initialCookies: sharedCookies });
	const persisted = new Persisted(storageTypes);

	return {
		themeManager: setTheme(new ThemeManager(persisted)),
		delusionStateManager: setDelusionManager(new DelusionManager(persisted)),
		threlteSceneManager: setThrelteSceneManager(new ThrelteSceneManager()),
		persistedUtils: setPersistedUtils(persisted),
		storageTypes: setStorageTypes(storageTypes)
	};
}

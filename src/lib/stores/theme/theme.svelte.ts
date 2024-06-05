import { CACHED_THEME_KEY_NAME, THEME_CONTEXT } from './constants';
import { getRootContextManager, persisted } from '$lib';

export class ThemeManager {
	#storedTheme = persisted.cookie$<{ value: 'dark' | 'light' }>(CACHED_THEME_KEY_NAME, {
		initializer: { value: 'dark' }
	});

	getSelectedTheme$() {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		return {
			get current() {
				return self.#storedTheme.current.value;
			}
		};
	}

	setTheme(theme: 'dark' | 'light') {
		this.#storedTheme.current = { value: theme };
	}
}

export function setThemeManagerToStore(store: ThemeManager) {
	return getRootContextManager().add(THEME_CONTEXT, store);
}

export function getThemeManagerFromStore() {
	const value = getRootContextManager().get<ThemeManager>(THEME_CONTEXT);
	if (!value) {
		throw new Error('theme store is not initialized yet');
	}

	return value;
}

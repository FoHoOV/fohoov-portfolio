import { ROOT_CONTEXT_MANAGER_KEY } from './constants';
import { getContext, setContext } from 'svelte';

class ContextManager {
	private _contexts: Record<string | number | symbol, unknown> = $state({});

	add<TContext>(key: string | number | symbol, value: TContext) {
		this._contexts[key] = value;
		return value;
	}

	delete(key: string | number | symbol) {
		delete this._contexts[key];
	}

	get<TContext>(key: string | number | symbol) {
		return this._contexts[key] as TContext;
	}

	get$<TContext>(key: string | number | symbol) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		return {
			get value$() {
				return self._contexts[key] as TContext;
			}
		};
	}
}
export const contextManager = new ContextManager();

export function createRootContextManager() {
	setContext(ROOT_CONTEXT_MANAGER_KEY, contextManager);
}

export function getRootContextManager() {
	return getContext<ContextManager>(ROOT_CONTEXT_MANAGER_KEY);
}

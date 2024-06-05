import { getRootContextManager } from '$lib';
import { persisted } from '$lib/stores/persisted';
import { CACHED_DELUSION_VALUE, DELUSION_CONTEXT } from './constants';

export class DelusionManager {
	private _delusionState = persisted.cookie$<{ value: boolean }>(CACHED_DELUSION_VALUE, {
		initializer: {
			value: false
		}
	});

	isDelusionOn$() {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		return {
			get current() {
				return self._delusionState.current.value;
			}
		};
	}

	toggleDelusionState() {
		this._delusionState.current = this._delusionState.current.value
			? { value: false }
			: { value: true };
	}
}

export function setDelusionStateToStore(store: DelusionManager) {
	return getRootContextManager().add(DELUSION_CONTEXT, store);
}

export function getDelusionStateFromStore() {
	const value = getRootContextManager().get<DelusionManager>(DELUSION_CONTEXT);
	if (!value) {
		throw new Error('delusion store is not initialized yet');
	}

	return value;
}

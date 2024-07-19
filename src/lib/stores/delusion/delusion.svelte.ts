import type { Persisted } from '$lib';
import { SHARED_KEYS } from '$lib/constants/cookie';

export class DelusionManager {
	#delusionState;

	constructor(persisted: Persisted) {
		this.#delusionState = persisted.cookie$<{ isOn: boolean }>(SHARED_KEYS.delusionState, {
			initializer: {
				isOn: false
			}
		});
	}

	isDelusionOn$() {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		return {
			get current() {
				return self.#delusionState.value$.isOn;
			}
		};
	}

	toggleDelusionState() {
		this.#delusionState.value$ = this.#delusionState.value$.isOn ? { isOn: false } : { isOn: true };
	}
}

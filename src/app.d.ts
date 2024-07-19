// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			sharedCookies: Record<(typeof SHARED_KEYS)[keyof typeof SHARED_KEYS], string | undefined>;
		}

		// interface Error {}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

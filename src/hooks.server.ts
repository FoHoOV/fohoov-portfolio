import { StorageTypes } from '$lib';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// doing this might not be good, it might access other sessions? if doesn't take the
	// current request as param internally, I might be f'ed
	StorageTypes.cookieManager = {
		set: event.cookies.set,
		get: event.cookies.get
	};
	return await resolve(event);
};

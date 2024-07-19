import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SHARED_KEYS } from '$lib/constants/cookie';

export const setSharedCookies: Handle = async ({ event, resolve }) => {
	const result = {} as App.Locals['sharedCookies'];
	for (const value of Object.values(SHARED_KEYS)) {
		result[value] = event.cookies.get(value);
	}
	event.locals.sharedCookies = result;
	return await resolve(event);
};

export const handle: Handle = sequence(setSharedCookies);

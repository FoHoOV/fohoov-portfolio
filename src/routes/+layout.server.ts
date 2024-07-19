import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		sharedCookies: locals.sharedCookies
	};
}) satisfies LayoutServerLoad;

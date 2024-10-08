import { LocalStorage } from './local-storage';
import { Cookies } from './cookies';
import { browser } from '$app/environment';

type ConstructorParams = {
	initialCookies: Record<string, string | undefined>;
};

export class StorageProxy {
	public readonly cookies;
	public readonly localStorage;

	constructor({ initialCookies }: ConstructorParams) {
		this.cookies = new Cookies();
		this.localStorage = new LocalStorage();

		if (initialCookies && !browser) {
			this.cookies.from(
				Object.entries(initialCookies)
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.filter(([_, value]) => value !== undefined)
					.map(([key, value]) => {
						return { name: key, value: value };
					}) as { value: string; name: string }[]
			);
		}
	}
}

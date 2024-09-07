import { gsap as gsapCore } from 'gsap';
import type { GsapOptions, TweenCreator } from './types';

export function gsapCreator(node: Element, creators: GsapOptions) {
	$effect(() => {
		if (creators.length === 0) {
			return;
		}
		const context = gsapCore.context(() => {
			const timeLines = new Map<string, gsap.core.Timeline>();
			const creatorOptions: Parameters<TweenCreator>[0] = {
				target: node,
				getTimeline: (options) => {
					let timeLine: gsap.core.Timeline | undefined = undefined;

					if (options?.label) {
						timeLine = timeLines.get(options.label);
					}

					if (!timeLine) {
						if (options?.errorIfLabelDoesntExist) {
							throw new Error(`timeline with label ${options?.label} not found!`);
						}
						timeLine = gsapCore.timeline(options);
						// eslint-disable-next-line @typescript-eslint/no-unused-expressions
						options?.label && timeLines.set(options.label, timeLine);
					}

					return timeLine;
				}
			};
			creators.forEach((creator) => {
				creator(creatorOptions);
			});
		});

		return () => {
			context.kill();
		};
	});
}

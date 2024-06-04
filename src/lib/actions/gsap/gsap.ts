import { gsap as gsapCore } from 'gsap';
import type { GsapOptions, TweenCreator } from './types';

export function gsapCreator(node: HTMLElement, creators: GsapOptions) {
	const createAnimations = () => {
		return gsapCore.context(() => {
			const timeLines = new Map<string, gsap.core.Timeline>();

			const creatorOptions: Parameters<TweenCreator>[0] = {
				target: node,
				createTimeline: (options) => {
					let timeLine: gsap.core.Timeline | undefined = undefined;

					if (options?.label) {
						timeLine = timeLines.get(options.label);
					}

					if (!timeLine) {
						timeLine = gsapCore.timeline(options);
						if (options?.label) {
							timeLines.set(options.label, timeLine);
						}
					}
					return timeLine;
				},
				getTimeline: (label) => {
					const timeLine = timeLines.get(label);
					if (!timeLine) {
						throw new Error(`timeline with label ${label} not found!`);
					}
					return timeLine;
				}
			};
			creators?.forEach((creator) => {
				creator(creatorOptions);
			});
		});
	};

	const context = createAnimations();

	return {
		destroy() {
			context.revert();
		}
	};
}

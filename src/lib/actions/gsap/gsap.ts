import { gsap as gsapCore } from 'gsap';
import type { GsapOptions, TweenCreator } from './types';

export function gsapCreator(node: HTMLElement, creators: GsapOptions) {
	const createAnimations = () => {
		return gsapCore.context(() => {
			const timeLines = new Map<string, gsap.core.Timeline>();

			const creatorOptions: Parameters<TweenCreator>[0] = {
				target: node,
				getTimeline: (options, label) => {
					let timeLine: gsap.core.Timeline | undefined = undefined;

					if (label) {
						timeLine = timeLines.get(label);
					}

					if (!timeLine) {
						timeLine = gsapCore.timeline(options);
						if (label) {
							timeLines.set(label, timeLine);
						}
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

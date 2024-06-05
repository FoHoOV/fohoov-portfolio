import { gsap as gsapCore } from 'gsap';
import type { GsapOptions, TweenCreator } from './types';

export function gsapCreator(node: HTMLElement, creators: GsapOptions) {
	const createAnimations = () => {
		return gsapCore.context(() => {
			const timeLines = new Map<string, gsap.core.Timeline>();

			const creatorOptions: Parameters<TweenCreator>[0] = {
				target: node,
				getTimeline: (options) => {
					let timeLine: gsap.core.Timeline | undefined = undefined;

					if (options?.label) {
						timeLine = timeLines.get(options.label);
					}

					if (!timeLine) {
						if (options?.errorIfNotExists) {
							throw new Error(`timeline with label ${options?.label} not found!`);
						}
						timeLine = gsapCore.timeline(options);
						options?.label && timeLines.set(options.label, timeLine);
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
		update() {
			throw new Error('update for gsap action is not handled yet');
		},
		destroy() {
			context.kill();
		}
	};
}

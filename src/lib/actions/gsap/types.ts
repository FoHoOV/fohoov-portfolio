export type TimeLineCreator = (
	options?: gsap.TimelineVars & { label?: string },
	dontAttemptToCreate?: boolean
) => gsap.core.Timeline;

export type TweenCreator = (config: {
	target: HTMLElement;
	/**
	 * creates a timeline and returns that. If a label is provided,
	 * it will cache the created timeline so it will never recreate timelines
	 * with the same timeline (only for this element).
	 *
	 * if `dontAttemptToCreate` is set, it will throw an error if the `options.label` doesn't exist
	 *
	 * @throws {Error}
	 */
	getTimeline: TimeLineCreator;
}) => void;

export type GsapOptions = TweenCreator[];

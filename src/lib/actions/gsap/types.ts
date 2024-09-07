export type TimeLineCreator = (
	options?: gsap.TimelineVars & { label?: string; errorIfLabelDoesntExist?: boolean }
) => gsap.core.Timeline;

export type TweenConfig = {
	target: Element;
	/**
	 * creates a timeline and returns that. If a label is provided,
	 * it will cache the created timeline so it won't recreate timelines
	 * with the same label (only for this element).
	 *
	 * if `options.errorIfLabelDoesntExist` is set, it will throw an error if the `options.label` doesn't exist
	 *
	 * @throws {Error}
	 */
	getTimeline: TimeLineCreator;
};

export type TweenCreator = (config: TweenConfig) => void;

export type GsapOptions = TweenCreator[];

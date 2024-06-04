export type TimeLineCreator = (
	options?: gsap.TimelineVars & { label?: string }
) => gsap.core.Timeline;
export type TimeLineGetter = (label: string) => gsap.core.Timeline;
export type TweenCreator = (config: {
	target: HTMLElement;
	/**
	 * creates a timeline and returns that. If a label is provided,
	 * it will cache the created timeline so it will never recreate timelines
	 * with the same timeline (only for this element)
	 */
	createTimeline: TimeLineCreator;
	/**
	 * gets a timeline with the associated label. If it does doesn't exist it will
	 * throw an error
	 * @throws {Error}
	 */
	getTimeline: TimeLineGetter;
}) => void;

export type GsapOptions = TweenCreator[];

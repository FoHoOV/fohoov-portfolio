export type TimeLineCreator = (options?: gsap.TimelineVars, label?: string) => gsap.core.Timeline;
export type TweenCreator = (config: {
	target: HTMLElement;
	getTimeline: TimeLineCreator;
}) => void;

export type GsapOptions = TweenCreator[];

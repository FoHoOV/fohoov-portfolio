import type { Property } from 'csstype';

export type AnimationProps = {
	animationDuration?: Property.AnimationDuration;
	animationTimingFunction?: Property.AnimationTimingFunction;
	animationDelay?: Property.AnimationDelay;
	animationFillMode?: Property.AnimationFillMode;
	animationDirection?: Property.AnimationDirection;
	animationIterationCount?: Property.AnimationIterationCount;
};

export type CssValue = `${number}px` | `${number}rem` | `${number}%`;

export type WithAnimationProps<T> = T & AnimationProps;

export type Options = {
	props: AnimationProps;
	defaults?: AnimationProps;
	prefixWith?: string;
};

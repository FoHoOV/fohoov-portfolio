import type { Property } from 'csstype';

export type AnimationProps = {
	animationDuration?: Property.AnimationDuration;
	animationTimingFunction?: Property.AnimationTimingFunction;
	animationDelay?: Property.AnimationDelay;
	animationFillMode?: Property.AnimationFillMode;
	animationDirection?: Property.AnimationDirection;
	animationIterationCount?: Property.AnimationIterationCount;
};

export type WithAnimationProps<T> = T & AnimationProps;

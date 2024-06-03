import { WithAnimationProps } from '../../utils/types/animation-props';
export type AnimationProps<T> = WithAnimationProps<
	{
		start?: boolean;
	} & T
>;

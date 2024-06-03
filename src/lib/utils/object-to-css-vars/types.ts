export type Props = Record<string, string | number>;
export type Prefix = string;

export type Options<TProps extends Props, TPrefix extends Prefix> = {
	props: TProps;
	defaults?: TProps;
	prefixWith?: TPrefix;
};

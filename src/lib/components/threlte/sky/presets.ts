export const presets = {
	sunset: {
		turbidity: 10,
		rayleigh: 3,
		azimuth: 180,
		elevation: 0.5,
		mieCoefficient: 0.005,
		mieDirectionalG: 0.7,
		exposure: 0.37
	},
	noon: {
		turbidity: 0.65,
		rayleigh: 0.17,
		azimuth: 180,
		elevation: 85,
		mieCoefficient: 0.013,
		mieDirectionalG: 0.7,
		exposure: 1
	},
	afternoon: {
		turbidity: 4.78,
		rayleigh: 0.3,
		azimuth: 180,
		elevation: 30,
		mieCoefficient: 0.002,
		mieDirectionalG: 0.86,
		exposure: 0.65
	},
	night: {
		turbidity: 20,
		rayleigh: 0.57,
		azimuth: 180,
		elevation: -5,
		mieCoefficient: 0.038,
		mieDirectionalG: 0,
		exposure: 0.26
	}
} as const satisfies Record<
	string,
	{
		turbidity: number;
		rayleigh: number;
		azimuth: number;
		elevation: number;
		mieCoefficient: number;
		mieDirectionalG: number;
		exposure: number;
	}
>;

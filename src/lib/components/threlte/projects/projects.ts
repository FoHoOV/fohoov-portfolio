export const projects = [
	{
		projectUrl: 'https://samsteelsina.vercel.app/',
		imageUrl: '/images/samsteel-light.png',
		name: 'Sam Steel Sina'
	},
	{
		projectUrl: 'https://project-management-fohoov.vercel.app/user/projects',
		imageUrl: '/images/project-management-dark.png',
		name: 'Project management'
	}
] as const satisfies { projectUrl: string; imageUrl: `/images/${string}`; name: string }[];

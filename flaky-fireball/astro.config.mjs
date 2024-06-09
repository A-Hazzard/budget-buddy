import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Introduction',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Getting Started', link: '/home/home' },
					],
				},
				{
					label: 'Report',
					autogenerate: { directory: 'report' },
				},
				{
					label: 'Setup',
					autogenerate: { directory: 'setup' },
				},
				
			],
		}),
	],
});

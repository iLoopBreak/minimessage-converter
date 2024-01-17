/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		fontFamily: {
			catamaran: ['Catamaran', 'monospace'],
			minecraft: ['Minecraft', 'monospace'],
		}
	},
	plugins: [
		require('tailwindcss-animated')
	],
}

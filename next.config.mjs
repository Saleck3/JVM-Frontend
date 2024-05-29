/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
	reactStrictMode: true,
	distDir: 'dist',
	images: {
		domains: ['th.bing.com', 'i.imgur.com'],
	},
};

export default nextConfig;

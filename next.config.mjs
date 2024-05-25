/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
	reactStrictMode: true,
	distDir: 'dist',
	images: {
		domains: ['th.bing.com'],
	},
};

export default nextConfig;

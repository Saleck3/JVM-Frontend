/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
	reactStrictMode: true,
	basePath: isProd ? '/JVM-Frontend' : '',
	assetPrefix: isProd ? '/JVM-Frontend/' : '',
	distDir: 'dist',
};

export default nextConfig;

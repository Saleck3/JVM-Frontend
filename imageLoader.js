const isProd = process.env.NODE_ENV === 'production';

export default function myImageLoader({ src }) {
	return isProd ? `/JVM-Frontend${src}` : `${src}`;
}

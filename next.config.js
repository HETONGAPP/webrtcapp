/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode: true,
    distDir: 'build',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/viewer',
                permanent: true,
            },
        ]
    },
    experimental: {
        serverActions: true,
    },
    env: {
        BASE_URL: process.env.BASE_URL,
    }
};

module.exports = {
    ...nextConfig,
    webpack: (config, { isServer, webpack }) => {
        config.plugins.push(
            // Remove node: from import specifiers, because Next.js does not yet support node: scheme
            // https://github.com/vercel/next.js/issues/28774
            new webpack.NormalModuleReplacementPlugin(
                /^node:/,
                (resource) => {
                    resource.request = resource.request.replace(/^node:/, '');
                },
            ),
        );
        if (isServer) {
            config.externals.push({
                "bufferutil": "bufferutil",
                "utf-8-validate": "utf-8-validate",
            });
        }
        return config;
    },
};
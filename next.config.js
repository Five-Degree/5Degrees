/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },

            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
        ],
    },
    transpilePackages: ["@mui/system", "@mui/material", "@mui/icons-material"],
    modularizeImports: {
        "@mui/material/?(((\\w*)?/?)*)": {
            transform: "@mui/material/{{ matches.[1] }}/{{member}}",
        },
        "@mui/icons-material/?(((\\w*)?/?)*)": {
            transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
        },
    },
}

module.exports = nextConfig

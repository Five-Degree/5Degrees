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
}

module.exports = nextConfig

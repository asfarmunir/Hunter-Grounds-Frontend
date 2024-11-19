/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint:{
        //remove these lines if you want to use eslint
        ignoreDuringBuilds: true,
    },
    typescript:{
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: ["images.unsplash.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
              {
             protocol: "https",
             hostname: "utfs.io",
              },
              {
                protocol: "https",
                hostname: "res.cloudinary.com",
              }
        ],
    },
};

export default nextConfig;

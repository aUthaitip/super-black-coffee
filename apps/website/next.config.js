import {
  assertSanityDeployment,
  resolveSanityEnvironment,
} from "./src/sanity/environment.mjs";

const sanity = resolveSanityEnvironment({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
});
assertSanityDeployment(sanity.dataset, {
  vercelEnv: process.env.VERCEL_ENV,
  deploymentEnv: process.env.SANITY_DEPLOYMENT_ENV,
  nodeEnv: process.env.NODE_ENV,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;

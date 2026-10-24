import { resolveSanityEnvironment } from "./environment.mjs";

// Direct property access lets Next.js inline the same values into Studio's
// browser bundle as the server-side Sanity read client.
export const { projectId, dataset, apiVersion } = resolveSanityEnvironment({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
});

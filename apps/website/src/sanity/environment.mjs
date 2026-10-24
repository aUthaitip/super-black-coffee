/**
 * Shared by Next config, the public read client and the embedded Studio.
 * All values returned here are public configuration, never API tokens.
 * @param {{ projectId?: string, dataset?: string, apiVersion?: string }} input
 */
export function resolveSanityEnvironment(input) {
  const projectId = input.projectId?.trim();
  const dataset = input.dataset?.trim();
  if (!projectId) {
    throw new Error(
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID for the website deployment.",
    );
  }
  if (dataset !== "development" && dataset !== "production") {
    throw new Error(
      "Set NEXT_PUBLIC_SANITY_DATASET explicitly to development (local/Preview) or production (live website).",
    );
  }
  return {
    projectId,
    dataset,
    apiVersion: input.apiVersion?.trim() || "2024-01-01",
  };
}

/**
 * NODE_ENV=production also applies to Preview and local production builds.
 * Only the hosting environment identifies a live production deployment.
 * @param {string} dataset
 * @param {{ vercelEnv?: string, deploymentEnv?: string, nodeEnv?: string }} environment
 */
export function assertSanityDeployment(dataset, environment) {
  const deployment = environment.vercelEnv || environment.deploymentEnv;
  if (
    deployment &&
    !["development", "preview", "production"].includes(deployment)
  ) {
    throw new Error(
      "Set SANITY_DEPLOYMENT_ENV to development, preview or production.",
    );
  }
  const expected =
    deployment === "production"
      ? "production"
      : deployment ||
          environment.nodeEnv === "development" ||
          environment.nodeEnv === "test"
        ? "development"
        : undefined;
  if (expected && dataset !== expected) {
    throw new Error(
      `Sanity environment mismatch: ${deployment || environment.nodeEnv} must use the ${expected} dataset, received ${dataset}.`,
    );
  }
}

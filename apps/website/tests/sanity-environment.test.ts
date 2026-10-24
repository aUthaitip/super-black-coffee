import assert from "node:assert/strict";
import { test } from "node:test";
import {
  assertSanityDeployment,
  resolveSanityEnvironment,
} from "../src/sanity/environment.mjs";

test("missing configuration cannot silently use the production dataset", () => {
  assert.throws(() => resolveSanityEnvironment({}), /PROJECT_ID/);
  assert.throws(
    () => resolveSanityEnvironment({ projectId: "043s7ari" }),
    /DATASET/,
  );
  assert.throws(
    () => resolveSanityEnvironment({ projectId: "043s7ari", dataset: " " }),
    /DATASET/,
  );
  assert.throws(
    () =>
      resolveSanityEnvironment({ projectId: "043s7ari", dataset: "prodution" }),
    /DATASET/,
  );
});

test("server and Studio resolve the same explicit public configuration", () => {
  assert.deepEqual(
    resolveSanityEnvironment({ projectId: "043s7ari", dataset: "development" }),
    {
      projectId: "043s7ari",
      dataset: "development",
      apiVersion: "2024-01-01",
    },
  );
});

for (const environment of ["development", "preview"] as const) {
  test(`${environment} rejects production data, including production-mode Preview builds`, () => {
    assert.doesNotThrow(() =>
      assertSanityDeployment("development", {
        vercelEnv: environment,
        nodeEnv: "production",
      }),
    );
    assert.throws(
      () =>
        assertSanityDeployment("production", {
          vercelEnv: environment,
          nodeEnv: "production",
        }),
      /mismatch/,
    );
  });
}

test("live production rejects development data", () => {
  assert.doesNotThrow(() =>
    assertSanityDeployment("production", {
      vercelEnv: "production",
      nodeEnv: "production",
    }),
  );
  assert.throws(
    () =>
      assertSanityDeployment("development", {
        vercelEnv: "production",
        nodeEnv: "production",
      }),
    /mismatch/,
  );
});

test("local dev rejects production but local production builds may test development data", () => {
  assert.throws(
    () => assertSanityDeployment("production", { nodeEnv: "development" }),
    /mismatch/,
  );
  assert.doesNotThrow(() =>
    assertSanityDeployment("development", { nodeEnv: "production" }),
  );
});

test("other hosts can declare environment; Vercel's actual environment takes precedence", () => {
  assert.throws(
    () => assertSanityDeployment("production", { deploymentEnv: "preview" }),
    /mismatch/,
  );
  assert.throws(
    () =>
      assertSanityDeployment("development", { deploymentEnv: "production" }),
    /mismatch/,
  );
  assert.throws(
    () =>
      assertSanityDeployment("production", {
        vercelEnv: "preview",
        deploymentEnv: "production",
      }),
    /mismatch/,
  );
  assert.throws(
    () => assertSanityDeployment("development", { deploymentEnv: "prodution" }),
    /SANITY_DEPLOYMENT_ENV/,
  );
});

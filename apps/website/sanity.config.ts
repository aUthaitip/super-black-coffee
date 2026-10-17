"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  name: "superblackcoffee",
  title: "Super Black Coffee Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});

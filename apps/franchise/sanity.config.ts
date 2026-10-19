import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./lib/sanity";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "superblack_franchise",
  title: "Super Black Coffee - Franchise Studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});

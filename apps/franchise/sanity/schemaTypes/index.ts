import { type SchemaTypeDefinition } from "sanity";
import { franchiseCategory } from "./franchiseCategory";
import { franchiseProduct } from "./franchiseProduct";

export const schemaTypes: SchemaTypeDefinition[] = [franchiseCategory, franchiseProduct];

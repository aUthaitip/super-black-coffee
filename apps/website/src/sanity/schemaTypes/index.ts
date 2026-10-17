import { type SchemaTypeDefinition } from "sanity";
import { menuItem } from "./menuItem";
import { post } from "./post";
import { branch } from "./branch";
import { promotion } from "./promotion";

export const schemaTypes: SchemaTypeDefinition[] = [
  menuItem,
  post,
  branch,
  promotion,
];

import { type SchemaTypeDefinition } from "sanity";
import { menuItem } from "./menuItem";
import { post } from "./post";
import { branch } from "./branch";
import { promotion } from "./promotion";
import { franchiseProduct } from "./franchiseProduct";

export const schemaTypes: SchemaTypeDefinition[] = [
  menuItem,
  post,
  branch,
  promotion,
  franchiseProduct,
];

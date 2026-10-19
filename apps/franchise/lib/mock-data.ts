import { Product, FranchiseUser, Order } from "./types";

// Empty initial states - no mock branches or orders
export const INITIAL_BRANCHES: FranchiseUser[] = [];

// Base catalog (will also sync with Sanity / Database)
export const MOCK_PRODUCTS: Product[] = [];

// Empty initial orders
export const INITIAL_ORDERS: Order[] = [];

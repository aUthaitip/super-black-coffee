export type AccountApprovalStatus = "pending_approval" | "approved" | "rejected";

export interface FranchiseUser {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  branchName: string;
  branchCode?: string;
  phone: string;
  contractFileUrl?: string;
  address?: string;
  approvalStatus: AccountApprovalStatus;
  submittedAt?: string;
  approvedAt?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: "coffee_beans" | "syrups_sauces" | "tea_powder" | "packaging" | "equipment";
  categoryName: string;
  unit: string;
  price: number;
  marketPrice: number;
  image: string;
  stockQuantity: number; // เลขสต็อกคงเหลือจาก Sanity
  isAvailable: boolean; // ปุ่มเปิด-ปิดขายจาก Sanity (เปิด = มีสินค้า / ปิด = สินค้าหมด)
  description: string;
  minOrder?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = "pending_review" | "approved_processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  branchCode: string;
  branchName: string;
  contactName: string;
  phone: string;
  shippingAddress: string;
  items: {
    productId: string;
    productName: string;
    sku: string;
    unit: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  grandTotal: number;
  status: OrderStatus;
  paymentMethod: "bank_transfer";
  paymentSlipUrl: string;
  paymentSlipName?: string;
  transferTime?: string;
  confirmedAt?: string;
  confirmedBy?: string;
  trackingNumber?: string;
  deliveryCarrier?: string;
  salesNotes?: string;
}

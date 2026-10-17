"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FranchiseUser, CartItem, Order, Product, AccountApprovalStatus } from "./types";
import { MOCK_PRODUCTS, INITIAL_ORDERS } from "./mock-data";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password?: string;
  branchName: string;
  phone: string;
  contractFileUrl: string;
}

interface StoreContextType {
  user: FranchiseUser | null;
  isLoggedIn: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string; status?: AccountApprovalStatus; user?: FranchiseUser };
  register: (data: RegisterPayload) => { success: boolean; error?: string; user?: FranchiseUser };
  approveBranch: (userId: string) => void;
  updateUserAddress: (newAddress: string) => void;
  logout: () => void;
  products: Product[];
  toggleProductAvailability: (productId: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (orderData: {
    paymentSlipUrl: string;
    paymentSlipName?: string;
    shippingAddress: string;
    shippingNotes?: string;
  }) => Order;
  confirmOrderPayment: (orderId: string, adminName?: string) => void;
  getOrderById: (id: string) => Order | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FranchiseUser | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("sbc_franchise_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedOrders = localStorage.getItem("sbc_franchise_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      const savedProducts = localStorage.getItem("sbc_franchise_products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      // Try fetching published products from Sanity
      import("./sanity").then(({ sanityClient, urlFor }) => {
        sanityClient
          .fetch(`*[_type == "franchiseProduct"] | order(order asc, _createdAt desc)`)
          .then((sanityProducts) => {
            if (sanityProducts && sanityProducts.length > 0) {
              const mapped: Product[] = sanityProducts.map((sp: any) => ({
                id: sp._id,
                name: sp.name,
                sku: sp.sku,
                category: sp.category,
                price: sp.price,
                marketPrice: sp.marketPrice || Math.round(sp.price * 1.2),
                unit: sp.unit,
                stockQuantity: typeof sp.stockQuantity === "number" ? sp.stockQuantity : 100,
                isAvailable: sp.isAvailable !== false && (sp.stockQuantity ?? 1) > 0,
                image: sp.image ? urlFor(sp.image).width(600).height(600).url() : "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
                description: sp.description || "",
              }));
              setProducts(mapped);
              localStorage.setItem("sbc_franchise_products", JSON.stringify(mapped));
            }
          })
          .catch(() => {
            // Silently retain cached or mock products if offline or sanity unpopulated
          });
      });
    } catch {
      // Fallback
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const toggleProductAvailability = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
      );
      localStorage.setItem("sbc_franchise_products", JSON.stringify(updated));
      return updated;
    });
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stockQuantity: newStock,
              isAvailable: newStock > 0 ? p.isAvailable : false,
            }
          : p
      );
      localStorage.setItem("sbc_franchise_products", JSON.stringify(updated));
      return updated;
    });
  };

  const login = (email: string, password?: string) => {
    try {
      const storedUsersRaw = localStorage.getItem("sbc_registered_users");
      const storedUsers: FranchiseUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      const found = storedUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (found) {
        if (found.password && password && found.password !== password) {
          return {
            success: false,
            error: "รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
          };
        }

        if (found.approvalStatus === "pending_approval") {
          return {
            success: false,
            status: "pending_approval" as AccountApprovalStatus,
            error: "บัญชีสาขาของคุณอยู่ระหว่างรอเจ้าหน้าที่ฝ่ายสัญญาตรวจสอบใบสัญญาซื้อขายแฟรนไชส์ (ยังไม่ได้รับอนุมัติให้เข้าใช้)",
            user: found,
          };
        }
        if (found.approvalStatus === "rejected") {
          return {
            success: false,
            status: "rejected" as AccountApprovalStatus,
            error: "ใบสัญญาซื้อขายแฟรนไชส์ของคุณไม่ผ่านการตรวจสอบ กรุณาติดต่อฝ่ายแฟรนไชส์บริษัท โทร 02-123-4567",
            user: found,
          };
        }

        setUser(found);
        localStorage.setItem("sbc_franchise_user", JSON.stringify(found));
        return { success: true, status: "approved" as AccountApprovalStatus, user: found };
      }

      // Default demo branch if user tests with siam@superblack.co
      if (email.trim().toLowerCase() === "siam@superblack.co") {
        const demoUser: FranchiseUser = {
          id: "branch-siam",
          email: "siam@superblack.co",
          fullName: "คุณสมชาย มุ่งมั่นพาณิชย์",
          branchName: "สาขาสยามสแควร์วัน",
          branchCode: "SBC-BKK-007",
          phone: "089-123-4567",
          contractFileUrl: "contract_sbc_siam.pdf",
          address: "388 อาคารสยามสแควร์วัน ชั้น 2 ห้อง 204 ถนนพระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330",
          approvalStatus: "approved",
          approvedAt: "2026-10-01 09:00",
        };
        setUser(demoUser);
        localStorage.setItem("sbc_franchise_user", JSON.stringify(demoUser));
        return { success: true, status: "approved" as AccountApprovalStatus, user: demoUser };
      }

      return {
        success: false,
        error: "ไม่พบบัญชีอีเมลนี้ในระบบ กรุณาตรวจสอบอีเมลหรือลงทะเบียนใหม่",
      };
    } catch {
      return { success: false, error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" };
    }
  };

  const register = (data: RegisterPayload) => {
    try {
      if (!data.contractFileUrl) {
        return {
          success: false,
          error: "ต้องแนบไฟล์สัญญาซื้อขายแฟรนไชส์จึงจะสามารถสมัครได้",
        };
      }

      const storedUsersRaw = localStorage.getItem("sbc_registered_users");
      const storedUsers: FranchiseUser[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

      const duplicate = storedUsers.some(
        (u) => u.email.toLowerCase() === data.email.trim().toLowerCase()
      );

      if (duplicate) {
        return { success: false, error: "อีเมลนี้ได้ลงทะเบียนไปแล้ว" };
      }

      const nowStr = new Date().toLocaleString("th-TH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

      const newUser: FranchiseUser = {
        id: "branch-" + Date.now(),
        email: data.email.trim(),
        password: data.password,
        fullName: data.fullName.trim(),
        branchName: data.branchName.trim(),
        branchCode: "SBC-" + Math.floor(100 + Math.random() * 900),
        phone: data.phone.trim(),
        contractFileUrl: data.contractFileUrl,
        address: "", // Will be filled completely in checkout
        approvalStatus: "pending_approval",
        submittedAt: nowStr,
      };

      storedUsers.push(newUser);
      localStorage.setItem("sbc_registered_users", JSON.stringify(storedUsers));

      return { success: true, user: newUser };
    } catch {
      return { success: false, error: "เกิดข้อผิดพลาดในการลงทะเบียน" };
    }
  };

  const approveBranch = (userId: string) => {
    const storedUsersRaw = localStorage.getItem("sbc_registered_users");
    if (!storedUsersRaw) return;
    const storedUsers: FranchiseUser[] = JSON.parse(storedUsersRaw);
    const updated = storedUsers.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          approvalStatus: "approved" as AccountApprovalStatus,
          approvedAt: new Date().toLocaleString("th-TH"),
        };
      }
      return u;
    });
    localStorage.setItem("sbc_registered_users", JSON.stringify(updated));

    if (user?.id === userId) {
      const approvedUser = updated.find((u) => u.id === userId) || null;
      setUser(approvedUser);
      localStorage.setItem("sbc_franchise_user", JSON.stringify(approvedUser));
    }
  };

  const updateUserAddress = (newAddress: string) => {
    if (!user) return;
    const updated = { ...user, address: newAddress };
    setUser(updated);
    localStorage.setItem("sbc_franchise_user", JSON.stringify(updated));

    const storedUsersRaw = localStorage.getItem("sbc_registered_users");
    if (storedUsersRaw) {
      const storedUsers: FranchiseUser[] = JSON.parse(storedUsersRaw);
      const list = storedUsers.map((u) => (u.id === user.id ? { ...u, address: newAddress } : u));
      localStorage.setItem("sbc_registered_users", JSON.stringify(list));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sbc_franchise_user");
    setCart([]);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = ({
    paymentSlipUrl,
    paymentSlipName,
    shippingAddress,
    shippingNotes,
  }: {
    paymentSlipUrl: string;
    paymentSlipName?: string;
    shippingAddress: string;
    shippingNotes?: string;
  }): Order => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.07 * 100) / 100;
    const shippingFee = subtotal >= 5000 ? 0 : 250;
    const grandTotal = subtotal + tax + shippingFee;

    const newOrder: Order = {
      id: "ord-" + Date.now(),
      orderNumber: `SBC-ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toLocaleString("th-TH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      branchCode: user?.branchCode || "SBC-GENERAL",
      branchName: user?.branchName || "สาขาแฟรนไชส์",
      contactName: user?.fullName || "เจ้าของสาขา",
      phone: user?.phone || "-",
      shippingAddress: shippingAddress.trim(),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        sku: item.product.sku,
        unit: item.product.unit,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
      })),
      subtotal,
      tax,
      shippingFee,
      grandTotal,
      status: "pending_review",
      paymentMethod: "bank_transfer",
      paymentSlipUrl,
      paymentSlipName: paymentSlipName || "transfer_slip.jpg",
      transferTime: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      salesNotes: shippingNotes ? `หมายเหตุ: ${shippingNotes} (สลิปโอนส่งถึงแอดมินแล้ว รอตรวจสอบ)` : "ส่งสลิปโอนเงินเข้าฝ่ายขาย/แอดมินแล้ว รอตรวจสอบยอด",
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem(
      "sbc_franchise_orders",
      JSON.stringify(updatedOrders)
    );
    clearCart();
    return newOrder;
  };

  // Admin action: Confirm payment & approve order
  const confirmOrderPayment = (orderId: string, adminName = "เจ้าหน้าที่แอดมินฝ่ายขาย") => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: "approved_processing" as const,
          confirmedAt: new Date().toLocaleString("th-TH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          confirmedBy: adminName,
          salesNotes: "แอดมินตรวจสอบสลิปการโอนเงินถูกต้อง ยืนยันการจัดซื้อเรียบร้อย ส่งคำสั่งเตรียมสินค้าไปยังคลัง",
        };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem("sbc_franchise_orders", JSON.stringify(updated));
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        isLoggedIn: !!user && user.approvalStatus === "approved",
        login,
        register,
        approveBranch,
        updateUserAddress,
        logout,
        products,
        toggleProductAvailability,
        updateProductStock,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        createOrder,
        confirmOrderPayment,
        getOrderById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};

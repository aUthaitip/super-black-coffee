"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FranchiseUser, CartItem, Order, Product, AccountApprovalStatus, CompanyAdminUser, OrderStatus } from "./types";
import { MOCK_PRODUCTS, INITIAL_ORDERS, INITIAL_BRANCHES } from "./mock-data";
import { PageLoader } from "@/components/ui/page-loader";

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
  rejectBranch: (userId: string) => void;
  registeredBranches: FranchiseUser[];
  updateUserAddress: (newAddress: string) => void;
  logout: () => void;
  adminUser: CompanyAdminUser | null;
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, password: string) => { success: boolean; error?: string };
  adminLogout: () => void;
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
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void;
  getOrderById: (id: string) => Order | undefined;
  clearAllData: () => void;
  refreshData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FranchiseUser | null>(null);
  const [adminUser, setAdminUser] = useState<CompanyAdminUser | null>(null);
  const [registeredBranches, setRegisteredBranches] = useState<FranchiseUser[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem("sbc_registered_users");
        if (local) return JSON.parse(local);
      } catch {}
    }
    return INITIAL_BRANCHES;
  });
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem("sbc_franchise_orders");
        if (local) return JSON.parse(local);
      } catch {}
    }
    return INITIAL_ORDERS;
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedUserRaw = localStorage.getItem("sbc_franchise_user");
      if (savedUserRaw) {
        try {
          const parsed = JSON.parse(savedUserRaw);
          if (
            parsed.email === "siam@superblack.co" ||
            parsed.id === "branch-007" ||
            parsed.id === "branch-siam"
          ) {
            localStorage.removeItem("sbc_franchise_user");
            setUser(null);
          } else {
            setUser(parsed);
          }
        } catch {
          localStorage.removeItem("sbc_franchise_user");
          setUser(null);
        }
      }

      const savedAdmin = localStorage.getItem("sbc_admin_user");
      if (savedAdmin) {
        setAdminUser(JSON.parse(savedAdmin));
      }

      // 2. Load registered branches from API (Database) with localStorage fallback
      fetch("/api/branches")
        .then((res) => (res.ok ? res.json() : null))
        .then((dbBranches) => {
          if (Array.isArray(dbBranches) && dbBranches.length > 0) {
            setRegisteredBranches(dbBranches);
            localStorage.setItem("sbc_registered_users", JSON.stringify(dbBranches));
          } else if (Array.isArray(dbBranches)) {
            // DB is empty, check if we had locally created branches
            const localRaw = localStorage.getItem("sbc_registered_users");
            if (localRaw) {
              try {
                const parsed = JSON.parse(localRaw);
                if (parsed.length > 0) {
                  // Keep local branches and re-sync
                  setRegisteredBranches(parsed);
                  return;
                }
              } catch {}
            }
            setRegisteredBranches([]);
          }
        })
        .catch(() => {
          const localRaw = localStorage.getItem("sbc_registered_users");
          if (localRaw) {
            try {
              setRegisteredBranches(JSON.parse(localRaw));
            } catch {}
          }
        });

      // 3. Load orders from API (Database) with localStorage fallback
      fetch("/api/orders")
        .then((res) => (res.ok ? res.json() : null))
        .then((dbOrders) => {
          if (Array.isArray(dbOrders) && dbOrders.length > 0) {
            setOrders(dbOrders);
            localStorage.setItem("sbc_franchise_orders", JSON.stringify(dbOrders));
          } else {
            const localOrders = localStorage.getItem("sbc_franchise_orders");
            if (localOrders) {
              setOrders(JSON.parse(localOrders));
            } else {
              setOrders([]);
            }
          }
        })
        .catch(() => {
          const localOrders = localStorage.getItem("sbc_franchise_orders");
          if (localOrders) {
            setOrders(JSON.parse(localOrders));
          }
        });

      localStorage.removeItem("sbc_franchise_products");

      // Fetch products exclusively from Sanity CMS
      import("./sanity").then(({ sanityClient, urlFor }) => {
        sanityClient
          .fetch(
            `*[_type == "franchiseProduct"] | order(order asc, _createdAt desc){
              ...,
              "categorySlug": coalesce(category->slug.current, category, ""),
              "categoryTitle": coalesce(category->title, categoryName, "")
            }`
          )
          .then((sanityProducts) => {
            if (Array.isArray(sanityProducts) && sanityProducts.length > 0) {
              const mapped: Product[] = sanityProducts.map((sp: any) => ({
                id: sp._id,
                name: sp.name,
                sku: sp.sku,
                category: sp.categorySlug || sp.category,
                categoryName: sp.categoryTitle || sp.categoryName || "ทั่วไป",
                price: sp.price,
                marketPrice: sp.marketPrice || Math.round(sp.price * 1.2),
                unit: sp.unit,
                stockQuantity: typeof sp.stockQuantity === "number" ? sp.stockQuantity : 100,
                isAvailable: sp.isAvailable !== false && (sp.stockQuantity ?? 1) > 0,
                image: sp.image ? urlFor(sp.image).width(600).height(600).url() : "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
                description: sp.description || "",
              }));
              setProducts(mapped);
            } else {
              setProducts([]);
            }
          })
          .catch(() => {
            setProducts([]);
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

      const updated = [newUser, ...registeredBranches];
      setRegisteredBranches(updated);
      localStorage.setItem("sbc_registered_users", JSON.stringify(updated));

      // Post to database API asynchronously
      fetch("/api/branches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((saved) => {
          if (saved && saved.id) {
            setRegisteredBranches((prev) =>
              prev.map((b) => (b.email === saved.email ? { ...b, id: saved.id } : b))
            );
          }
        })
        .catch(() => {});

      return { success: true, user: newUser };
    } catch {
      return { success: false, error: "เกิดข้อผิดพลาดในการลงทะเบียน" };
    }
  };

  const approveBranch = (userId: string) => {
    const updated = registeredBranches.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          approvalStatus: "approved" as AccountApprovalStatus,
          approvedAt: new Date().toLocaleString("th-TH"),
        };
      }
      return u;
    });
    setRegisteredBranches(updated);
    localStorage.setItem("sbc_registered_users", JSON.stringify(updated));

    // Sync to DB
    fetch("/api/branches", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, approvalStatus: "approved" }),
    }).catch(() => {});

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

    // Sync to DB
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newOrder,
        branchId: user?.id,
      }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((saved) => {
        if (saved && saved.id) {
          setOrders((prev) =>
            prev.map((o) => (o.orderNumber === saved.orderNumber ? { ...o, id: saved.id } : o))
          );
        }
      })
      .catch(() => {});

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

    // Sync to DB
    fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: orderId,
        status: "approved_processing",
        confirmedBy: adminName,
      }),
    }).catch(() => {});
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          ...(trackingNumber ? { trackingNumber } : {}),
          ...(carrier ? { deliveryCarrier: carrier } : {}),
        };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem("sbc_franchise_orders", JSON.stringify(updated));

    // Sync to DB
    fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: orderId,
        status,
        trackingNumber,
        deliveryCarrier: carrier,
      }),
    }).catch(() => {});
  };

  const adminLogin = (email: string, password: string) => {
    if (
      email.trim().toLowerCase() === "admin@rbc.co.th" &&
      password === "rbc22026"
    ) {
      const admin: CompanyAdminUser = {
        id: "admin-rbc-01",
        email: "Admin@rbc.co.th",
        name: "ผู้ดูแลระบบ บจก. Super Black Coffee (Head Office)",
        role: "company_admin",
      };
      setAdminUser(admin);
      localStorage.setItem("sbc_admin_user", JSON.stringify(admin));
      return { success: true };
    }
    return {
      success: false,
      error: "อีเมลหรือรหัสผ่านผู้ดูแลระบบไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
    };
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem("sbc_admin_user");
  };

  const rejectBranch = (userId: string) => {
    const updated = registeredBranches.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          approvalStatus: "rejected" as AccountApprovalStatus,
        };
      }
      return u;
    });
    setRegisteredBranches(updated);
    localStorage.setItem("sbc_registered_users", JSON.stringify(updated));

    // Sync to DB
    fetch("/api/branches", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, approvalStatus: "rejected" }),
    }).catch(() => {});

    if (user?.id === userId) {
      const rejectedUser = updated.find((u) => u.id === userId) || null;
      setUser(rejectedUser);
      localStorage.setItem("sbc_franchise_user", JSON.stringify(rejectedUser));
    }
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  const refreshData = async () => {
    try {
      const [branchesRes, ordersRes] = await Promise.all([
        fetch("/api/branches").then((r) => (r.ok ? r.json() : null)),
        fetch("/api/orders").then((r) => (r.ok ? r.json() : null)),
      ]);

      if (Array.isArray(branchesRes)) {
        setRegisteredBranches(branchesRes);
        localStorage.setItem("sbc_registered_users", JSON.stringify(branchesRes));
      }
      if (Array.isArray(ordersRes)) {
        setOrders(ordersRes);
        localStorage.setItem("sbc_franchise_orders", JSON.stringify(ordersRes));
      }
    } catch {
      // Ignore
    }
  };

  const clearAllData = () => {
    localStorage.removeItem("sbc_registered_users");
    localStorage.removeItem("sbc_franchise_orders");
    localStorage.removeItem("sbc_franchise_user");
    localStorage.removeItem("sbc_franchise_products");
    setRegisteredBranches([]);
    setOrders([]);
    setUser(null);
    setCart([]);
    setProducts([]);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <PageLoader subtitle="กำลังโหลดข้อมูลระบบแฟรนไชส์..." />
      </div>
    );
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        isLoggedIn: !!user && user.approvalStatus === "approved",
        login,
        register,
        approveBranch,
        rejectBranch,
        registeredBranches,
        updateUserAddress,
        logout,
        adminUser,
        isAdminLoggedIn: !!adminUser,
        adminLogin,
        adminLogout,
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
        updateOrderStatus,
        getOrderById,
        clearAllData,
        refreshData,
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

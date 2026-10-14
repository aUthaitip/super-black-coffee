import { FranchiseInquiry, ContactMessage } from "@/types";

const FRANCHISE_STORAGE_KEY = "super_black_franchise_inquiries_demo";
const CONTACT_STORAGE_KEY = "super_black_contact_messages_demo";

export function getDemoFranchiseInquiries(): FranchiseInquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FRANCHISE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDemoFranchiseInquiry(inquiry: Omit<FranchiseInquiry, "id" | "createdAt">): FranchiseInquiry {
  const newRecord: FranchiseInquiry = {
    ...inquiry,
    id: `INQ-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    try {
      const list = getDemoFranchiseInquiries();
      localStorage.setItem(FRANCHISE_STORAGE_KEY, JSON.stringify([newRecord, ...list]));
    } catch {
      // Ignore
    }
  }
  return newRecord;
}

export function getDemoContactMessages(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CONTACT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDemoContactMessage(msg: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
  const newRecord: ContactMessage = {
    ...msg,
    id: `MSG-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    try {
      const list = getDemoContactMessages();
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify([newRecord, ...list]));
    } catch {
      // Ignore
    }
  }
  return newRecord;
}

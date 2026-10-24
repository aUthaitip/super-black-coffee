# Super Black Coffee - Database Schema & Architecture Diagrams

เอกสารสรุปการออกแบบฐานข้อมูล โครงสร้างโมเดล ความสัมพันธ์ของข้อมูล (ERD) และไดอะแกรมระบบทั้งหมดของโปรเจกต์ **Super Black Coffee**

---

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    Admin {
        String id PK "cuid()"
        String email UK "อีเมลเข้าสู่ระบบ (Unique)"
        String password "รหัสผ่านแฮช"
        String name "ชื่อ-นามสกุลแอดมิน"
        String role "company_admin"
        DateTime createdAt
        DateTime updatedAt
    }

    Branch {
        String id PK "cuid()"
        String email UK "อีเมลสาขา (Unique)"
        String password "รหัสผ่าน"
        String fullName "ชื่อผู้ติดต่อ/เจ้าของสาขา"
        String branchName "ชื่อสาขา"
        String branchCode UK "รหัสสาขา เช่น SBC-001"
        String phone "เบอร์โทรศัพท์"
        String contractFileUrl "URL ไฟล์สัญญาแนบ"
        String address "ที่อยู่จัดส่ง/ที่ตั้งสาขา"
        String approvalStatus "pending_approval | approved | rejected"
        String submittedAt "วันที่ยื่นคำขอ"
        String approvedAt "วันที่อนุมัติสาขา"
        DateTime createdAt
        DateTime updatedAt
    }

    Category {
        String id PK "cuid()"
        String slug UK "slug หมวดหมู่ เช่น coffee_beans"
        String name "ชื่อหมวดหมู่"
        String description "รายละเอียดหมวดหมู่"
        String image "รูปไอคอน/ภาพหมวดหมู่"
        Int order "ลำดับการแสดงผล"
        DateTime createdAt
        DateTime updatedAt
    }

    Product {
        String id PK "cuid()"
        String sku UK "รหัสสินค้า เช่น CF-001"
        String name "ชื่อสินค้า/วัตถุดิบ"
        String categoryId FK "เชื่อมโยง Category"
        String categorySlug "slug หมวดหมู่"
        String categoryName "ชื่อหมวดหมู่"
        String unit "หน่วยนับ เช่น กก., ลัง"
        Float price "ราคาส่งแฟรนไชส์"
        Float marketPrice "ราคาตลาดอ้างอิง"
        String image "URL รูปสินค้า"
        Int stockQuantity "จำนวนสต็อกคงเหลือ"
        Boolean isAvailable "เปิด/ปิด การจำหน่าย"
        String description "คำอธิบายสินค้า"
        Int minOrder "จำนวนขั้นต่ำในการสั่งซื้อ"
        Int order "ลำดับการแสดงผล"
        DateTime createdAt
        DateTime updatedAt
    }

    Order {
        String id PK "cuid()"
        String orderNumber UK "เลขที่คำสั่งซื้อ เช่น ORD-123456"
        String branchId FK "เชื่อมโยง Branch"
        String branchCode "รหัสสาขา"
        String branchName "ชื่อสาขา"
        String contactName "ชื่อผู้สั่ง"
        String phone "เบอร์โทรศัพท์"
        String shippingAddress "ที่อยู่สำหรับจัดส่ง"
        Float subtotal "ยอดรวมสินค้า"
        Float tax "ภาษีมูลค่าเพิ่ม 7%"
        Float shippingFee "ค่าจัดส่ง"
        Float grandTotal "ยอดชำระสุทธิ"
        String status "pending_review | approved_processing | shipped | delivered | cancelled"
        String paymentMethod "bank_transfer"
        String paymentSlipUrl "URL สลิปการโอนเงิน"
        String paymentSlipName "ชื่อไฟล์สลิป"
        String transferTime "เวลาที่โอนเงิน"
        String confirmedAt "เวลาที่แอดมินตรวจสอบ"
        String confirmedBy "ผู้ตรวจสอบ (Admin Name)"
        String trackingNumber "เลขพัสดุสำหรับติดตาม"
        String deliveryCarrier "ผู้ให้บริการจัดส่ง"
        String salesNotes "หมายเหตุจากแอดมิน"
        DateTime createdAt
        DateTime updatedAt
    }

    OrderItem {
        String id PK "cuid()"
        String orderId FK "Cascade Delete กับ Order"
        String productId FK "เชื่อมโยง Product"
        String productName "ชื่อสินค้า ณ เวลาที่สั่ง"
        String sku "รหัส SKU"
        String unit "หน่วยสินค้า"
        Int quantity "จำนวนที่สั่ง"
        Float price "ราคาต่อหน่วย"
        Float total "ยอดรวมรายการนี้"
        DateTime createdAt
    }

    %% Relationships
    Branch ||--o{ Order : "สร้างออเดอร์ (1:N)"
    Category ||--o{ Product : "จัดหมวดหมู่สินค้า (1:N)"
    Order ||--|{ OrderItem : "ประกอบด้วยรายการสินค้า (1:N, Cascade)"
    Product ||--o{ OrderItem : "ถูกสั่งซื้อใน (1:N)"
```

---

## 2. System Architecture & Data Flow Diagram

```mermaid
flowchart TD
    subgraph Clients["📱 Client Applications (Monorepo)"]
        Web["🌐 website (:3000)<br/>เว็บไซต์หลัก ลูกค้าทั่วไป และแบรนด์"]
        Franchise["☕ franchise (:3002)<br/>ระบบแฟรนไชส์ B2B, สั่งของ, แจ้งโอน"]
        Admin["🏢 admin (:3001)<br/>ระบบสำนักงานใหญ่ Head Office"]
        Stock["📦 stock (:3003)<br/>ระบบตรวจนับสต็อกพนักงานหน้าร้าน"]
    end

    subgraph DataLayer["💾 Data & Content Storage"]
        subgraph PostgresDB["🐘 PostgreSQL Database (Prisma ORM)"]
            T_Admin["Admin Table"]
            T_Branch["Branch Table"]
            T_Order["Order Table"]
            T_OrderItem["OrderItem Table"]
            T_Product["Product Table"]
            T_Category["Category Table"]
        end

        subgraph SanityCMS["☁️ Sanity CMS"]
            S_Media["Media Assets & Photos"]
            S_Menu["Menu Items (เมนูเครื่องดื่มหน้าร้าน)"]
            S_Promo["Promotions & News Blogs"]
        end
    end

    %% Interactions
    Franchise -->|"สมัครสมาชิก / สั่งซื้อ / ตรวจสอบคำสั่งซื้อ"| PostgresDB
    Admin -->|"ตรวจสอบสลิป / อนุมัติสาขา / ใส่ Tracking"| PostgresDB
    Stock -->|"อัปเดตสต็อกคงเหลือ"| PostgresDB
    Web -->|"ดึงข้อมูลเมนูหน้าร้าน ข่าวสาร และโปรโมชั่น"| SanityCMS
```

---

## 3. Order Lifecycle State Diagram

```mermaid
stateDiagram-v2
    [*] --> pending_review : สาขาสั่งซื้อ + แนบสลิปโอนเงิน
    
    pending_review --> approved_processing : แอดมินยืนยันยอดเงินและอนุมัติบิล
    pending_review --> cancelled : แอดมินปฏิเสธ / สลิปไม่ถูกต้อง
    
    approved_processing --> shipped : คลังแพ็กสินค้า & อัปเดตเลข Tracking
    shipped --> delivered : สินค้าส่งถึงสาขาเรียบร้อย
    
    cancelled --> [*]
    delivered --> [*]
```

---

## 4. ตารางพจนานุกรมข้อมูล (Data Dictionary)

### 4.1 ตาราง `Admin` (ผู้ดูแลระบบสำนักงานใหญ่)
| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | คีย์ (Key) | คำอธิบาย (Description) |
|---|---|---|---|
| `id` | `String` | PK | Primary Key (`cuid()`) |
| `email` | `String` | Unique | อีเมลสำหรับ Login |
| `password` | `String` | - | รหัสผ่านแฮช |
| `name` | `String` | - | ชื่อ-นามสกุล ผู้ดูแลระบบ |
| `role` | `String` | - | สิทธิ์การใช้งาน (`company_admin`) |
| `createdAt` | `DateTime` | - | วันเวลาที่สร้างข้อมูล |
| `updatedAt` | `DateTime` | - | วันเวลาที่อัปเดตล่าสุด |

### 4.2 ตาราง `Branch` (สาขาและสมาชิกแฟรนไชส์)
| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | คีย์ (Key) | คำอธิบาย (Description) |
|---|---|---|---|
| `id` | `String` | PK | Primary Key (`cuid()`) |
| `email` | `String` | Unique | อีเมลสาขา |
| `password` | `String?` | - | รหัสผ่าน (Nullable) |
| `fullName` | `String` | - | ชื่อผู้จดทะเบียน/ผู้ดูแลสาขา |
| `branchName` | `String` | - | ชื่อสาขา เช่น สาขาอารีย์ |
| `branchCode` | `String` | Unique | รหัสสาขา เช่น `SBC-001` |
| `phone` | `String` | - | เบอร์โทรศัพท์ติดต่อ |
| `contractFileUrl`| `String?` | - | URL ไฟล์สัญญาแนบ |
| `address` | `String?` | - | ที่อยู่จัดส่งของสาขา |
| `approvalStatus` | `String` | - | สถานะ (`pending_approval`, `approved`, `rejected`) |
| `submittedAt` | `String?` | - | วันเวลาที่ยื่นขอแฟรนไชส์ |
| `approvedAt` | `String?` | - | วันเวลาที่ได้รับการอนุมัติ |
| `createdAt` | `DateTime` | - | วันเวลาที่สร้าง |
| `updatedAt` | `DateTime` | - | วันเวลาที่อัปเดต |

### 4.3 ตาราง `Category` (หมวดหมู่วัตถุดิบ/สินค้า)
| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | คีย์ (Key) | คำอธิบาย (Description) |
|---|---|---|---|
| `id` | `String` | PK | Primary Key (`cuid()`) |
| `slug` | `String` | Unique | Slug อ้างอิง เช่น `coffee_beans`, `syrups_sauces` |
| `name` | `String` | - | ชื่อหมวดหมู่ภาษาไทย เช่น เมล็ดกาแฟ, ไซรัป |
| `description` | `String?` | - | คำอธิบาย |
| `image` | `String?` | - | รูปภาพหมวดหมู่ |
| `order` | `Int` | - | ลำดับการแสดงผล |
| `createdAt` | `DateTime` | - | วันเวลาที่สร้าง |
| `updatedAt` | `DateTime` | - | วันเวลาที่อัปเดต |

### 4.4 ตาราง `Product` (สินค้าและวัตถุดิบ)
| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | คีย์ (Key) | คำอธิบาย (Description) |
|---|---|---|---|
| `id` | `String` | PK | Primary Key (`cuid()`) |
| `sku` | `String` | Unique | รหัสสินค้า SKU เช่น `CF-001` |
| `name` | `String` | - | ชื่อสินค้า |
| `categoryId` | `String?` | FK | เชื่อมโยง `Category.id` |
| `categorySlug` | `String` | - | สลักหมวดหมู่เริ่มต้น |
| `categoryName` | `String` | - | ชื่อหมวดหมู่ภาษาไทย |
| `unit` | `String` | - | หน่วยนับ เช่น ถุง (500g), ลัง, ขวด |
| `price` | `Float` | - | ราคาส่งสำหรับแฟรนไชส์ |
| `marketPrice` | `Float` | - | ราคาตลาดทั่วไป |
| `image` | `String` | - | URL รูปสินค้า |
| `stockQuantity` | `Int` | - | จำนวนคงเหลือในคลัง |
| `isAvailable` | `Boolean` | - | สถานะพร้อมจำหน่าย (true/false) |
| `description` | `String?` | - | รายละเอียดสินค้า |
| `minOrder` | `Int?` | - | จำนวนสั่งซื้อขั้นต่ำ |
| `order` | `Int` | - | ลำดับการแสดงผล |
| `createdAt` | `DateTime` | - | วันเวลาที่สร้าง |
| `updatedAt` | `DateTime` | - | วันเวลาที่อัปเดต |

### 4.5 ตาราง `Order` (คำสั่งซื้อสินค้าของสาขา)
| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | คีย์ (Key) | คำอธิบาย (Description) |
|---|---|---|---|
| `id` | `String` | PK | Primary Key (`cuid()`) |
| `orderNumber` | `String` | Unique | เลขที่เอกสารสั่งซื้อ เช่น `ORD-982134` |
| `branchId` | `String?` | FK | เชื่อมโยง `Branch.id` |
| `branchCode` | `String` | - | รหัสสาขา |
| `branchName` | `String` | - | ชื่อสาขา |
| `contactName` | `String` | - | ชื่อผู้รับสินค้า |
| `phone` | `String` | - | เบอร์ติดต่อปลายทาง |
| `shippingAddress` | `String` | - | ที่อยู่จัดส่งสินค้า |
| `subtotal` | `Float` | - | ยอดรวมสินค้าก่อนภาษี/ค่าส่ง |
| `tax` | `Float` | - | ภาษีมูลค่าเพิ่ม (VAT 7%) |
| `shippingFee` | `Float` | - | ค่าบริการจัดส่ง |
| `grandTotal` | `Float` | - | ยอดเงินรวมทั้งสิ้น |
| `status` | `String` | - | สถานะออเดอร์ (`pending_review`, `approved_processing`, `shipped`, `delivered`, `cancelled`) |
| `paymentMethod` | `String` | - | วิธีการชำระเงิน (`bank_transfer`) |
| `paymentSlipUrl` | `String` | - | URL สลิปหลักฐานการโอน |
| `paymentSlipName`| `String?` | - | ชื่อไฟล์สลิป |
| `transferTime` | `String?` | - | วันเวลาที่โอนเงิน |
| `confirmedAt` | `String?` | - | วันเวลาที่แอดมินยืนยัน |
| `confirmedBy` | `String?` | - | ชื่อหรือ ID แอดมินที่ยืนยัน |
| `trackingNumber` | `String?` | - | หมายเลขติดตามพัสดุ |
| `deliveryCarrier`| `String?` | - | บริษัทจัดส่ง เช่น Kerry, Flash |
| `salesNotes` | `String?` | - | บันทึกช่วยจำภายในสำหรับแอดมิน |
| `createdAt` | `DateTime` | - | วันเวลาที่สร้างคำสั่งซื้อ |
| `updatedAt` | `DateTime` | - | วันเวลาที่อัปเดตล่าสุด |

### 4.6 ตาราง `OrderItem` (รายการสินค้าภายในคำสั่งซื้อ)
| ฟิลด์ (Field) | ชนิดข้อมูล (Type) | คีย์ (Key) | คำอธิบาย (Description) |
|---|---|---|---|
| `id` | `String` | PK | Primary Key (`cuid()`) |
| `orderId` | `String` | FK | เชื่อมโยง `Order.id` (OnDelete: Cascade) |
| `productId` | `String?` | FK | เชื่อมโยง `Product.id` |
| `productName` | `String` | - | ชื่อสินค้า ณ ขณะสั่งซื้อ |
| `sku` | `String` | - | SKU ของสินค้า |
| `unit` | `String` | - | หน่วยนับ |
| `quantity` | `Int` | - | จำนวนที่สั่ง |
| `price` | `Float` | - | ราคาต่อหน่วย ณ ขณะสั่งซื้อ |
| `total` | `Float` | - | ยอดรวมของรายการนี้ (`quantity * price`) |
| `createdAt` | `DateTime` | - | วันเวลาที่สร้างรายการ |

---

## 5. Schema Definition File (`schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      String   @default("company_admin")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Category {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String
  description String?
  image       String?
  order       Int       @default(0)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id             String      @id @default(cuid())
  sku            String      @unique
  name           String
  categoryId     String?
  category       Category?   @relation(fields: [categoryId], references: [id])
  categorySlug   String      @default("coffee_beans")
  categoryName   String      @default("เมล็ดกาแฟ")
  unit           String
  price          Float
  marketPrice    Float
  image          String
  stockQuantity  Int         @default(100)
  isAvailable    Boolean     @default(true)
  description    String?
  minOrder       Int?        @default(1)
  order          Int         @default(0)
  orderItems     OrderItem[]
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}

model Branch {
  id              String   @id @default(cuid())
  email           String   @unique
  password        String?
  fullName        String
  branchName      String
  branchCode      String   @unique
  phone           String
  contractFileUrl String?
  address         String?
  approvalStatus  String   @default("pending_approval")
  submittedAt     String?
  approvedAt      String?
  orders          Order[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  branchId        String?
  branch          Branch?     @relation(fields: [branchId], references: [id])
  branchCode      String
  branchName      String
  contactName     String
  phone           String
  shippingAddress String
  subtotal        Float
  tax             Float
  shippingFee     Float
  grandTotal      Float
  status          String      @default("pending_review")
  paymentMethod   String      @default("bank_transfer")
  paymentSlipUrl  String
  paymentSlipName String?
  transferTime    String?
  confirmedAt     String?
  confirmedBy     String?
  trackingNumber  String?
  deliveryCarrier String?
  salesNotes      String?
  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderItem {
  id          String   @id @default(cuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String?
  product     Product? @relation(fields: [productId], references: [id])
  productName String
  sku         String
  unit        String
  quantity    Int
  price       Float
  total       Float
  createdAt   DateTime @default(now())
}
```

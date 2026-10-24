# Super Black Coffee - Software Engineering Diagrams & Specifications

เอกสารรวบรวมไดอะแกรมการวิเคราะห์และออกแบบระบบ (System Analysis & Design) ครบถ้วนตามมาตรฐานวิศวกรรมซอฟต์แวร์ ประกอบด้วย:
1. **ERD Diagram (Entity Relationship Diagram)**
2. **Use Case Diagram & Specifications**
3. **Sequence Diagrams (ลำดับเหตุการณ์การทำงานสำคัญ)**
4. **Data Dictionary & Schema Definitions**

---

## 1. Entity Relationship Diagram (ERD)

ไดอะแกรมแสดงโครงสร้าง Entity, Attributes, Keys และความสัมพันธ์ (Cardinality) ของระบบฐานข้อมูล PostgreSQL

```mermaid
erDiagram
    Admin ||--o{ Order : "ตรวจสอบและยืนยัน (confirms)"
    Admin ||--o{ Branch : "อนุมัติการสมัคร (approves)"
    Branch ||--o{ Order : "สร้างคำสั่งซื้อ (places)"
    Category ||--o{ Product : "จำแนกหมวดหมู่ (categorizes)"
    Order ||--|{ OrderItem : "ประกอบด้วยรายการสินค้า (contains, CASCADE)"
    Product ||--o{ OrderItem : "ถูกสั่งซื้อในรายการ (referenced in)"

    Admin {
        String id PK "cuid()"
        String email UK "Unique Email"
        String password "Hashed Password"
        String name "ชื่อผู้ดูแลระบบ"
        String role "company_admin"
        DateTime createdAt "เวลาสร้าง"
        DateTime updatedAt "เวลาแก้ไข"
    }

    Branch {
        String id PK "cuid()"
        String email UK "Unique Email"
        String password "รหัสผ่านสาขา"
        String fullName "ชื่อผู้จดทะเบียน/ผู้จัดการ"
        String branchName "ชื่อสาขา"
        String branchCode UK "รหัสสาขา เช่น SBC-001"
        String phone "เบอร์ติดต่อ"
        String contractFileUrl "ลิงก์ไฟล์สัญญาแนบ"
        String address "ที่ตั้ง/ที่อยู่จัดส่ง"
        String approvalStatus "pending_approval | approved | rejected"
        String submittedAt "วันที่ยื่นขอเปิดสาขา"
        String approvedAt "วันที่ได้รับการอนุมัติ"
        DateTime createdAt "เวลาสร้าง"
        DateTime updatedAt "เวลาแก้ไข"
    }

    Category {
        String id PK "cuid()"
        String slug UK "Slug หมวดหมู่ เช่น coffee_beans"
        String name "ชื่อหมวดหมู่สินค้า"
        String description "รายละเอียดหมวดหมู่"
        String image "URL รูปไอคอนหมวดหมู่"
        Int order "ลำดับการแสดงผล"
        DateTime createdAt "เวลาสร้าง"
        DateTime updatedAt "เวลาแก้ไข"
    }

    Product {
        String id PK "cuid()"
        String sku UK "รหัสสินค้า เช่น CF-001"
        String name "ชื่อวัตถุดิบ/สินค้า"
        String categoryId FK "เชื่อมโยง Category.id"
        String categorySlug "slug หมวดหมู่"
        String categoryName "ชื่อหมวดหมู่"
        String unit "หน่วยนับ (กก., ขวด, ลัง)"
        Float price "ราคาส่งแฟรนไชส์"
        Float marketPrice "ราคาตลาดอ้างอิง"
        String image "URL รูปสินค้า"
        Int stockQuantity "จำนวนสินค้าคงเหลือ"
        Boolean isAvailable "สถานะพร้อมจำหน่าย"
        String description "รายละเอียดสินค้า"
        Int minOrder "จำนวนสั่งซื้อขั้นต่ำ"
        Int order "ลำดับการแสดงผล"
        DateTime createdAt "เวลาสร้าง"
        DateTime updatedAt "เวลาแก้ไข"
    }

    Order {
        String id PK "cuid()"
        String orderNumber UK "เลขที่ใบสั่งซื้อ เช่น ORD-123456"
        String branchId FK "เชื่อมโยง Branch.id"
        String branchCode "รหัสสาขา"
        String branchName "ชื่อสาขา"
        String contactName "ชื่อผู้ติดต่อสั่งซื้อ"
        String phone "เบอร์โทรศัพท์"
        String shippingAddress "ที่อยู่จัดส่งสินค้า"
        Float subtotal "ยอดรวมสินค้า"
        Float tax "ภาษีมูลค่าเพิ่ม 7%"
        Float shippingFee "ค่าจัดส่ง"
        Float grandTotal "ยอดเงินสุทธิ"
        String status "pending_review | approved_processing | shipped | delivered | cancelled"
        String paymentMethod "bank_transfer"
        String paymentSlipUrl "URL สลิปการโอนเงิน"
        String paymentSlipName "ชื่อไฟล์สลิป"
        String transferTime "เวลาโอนเงิน"
        String confirmedAt "เวลาที่แอดมินอนุมัติ"
        String confirmedBy "ชื่อแอดมินที่อนุมัติ"
        String trackingNumber "เลขพัสดุสำหรับติดตาม"
        String deliveryCarrier "บริษัทขนส่ง"
        String salesNotes "หมายเหตุจากแอดมิน"
        DateTime createdAt "เวลาสร้าง"
        DateTime updatedAt "เวลาแก้ไข"
    }

    OrderItem {
        String id PK "cuid()"
        String orderId FK "เชื่อมโยง Order.id (CASCADE)"
        String productId FK "เชื่อมโยง Product.id"
        String productName "ชื่อสินค้าขณะสั่งซื้อ"
        String sku "SKU สินค้า"
        String unit "หน่วยนับ"
        Int quantity "จำนวนที่สั่ง"
        Float price "ราคาต่อหน่วย"
        Float total "ราคารวมรายการ (quantity * price)"
        DateTime createdAt "เวลาสร้าง"
    }
```

---

## 2. Use Case Diagrams

### 2.1 Use Case ภาพรวมทั้งระบบ (System Overview)

```mermaid
flowchart LR
    subgraph Actors["🎭 ผู้ใช้งานในระบบ (Actors)"]
        Customer(("👤 ลูกค้าทั่วไป<br/>(Customer)"))
        Franchisee(("☕ เจ้าของสาขา<br/>(Franchisee)"))
        Admin(("🏢 แอดมินสำนักงานใหญ่<br/>(Company Admin)"))
        Barista(("📦 พนักงานหน้าร้าน<br/>(Branch Staff)"))
    end

    subgraph WebsiteSystem["🌐 Website System (:3000)"]
        UC_ViewMenu(["UC-01: ดูเมนูเครื่องดื่ม"])
        UC_ViewBranches(["UC-02: ค้นหาสาขาใกล้เคียง"])
        UC_ViewPromo(["UC-03: ดูโปรโมชั่น/ข่าวสาร"])
        UC_Contact(["UC-04: ส่งแบบฟอร์มติดต่อ/สนใจแฟรนไชส์"])
    end

    subgraph FranchiseSystem["☕ Franchise Portal (:3002)"]
        UC_RegisterBranch(["UC-05: ลงทะเบียนเปิดสาขาใหม่"])
        UC_LoginBranch(["UC-06: เข้าสู่ระบบสาขา"])
        UC_BrowseProducts(["UC-07: เลือกดูวัตถุดิบ & อุปกรณ์ B2B"])
        UC_ManageCart(["UC-08: จัดการตะกร้าสินค้า"])
        UC_PlaceOrder(["UC-09: สร้างคำสั่งซื้อ & แนบสลิปโอน"])
        UC_TrackOrder(["UC-10: ตรวจสอบสถานะและเลขพัสดุ"])
    end

    subgraph AdminSystem["🏢 Head Office Admin Portal (:3001)"]
        UC_LoginAdmin(["UC-11: เข้าสู่ระบบแอดมิน"])
        UC_ApproveBranch(["UC-12: ตรวจสอบและอนุมัติสาขาใหม่"])
        UC_ManageOrders(["UC-13: ตรวจสอบสลิป & อนุมัติคำสั่งซื้อ"])
        UC_UpdateShipping(["UC-14: บันทึกเลขพัสดุ & บริษัทขนส่ง"])
        UC_ManageProducts(["UC-15: จัดการสต็อกและราคาสินค้า"])
    end

    subgraph StockSystem["📦 Stock System (:3003)"]
        UC_CheckDailyStock(["UC-16: ตรวจนับสต็อกวัตถุดิบประจำวัน"])
        UC_ConfirmDelivery(["UC-17: ยืนยันรับสินค้าเข้าคลังสาขา"])
    end

    %% Customer Connections
    Customer --> UC_ViewMenu
    Customer --> UC_ViewBranches
    Customer --> UC_ViewPromo
    Customer --> UC_Contact

    %% Franchisee Connections
    Franchisee --> UC_RegisterBranch
    Franchisee --> UC_LoginBranch
    Franchisee --> UC_BrowseProducts
    Franchisee --> UC_ManageCart
    Franchisee --> UC_PlaceOrder
    Franchisee --> UC_TrackOrder

    %% Admin Connections
    Admin --> UC_LoginAdmin
    Admin --> UC_ApproveBranch
    Admin --> UC_ManageOrders
    Admin --> UC_UpdateShipping
    Admin --> UC_ManageProducts

    %% Barista / Staff Connections
    Barista --> UC_CheckDailyStock
    Barista --> UC_ConfirmDelivery
```

### 2.2 Use Case รายละเอียด: การสั่งซื้อและจัดส่งสินค้า B2B

```mermaid
flowchart TD
    Franchisee(("☕ สาขาแฟรนไชส์"))
    Admin(("🏢 แอดมิน HQ"))

    subgraph OrderingProcess["ระบบการสั่งซื้อและชำระเงิน"]
        UC_Cart["เลือกสินค้าเข้าตะกร้า"]
        UC_Checkout["ดำเนินการสั่งซื้อ (Checkout)"]
        UC_UploadSlip["แนบหลักฐานการชำระเงิน (สลิป)"]
        UC_VerifySlip["ตรวจสอบความถูกต้องของสลิป"]
        UC_ApproveOrder["อนุมัติคำสั่งซื้อ"]
        UC_RejectOrder["ปฏิเสธคำสั่งซื้อ / ยกเลิก"]
        UC_Shipment["จัดส่งและออก Tracking Number"]
        UC_Received["ยืนยันรับสินค้า"]
    end

    Franchisee --> UC_Cart
    UC_Cart --> UC_Checkout
    UC_Checkout --> UC_UploadSlip
    UC_UploadSlip --> UC_VerifySlip

    UC_VerifySlip --> Admin
    Admin --> UC_ApproveOrder
    Admin --> UC_RejectOrder
    UC_ApproveOrder --> UC_Shipment
    Admin --> UC_Shipment
    UC_Shipment --> UC_Received
    Franchisee --> UC_Received
```

---

## 3. Sequence Diagrams (ไดอะแกรมแสดงลำดับเหตุการณ์)

### 3.1 Sequence Diagram: กระบวนการลงทะเบียนและอนุมัติสาขาใหม่ (Branch Registration & Approval)

```mermaid
sequenceDiagram
    autonumber
    actor Franchisee as ☕ เจ้าของสาขา (Applicant)
    participant Web as 💻 Franchise App UI
    participant API as ⚙️ /api/branches
    participant DB as 🐘 PostgreSQL (Prisma)
    actor Admin as 🏢 แอดมิน Head Office

    Franchisee->>Web: กรอกข้อมูลสาขา + อัปโหลดไฟล์สัญญา
    Web->>API: POST /api/branches (ข้อมูลสาขา, contractFileUrl)
    API->>DB: prisma.branch.create(status: "pending_approval")
    DB-->>API: บันทึกข้อมูลสำเร็จ (Branch Record)
    API-->>Web: ส่งข้อความตอบกลับ "ส่งคำขอสำเร็จ รอแอดมินอนุมัติ"
    Web-->>Franchisee: แสดงหน้าต่างแจ้งเตือนรอการตรวจสอบ

    Admin->>Web: เข้าสู่หน้าแดชบอร์ด /admin/branches
    Web->>API: GET /api/branches?status=pending_approval
    API->>DB: prisma.branch.findMany(...)
    DB-->>API: รายชื่อสาขาที่รออนุมัติ
    API-->>Web: แสดงรายการคำขอ
    
    Admin->>Web: ตรวจเอกสารสัญญา และคลิก "อนุมัติสาขา"
    Web->>API: PATCH /api/branches/:id (approvalStatus: "approved", approvedAt)
    API->>DB: prisma.branch.update(...)
    DB-->>API: อัปเดตสถานะเป็น "approved"
    API-->>Web: สำเร็จ (200 OK)
    Web-->>Admin: อัปเดตสถานะบนหน้าจอเรียบร้อย
```

---

### 3.2 Sequence Diagram: กระบวนการสั่งซื้อสินค้าและอัปโหลดสลิป (Order Creation & Payment Slip)

```mermaid
sequenceDiagram
    autonumber
    actor Franchisee as ☕ สาขาแฟรนไชส์
    participant CartUI as 🛒 หน้าร้านค้า/ตะกร้า (Store & Cart)
    participant OrderAPI as ⚙️ /api/orders
    participant DB as 🐘 PostgreSQL (Prisma)

    Franchisee->>CartUI: เลือกวัตถุดิบลงตะกร้า (เช่น เมล็ดกาแฟ, ไซรัป)
    CartUI->>CartUI: คำนวณ Subtotal, Tax (7%), ShippingFee, GrandTotal
    Franchisee->>CartUI: กดปุ่ม "ชำระเงิน" และโอนเงินผ่าน QR Code ธนาคาร
    Franchisee->>CartUI: แนบรูปสลิปการโอนเงิน (paymentSlipUrl)
    Franchisee->>CartUI: กดยืนยันการสั่งซื้อ (Confirm Order)

    CartUI->>OrderAPI: POST /api/orders (branchId, items, totals, slipUrl)
    
    activate OrderAPI
    OrderAPI->>OrderAPI: สร้าง orderNumber อัตโนมัติ (เช่น ORD-847291)
    OrderAPI->>DB: prisma.order.create({ data: {...}, include: { items: true } })
    activate DB
    DB->>DB: บันทึก Order Header
    DB->>DB: บันทึก OrderItem[] (ความสัมพันธ์ 1:N)
    DB-->>OrderAPI: คืนค่า Order Object ที่สร้างเสร็จ
    deactivate DB

    OrderAPI-->>CartUI: HTTP 201 Created (Order Detail)
    deactivate OrderAPI

    CartUI->>CartUI: ล้างรายการในตะกร้าสินค้า
    CartUI-->>Franchisee: แสดงหน้ารายละเอียดคำสั่งซื้อและสถานะ "รอตรวจสอบสลิป"
```

---

### 3.3 Sequence Diagram: กระบวนการตรวจสอบสลิปและจัดส่งสินค้า (Order Verification & Fulfillment)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as 🏢 แอดมิน Head Office
    participant AdminUI as 🖥️ Admin Orders Portal
    participant API as ⚙️ /api/orders
    participant DB as 🐘 PostgreSQL (Prisma)
    actor Franchisee as ☕ สาขาแฟรนไชส์

    Admin->>AdminUI: เปิดหน้าตรวจสอบคำสั่งซื้อ (Filter: pending_review)
    AdminUI->>API: GET /api/orders
    API->>DB: prisma.order.findMany(include: { items: true })
    DB-->>API: ข้อมูลคำสั่งซื้อทั้งหมด
    API-->>AdminUI: แสดงรายการพร้อมรูปสลิปโอนเงิน

    Admin->>AdminUI: ตรวจดูยอดเงินและเวลาโอนในสลิป
    alt สลิปถูกต้อง ยอดเงินตรง
        Admin->>AdminUI: กดปุ่ม "อนุมัติคำสั่งซื้อ" (Approve)
        AdminUI->>API: PATCH /api/orders (status: "approved_processing", confirmedBy: adminName)
        API->>DB: prisma.order.update(...)
        DB-->>API: อัปเดตสถานะสำเร็จ
        API-->>AdminUI: แสดงสถานะ "กำลังเตรียมสินค้า"

        Note over Admin, AdminUI: ฝ่ายคลังแพ็กสินค้าและส่งให้บริษัทขนส่ง
        Admin->>AdminUI: กรอก Tracking Number (เช่น KERRY-TH-9921) & ขนส่ง
        AdminUI->>API: PATCH /api/orders (status: "shipped", trackingNumber, deliveryCarrier)
        API->>DB: prisma.order.update(...)
        DB-->>API: บันทึกข้อมูลการจัดส่งสำเร็จ
        API-->>AdminUI: แสดงสถานะ "จัดส่งแล้ว"

        Franchisee->>AdminUI: เปิดดูหน้าคำสั่งซื้อของสาขาตนเอง
        AdminUI-->>Franchisee: เห็นสถานะ "จัดส่งแล้ว" พร้อมเลขพัสดุและลิงก์ติดตาม
    else สลิปไม่ถูกต้อง / ไม่มียอดเงิน
        Admin->>AdminUI: กดปุ่ม "ปฏิเสธ / ยกเลิก" พร้อมระบุหมายเหตุ
        AdminUI->>API: PATCH /api/orders (status: "cancelled", salesNotes: "ยอดเงินไม่ตรง")
        API->>DB: prisma.order.update(...)
        DB-->>API: อัปเดตเป็น cancelled
        API-->>AdminUI: อัปเดตสถานะยกเลิก
    end
```

---

## 4. สรุปความสอดคล้องของระบบ (System Matrix)

| Entity / Use Case | App ที่รับผิดชอบ | เทคโนโลยีจัดเก็บ | สถานะหลักที่เกี่ยวข้อง |
|---|---|---|---|
| **การสมัครและข้อมูลสาขา** | `apps/franchise` (UI), `apps/admin` (ตรวจ) | PostgreSQL (`Branch`) | `pending_approval`, `approved`, `rejected` |
| **แคตตาล็อกสินค้า B2B** | `apps/franchise`, `apps/admin` | PostgreSQL (`Product`, `Category`) | `isAvailable: true/false` |
| **การสั่งซื้อ & ชำระเงิน** | `apps/franchise` | PostgreSQL (`Order`, `OrderItem`) | `pending_review` |
| **การอนุมัติและจัดส่ง** | `apps/admin` | PostgreSQL (`Order`) | `approved_processing`, `shipped`, `delivered` |
| **เมนูเครื่องดื่มหน้าร้าน** | `apps/website` | Sanity CMS (`menuItem`) | เผยแพร่ผ่าน CDN |
| **การนับสต็อกสาขา** | `apps/stock` | PostgreSQL (`Product` stock sync) | อัปเดตจำนวนคงเหลือ |

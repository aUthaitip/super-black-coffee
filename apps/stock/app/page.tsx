import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>📦 Store Stock</h1>
        <p>ระบบพนักงานหน้าร้าน (apps/stock)</p>
        <Button appName="stock" className={styles.secondary}>
          เช็คสต็อกสินค้า
        </Button>
      </main>
    </div>
  );
}

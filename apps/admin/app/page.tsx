import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>🏢 Headquarter Admin</h1>
        <p>ระบบสำนักงานใหญ่ (apps/admin)</p>
        <Button appName="admin" className={styles.secondary}>
          เข้าสู่ระบบแอดมิน
        </Button>
      </main>
    </div>
  );
}

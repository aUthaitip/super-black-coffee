import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>🤝 Franchise Portal</h1>
        <p>ระบบเจ้าของแฟรนไชส์ (apps/franchise)</p>
        <Button appName="franchise" className={styles.secondary}>
          จัดการข้อมูลสาขา
        </Button>
      </main>
    </div>
  );
}

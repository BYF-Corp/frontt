"use client";

import Image from "next/image";
import LoginForm from "@/app/components/Loginform";
import styles from "@/app/styles/login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* พื้นหลัง */}
        <div>
          <Image
            src="/images/friendfiesbackground.png"
            alt="Friend Fries Background"
            width={800}
            height={750}
            className={styles.backgroundImage}
            priority
          />
        </div>

        {/* คอนเทนท์ */}
        <div className={styles.content}>
          {/* ส่วนด้านซ้าย - ฟอร์มล็อกอิน */}
          <div className={styles.formSection}>
            {/* โลโก้ */}
            <div className={styles.logoContainer}>
              <Image
                src="/images/logo.png"
                alt="Friend Fries Logo"
                width={80}
                height={80}
              />
            </div>

            {/* ชื่อแอพ */}
            <h1 className={styles.title}>Friend Fries</h1>
            <p className={styles.subtitle}>เฟรนด์ฟรายทอดจากเพื่อนสู่เพื่อน</p>

            {/* ฟอร์มล็อกอิน */}
            <LoginForm />
          </div>

          {/* ส่วนด้านขวา - รูปภาพ */}
          <div className={styles.imageSection}>
            {/* เว้นว่างไว้เพื่อให้รูปพื้นหลังแสดงผล */}
          </div>
        </div>
      </div>
    </div>
  );
}

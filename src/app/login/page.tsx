"use client";

import Image from "next/image";
import LoginForm from "@/app/components/Loginform";
import styles from "@/app/styles/login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.backgroundWrapper}>
        <Image
          src="/images/friendfiesbackground.png"
          alt="Friend Fries Background"
          fill
          className={styles.backgroundImage}
          priority
        />
      </div>

      {/* Login Card */}
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo.png"
            alt="Friend Fries Logo"
            width={80}
            height={80}
          />
        </div>

        <h1 className={styles.title}>Friend Fries</h1>
        <p className={styles.subtitle}>เฟรนด์ฟรายทอดจากเพื่อนสู่เพื่อน</p>

        <LoginForm />
      </div>
    </div>
  );
}


// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import styles from "@/app/styles/login.module.css";

// export default function LoginPage() {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (username === "admin" && password === "1234") {
//       router.push("/home"); // ไปหน้า Home
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.loginCard}>
//         {/* พื้นหลัง */}
//         <div>
//           <Image
//             src="/images/friendfiesbackground.png"
//             alt="Friend Fries Background"
//             width={600}
//             height={600}
//             className={styles.backgroundImage}
//             priority
//           />
//         </div>

//         {/* คอนเทนท์ */}
//         <div className={styles.content}>
//           {/* ส่วนด้านซ้าย - ฟอร์มล็อกอิน */}
//           <div className={styles.formSection}>
//             {/* โลโก้ */}
//             <div className={styles.logoContainer}>
//               <Image
//                 src="/images/logo.png"
//                 alt="Friend Fries Logo"
//                 width={80}
//                 height={80}
//               />
//             </div>

//             {/* ชื่อแอพ */}
//             <h1 className={styles.title}>Friend Fries</h1>
//             <p className={styles.subtitle}>เฟรนด์ฟรายทอดจากเพื่อนสู่เพื่อน</p>

//             {/* ฟอร์มล็อกอิน */}
//             <form onSubmit={handleSubmit} className={styles.loginForm}>
//               <input
//                 type="text"
//                 placeholder="Username"
//                 className={styles.inputField}
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 className={styles.inputField}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button type="submit" className={styles.loginButton}>
//                 Login
//               </button>
//             </form>
//           </div>

//           {/* ส่วนด้านขวา - รูปภาพ */}
//           <div className={styles.imageSection}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

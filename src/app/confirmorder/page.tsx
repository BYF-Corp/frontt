// src/app/confirmorder/page.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import ConfirmOrder from "@/app/confirmorder/ConfirmOrder"; // แยก component ออกมา
import "./confirmorder.css";

export default function Page() {
//   const [products, setProducts] = useState([
//     { id: 1, name: "Sample Product", details: "Details", quantity: 2, price: 49 },
//     // ใส่ตัวอย่างหรือดึงจากที่อื่น
//   ]);

  const [products] = useState([
    { id: 1, name: "Sample Product", details: "Details", quantity: 2, price: 49 },
  ]);


//   function handleRemoveProduct(id: number) {
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//   }

  function handleCancel() {
    // logic cancel
    console.log("Cancelled");
  }

  function handleSuccess() {
    // logic success
    console.log("Success");
  }

  return (
    <div className="confirmorder-container">
      <Sidebar />
      <main className="confirmorder-main">
        <Header title="Confirm Order" />
        <ConfirmOrder
          products={products}
          onCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      </main>
    </div>
  );
}

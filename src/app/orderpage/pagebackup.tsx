"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import OrderItem from "@/app/components/OrderItem";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import "./orderpage.css";

type Product = {
  id: number;
  name: string;
  details: string;
  quantity: number;
};

export default function OrderPage() {
  const router = useRouter(); // เพิ่ม useRouter

  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "product 1", details: "details...", quantity: 1 },
    { id: 2, name: "product 2", details: "details...", quantity: 1 },
    { id: 3, name: "product 3", details: "details...", quantity: 1 },
  ]);

  const handleAddProduct = () => {
    router.push('/home');
  };

  const handleConfirm = () => {
    alert("Order confirmed!");
    setProducts([]);
    setCustomerName("");
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity } : p));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProduct = (id: number) => {
    // ปุ่ม Edit ให้ไปหน้า productitem พร้อมส่ง id หรือพารามิเตอร์ (ถ้าต้องการ)
    router.push('/productitem');
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Orderpage" />
        <input
          type="text"
          placeholder="customer name (option)"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          className="customer-input"
        />
        <div className="order-items">
          {products.map(product => (
            <OrderItem
              key={product.id}
              product={product}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={handleDeleteProduct}
              // onEdit={() => handleEditProduct(product.id)}  {/* เพิ่ม onEdit */}
            />
          ))}
        </div>
        <div className="orderpage-actions">
          <button onClick={handleAddProduct}>Add</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

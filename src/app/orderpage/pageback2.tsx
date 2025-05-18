// src/app/orderpage/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import OrderItem from "@/app/components/OrderItem";
import "./orderpage.css";

type Product = {
  id: number;
  name: string;
  details: string;
  quantity: number;
};

export default function OrderPage() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = () => {
    // นำผู้ใช้ไปหน้า productitem เพื่อเลือกเมนู
    router.push('/productitem');
  };

  const handleConfirm = async () => {
    try {
      // สร้าง Order ใหม่
      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guest_name: customerName })
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // เพิ่ม Order Items
      for (const product of products) {
        const orderItemResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order-item/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order: orderData.id,
            fried: product.id,
            quantity: product.quantity,
            description: product.details,
            // สมมติว่า size และ flavors ถูกกำหนดไว้ล่วงหน้า
            size: 1,
            flavors: []
          })
        });

        if (!orderItemResponse.ok) {
          throw new Error('Failed to create order item');
        }
      }

      alert("Order confirmed!");
      setProducts([]);
      setCustomerName("");
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert("An error occurred while confirming the order.");
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity } : p));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
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
            />
          ))}
        </div>
        <div className="orderpage-actions">
          {/* <button onClick={handleAddProduct}>Add</button> */}
          <button onClick={() => router.push('/selectproduct')}>Add</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

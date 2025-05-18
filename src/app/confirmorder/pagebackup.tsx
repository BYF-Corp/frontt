"use client";

import React from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import "./confirmorder.css";

type Product = {
  id: number;
  name: string;
  details: string;
  quantity: number;
  price: number;
};

type ConfirmOrderProps = {
  products?: Product[];  // แก้ตรงนี้ให้เป็น optional
  onCancel: () => void;
  onSuccess: () => void;
};

export default function ConfirmOrder({
  products = [],  // กำหนด default เป็น array ว่าง
  onCancel,
  onSuccess,
}: ConfirmOrderProps) {
  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="confirmorder-container">
      <Sidebar />
      <main className="confirmorder-main">
        <Header title="Confirm Order" />
        <div className="order-summary-card">
          {products.map((product) => (
            <div key={product.id} className="order-summary-item">
              <div className="product-name">{product.name}</div>
              <div className="product-details">{product.details}</div>
              <div className="product-quantity">{product.quantity}</div>
              <div className="product-price">${product.price * product.quantity}</div>
            </div>
          ))}
          <div className="order-summary-total">
            <div>Total Price:</div>
            <div>${totalPrice}</div>
          </div>
        </div>
        <div className="order-summary-actions">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="success-button" onClick={onSuccess}>Success</button>
        </div>
      </main>
    </div>
  );
}

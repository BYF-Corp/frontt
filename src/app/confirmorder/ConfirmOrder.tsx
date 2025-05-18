// src/app/confirmorder/ConfirmOrder.tsx
"use client";

import React from "react";

type Product = {
  id: number;
  name: string;
  details: string;
  quantity: number;
  price: number;
};

type ConfirmOrderProps = {
  products?: Product[];
  onCancel: () => void;
  onSuccess: () => void;
};

export default function ConfirmOrder({
  products = [],
  onCancel,
  onSuccess,
}: ConfirmOrderProps) {
  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
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
      <div className="order-summary-actions">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button className="success-button" onClick={onSuccess}>Success</button>
      </div>
    </div>
  );
}

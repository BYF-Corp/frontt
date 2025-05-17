"use client";

import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  details: string;
  quantity: number;
};

type Props = {
  product: Product;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
};

export default function OrderItem({ product, onUpdateQuantity, onDelete }: Props) {
  return (
    <div className="order-item">
      <div className="quantity-controls">
        <button className="productadd" onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}>+</button>
        <span>{product.quantity}</span>
        <button className="productdecrease" onClick={() => onUpdateQuantity(product.id, Math.max(1, product.quantity - 1))}
        >
          -
        </button>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.details}</p>
      </div>

      <div className="actions">
        <button title="Edit">
          <FaEdit />
        </button>
        <button title="Delete" onClick={() => onDelete(product.id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import { FaCashRegister } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

async function deleteOrder(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Delete order failed!');
  }

  window.location.reload()
  return true;
}

const OrderItemCard = ({ order }: { order: any }) => {
  return (
    <div className="order-item">
      <p>Order {order.id}: by {order.guest_name}</p>
      <div className="order-action">
        <button><FaRegEdit size={24} /></button>
        <button onClick={() => deleteOrder(order.id)}><FaTrash size={24} /></button>
        <button><FaCashRegister size={24} /></button>
      </div>
    </div>
  );
};

export default OrderItemCard;

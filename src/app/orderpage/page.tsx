'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrder } from '@/context/OrderContext';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import './orderpage.css';

export default function OrderPage() {
  const router = useRouter();
  const { orders, clearOrders } = useOrder();
  const [customerName, setCustomerName] = useState("");

    const handleConfirm = async () => {
    try {
        const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest_name: customerName }),
        });

        if (!orderRes.ok) {
        const error = await orderRes.json();
        console.error('Create order error:', error);
        throw new Error('Failed to create order');
        }

        const orderData = await orderRes.json();
        console.log('Order created:', orderData);

        for (const item of orders) {
        // ตรวจสอบค่าก่อนส่ง
        const payload = {
            order: orderData.id,
            fried: Number(item.productId),  // ให้แน่ใจว่าเป็น number
            quantity: Number(item.quantity),
            description: item.note ? item.note : "",
            size: Number(item.size),
            flavors: Array.isArray(item.flavors)
            ? item.flavors.map(f => Number(f))
            : [],
        };

        console.log('Creating order item with payload:', payload);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order-item/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        console.log("Creating order item with payload:", {
            order: orderData.id,
            fried: Number(item.productId),
            quantity: Number(item.quantity),
            description: item.note ? item.note : "",
            size: Number(item.size),
            flavors: Array.isArray(item.flavors)
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error('Create order item error:', errorData);
            throw new Error('Failed to create order item');
        }
        }
        alert('Order confirmed!');
        clearOrders();
        router.push('/home');
    } catch (err) {
        console.error(err);
        alert('An error occurred while confirming the order.');
    }
    };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Order Page" />
        <input
          type="text"
          placeholder="customer name (option)"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          className="customer-input"
        />

        <div className="order-items">
          {orders.length === 0 ? (
            <p>No items yet.</p>
          ) : (
            orders.map((item, index) => (
              <div key={index} className="order-item-card">
                <h3>{item.productName}</h3>
                <p>Size: {item.size}</p>
                <p>Flavors: {item.flavors.length > 0 ? item.flavors.join(', ') : '-'}</p>
                <p>Note: {item.note || '-'}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))
          )}
        </div>

        <div className="orderpage-actions">
          <button onClick={() => router.push('/selectproduct')}>Add</button>
          <button onClick={handleConfirm} disabled={orders.length === 0}>
            Confirm
          </button>
          <button onClick={clearOrders} disabled={orders.length === 0}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState } from 'react';

type OrderItem = {
  productId: number;
  productName: string;
  size: number;
  flavors: string[];
  note: string;
  quantity: number;
};

type OrderContextType = {
  orders: OrderItem[];
  addOrder: (item: OrderItem) => void;
  clearOrders: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const addOrder = (item: OrderItem) => {
    setOrders(prev => [...prev, item]);
  };

  const clearOrders = () => setOrders([]);

  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within an OrderProvider");
  return context;
};

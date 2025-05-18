'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface Product {
  id: number;
  name: string;
  price: string; // ถ้าอยากเก็บแบบตัวเลขให้ใช้ number แทน
  description: string;
  imgurl: string;
}

export default function SelectProduct() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fried`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleSelect = (productId: number) => {
    router.push(`/productitem/${productId}`);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Select Product</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {products.map((product: Product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              display: 'flex',
              gap: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => handleSelect(product.id)}
          >
            <img
              src={product.imgurl}
              alt={product.name}
              width={100}
              height={100}
              style={{ borderRadius: '8px' }}
            />
            <div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <strong>{product.price} ฿</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// src/app/productitem/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useOrder } from '@/context/OrderContext';
import Image from 'next/image';

export default function ProductItem() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [sizes, setSizes] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const { addOrder } = useOrder();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/fried`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((item: any) => item.id.toString() === productId);
        setProduct(found);
      });

    fetch(`http://127.0.0.1:8000/api/size`)
      .then(res => res.json())
      .then(setSizes);

    fetch(`http://127.0.0.1:8000/api/flavor`)
      .then(res => res.json())
      .then(setFlavors);
  }, [productId]);

  const handleFlavorChange = (flavor: string) => {
    setSelectedFlavors(prev =>
      prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleAdd = () => {
    addOrder({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      flavors: selectedFlavors,
      note: note,
      quantity: quantity,
    });
    router.push('/orderpage');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Product Detail</h2>

      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          gap: '1rem'
        }}
      >
        <Image
          src={product.imgurl}
          alt={product.name}
          width={150}
          height={150}
          style={{ borderRadius: '8px' }}
        />
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>{product.price} ฿</strong></p>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <strong>Size:</strong><br />
        {sizes.map((s: any) => (
          <label key={s.id} style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              value={s.size_name}
              checked={selectedSize === s.size_name}
              onChange={() => setSelectedSize(s.size_name)}
            />
            {` ${s.size_name} (+${s.charge} ฿)`}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <strong>Flavors:</strong><br />
        {flavors.map((f: any) => (
          <label key={f.id} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              checked={selectedFlavors.includes(f.flavor_name)}
              onChange={() => handleFlavorChange(f.flavor_name)}
            />
            {` ${f.flavor_name}`}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>
          <strong>Quantity:</strong><br />
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: '60px' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>
          <strong>Note:</strong><br />
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            style={{ width: '100%', borderRadius: '4px', padding: '0.5rem' }}
          />
        </label>
      </div>

      <button
        onClick={handleAdd}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add to Order
      </button>
    </div>
  );
}

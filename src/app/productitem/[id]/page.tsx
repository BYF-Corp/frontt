// src/app/productitem/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useOrder } from '@/context/OrderContext';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import styles from './productitem.module.css'

export interface Product {
  id: number;
  name: string;
  price: string; // ถ้าอยากเก็บแบบตัวเลขให้ใช้ number แทน
  description: string;
  imgurl: string;
}

export interface Flavor {
  id: number;
  flavor_name: string;
}
export interface Size {
  id: number;
  size_name: string;
  charge: string; // หรือจะใช้เป็น number ก็ได้ถ้าจะคำนวณ เช่น charge: number;
}



export default function ProductItem() {
  const router = useRouter();
  const params = useParams(); // <-- ใช้ตรงนี้
  const productId = params?.id;

  // const [product, setProduct] = useState<Product>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [sizes, setSizes] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(1);
  const [selectedFlavors, setSelectedFlavors] = useState<number[]>([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fried`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((item: Product) => item.id.toString() === productId);
        setProduct(found);
      });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/size`)
      .then(res => res.json())
      .then(setSizes);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/flavor`)
      .then(res => res.json())
      .then(setFlavors);
  }, [productId]);

  const handleFlavorChange = (flavorId: number) => {
    setSelectedFlavors(prev =>
      prev.includes(flavorId)
        ? prev.filter(id => id !== flavorId)
        : [...prev, flavorId]
    );
  };

  const { addOrder } = useOrder()
  const handleAdd = () => {
    if (!product) return;
    if (selectedSize === null) {
      alert('กรุณาเลือกขนาดก่อนสั่งซื้อ');
      return;
    }

    addOrder({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      // flavors: selectedFlavors,
      flavors: selectedFlavors.map(String),
      note,
      quantity,
    });

    router.push('/orderpage');
};
  // const handleAdd = () => {
  //   if (!product) return;
  //   addOrder({
  //     productId: product.id,
  //     productName: product.name,
  //     size: selectedSize,
  //     flavors: selectedFlavors,
  //     note: note,
  //     quantity: quantity,
  //   })
  //   router.push('/orderpage');
  // };

  if (!product) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
    <Sidebar />
    <div className={styles.main}>
        <Header title='Order'/>
        <div className={styles.card}>
            <img
                src={product.imgurl}
                alt={product.name}
                className={styles.image}
            />
            <div className={styles.details}>
                <div className={styles.row}>
                    <b>{product.name}</b>
                    <span>price: {product.price}</span>
                </div>
                <div className={styles.section}><b>{product.description}</b></div>
                <div className={styles.section}>
                    <div><b>Size:</b></div>
                    {sizes.map((s: Size) => (
                    <label key={s.id}>
                        <input
                        type="radio"
                        value={s.id}
                        checked={selectedSize === s.id}
                        onChange={() => setSelectedSize(s.id)}
                        />
                        {` ${s.size_name} (+${s.charge} ฿) `}
                    </label>
                    ))}
                </div>
                <div className={styles.section}>
                    <div><b>Flavors</b></div>
                    {flavors.map((f: Flavor) => (
                    <label key={f.id}>
                        <input
                        type="checkbox"
                        checked={selectedFlavors.includes(f.id)}
                        onChange={() => handleFlavorChange(f.id)}
                        />
                        {` ${f.flavor_name} `}
                    </label>
                    ))}
                </div>
                <div className={styles.section}>
                    <div><b>Quantity</b></div>
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                <div className={styles.section}>
                    <div><b>Note</b></div>
                    <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    />
                </div>
                <button className={styles.addButton} onClick={handleAdd}>add</button>
            </div>
        </div>
    </div>
    </div>
  );
}

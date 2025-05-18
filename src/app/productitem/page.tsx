// src/app/productitem/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import styles from './productitem.module.css';

export default function ProductItem() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [note, setNote] = useState('');

  const handleFlavorChange = (flavor: string) => {
    setSelectedFlavors(prev =>
      prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleAdd = () => {
    // const selectedData = {
    //   productName: 'French Fries',
    //   size: selectedSize,
    //   flavors: selectedFlavors,
    //   note: note,
    // };
    // console.log('Selected:', selectedData);
    router.push('/orderpage');
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Header title="Product Description" />
        <div className={styles.card}>
          <img
            src="https://images.unsplash.com/photo-1606755962773-0c9b70ef1a68"
            alt="Fries"
            className={styles.image}
          />
          <div className={styles.details}>
            <div className={styles.row}><b>Product name : </b> <span>price :</span></div>
            <div className={styles.section}><b>description</b></div>
            <div className={styles.section}>
              <div><b>Size:</b></div>
              {['S', 'M', 'L'].map(size => (
                <label key={size}>
                  <input
                    type="radio"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />{' '}{size}
                </label>
              ))}
            </div>
            <div className={styles.section}>
              <div><b>Option</b></div>
              {['Cheese', 'Sour cream', 'BBQ', 'Paprika'].map(flavor => (
                <label key={flavor}>
                  <input
                    type="checkbox"
                    checked={selectedFlavors.includes(flavor)}
                    onChange={() => handleFlavorChange(flavor)}
                  />{' '}{flavor}
                </label>
              ))}
            </div>
            <div className={styles.section}>
              <div><b>Note</b></div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                className={styles.textarea}
              />
            </div>
            <button className={styles.addButton} onClick={handleAdd}>add</button>
          </div>
        </div>
      </main>
    </div>
  );
}

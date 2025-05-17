'use client';

import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import styles from './productList.module.css';

const products = [
  {
    id: 1,
    name: 'French Fries',
    image: '/images/french-fries.jpg',
  },
  {
    id: 2,
    name: 'Onion Ring',
    image: '/images/onion-ring.jpg',
  },
  {
    id: 3,
    name: 'Nugget',
    image: '/images/nugget.jpg',
  },
  {
    id: 4,
    name: 'Chicken Pop',
    image: '/images/chicken-pop.jpg',
  },
];

export default function ProductListPage() {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={`${styles.mainContent} header`}>
        <Header title="Product-list"/>
        <div className={styles.grid}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

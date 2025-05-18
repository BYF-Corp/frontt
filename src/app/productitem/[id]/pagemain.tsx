// src/app/productitem/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useOrder } from '@/context/OrderContext';


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

  const { addOrder } = useOrder();
  const handleAdd = () => {
    const selectedData = {
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      flavors: selectedFlavors,
      note,
    };
    // console.log('Selected:', selectedData);
    addOrder({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      flavors: selectedFlavors,
      note: note,
      quantity: quantity,
    })
    router.push('/orderpage');
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{product.name}</h2>
      <img src={product.imgurl} alt={product.name} width={200} />
      <p>{product.description}</p>
      <p><b>Price:</b> {product.price} ฿</p>

      <div>
        <b>Size:</b><br />
        {sizes.map((s: any) => (
          <label key={s.id}>
            <input
              type="radio"
              value={s.size_name}
              checked={selectedSize === s.size_name}
              onChange={() => setSelectedSize(s.size_name)}
            />
            {` ${s.size_name} (+${s.charge} ฿) `}
          </label>
        ))}
      </div>

      <div>
        <b>Flavors:</b><br />
        {flavors.map((f: any) => (
          <label key={f.id}>
            <input
              type="checkbox"
              checked={selectedFlavors.includes(f.flavor_name)}
              onChange={() => handleFlavorChange(f.flavor_name)}
            />
            {` ${f.flavor_name} `}
          </label>
        ))}
      </div>

      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <div>
        <b>Note:</b><br />
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
        />
      </div>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Sidebar from '@/app/components/Sidebar';
// import Header from '@/app/components/Header';
// import styles from './productitem.module.css';

// interface Size {
//   id: number;
//   size_name: string;
//   charge: string;
// }

// interface Flavor {
//   id: number;
//   flavor_name: string;
// }

// export default function ProductItem() {
//   const router = useRouter();
//   const [sizes, setSizes] = useState<Size[]>([]);
//   const [flavors, setFlavors] = useState<Flavor[]>([]);
//   const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
//   const [selectedFlavors, setSelectedFlavors] = useState<number[]>([]);
//   const [note, setNote] = useState('');

//   // Fetch size and flavor from API
//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const sizeRes = await fetch('http://127.0.0.1:8000/api/size');
//         const flavorRes = await fetch('http://127.0.0.1:8000/api/flavor');
//         const sizeData = await sizeRes.json();
//         const flavorData = await flavorRes.json();
//         setSizes(sizeData);
//         setFlavors(flavorData);
//         // set default selected size to first one if not already
//         if (sizeData.length > 0 && selectedSizeId === null) {
//           setSelectedSizeId(sizeData[0].id);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchOptions();
//   }, []);

//   const handleFlavorChange = (id: number) => {
//     setSelectedFlavors(prev =>
//       prev.includes(id)
//         ? prev.filter(f => f !== id)
//         : [...prev, id]
//     );
//   };

//   const handleAdd = () => {
//     const selectedSize = sizes.find(size => size.id === selectedSizeId);
//     const selectedFlavorNames = flavors
//       .filter(flavor => selectedFlavors.includes(flavor.id))
//       .map(flavor => flavor.flavor_name);

//     const selectedData = {
//       productName: 'French Fries',
//       size: selectedSize,
//       flavors: selectedFlavorNames,
//       note: note,
//     };
//     console.log('Selected:', selectedData);
//     router.push('/orderpage');
//   };

//   return (
//     <div className={styles.container}>
//       <Sidebar />
//       <main className={styles.main}>
//         <Header title="Product Description" />
//         <div className={styles.card}>
//           <img
//             src="https://images.unsplash.com/photo-1606755962773-0c9b70ef1a68"
//             alt="Fries"
//             className={styles.image}
//           />
//           <div className={styles.details}>
//             <div className={styles.row}><b>Product name : </b>French Fries <span>price :</span></div>
//             <div className={styles.section}><b>Description</b></div>

//             <div className={styles.section}>
//               <div><b>Size:</b></div>
//               {sizes.map(size => (
//                 <label key={size.id} style={{ display: 'block' }}>
//                   <input
//                     type="radio"
//                     name="size"
//                     value={size.id}
//                     checked={selectedSizeId === size.id}
//                     onChange={() => setSelectedSizeId(size.id)}
//                   />
//                   {' '}{size.size_name} (+฿{parseFloat(size.charge).toFixed(2)})
//                 </label>
//               ))}
//             </div>

//             <div className={styles.section}>
//               <div><b>Option (Flavors)</b></div>
//               {flavors.map(flavor => (
//                 <label key={flavor.id} style={{ display: 'block' }}>
//                   <input
//                     type="checkbox"
//                     checked={selectedFlavors.includes(flavor.id)}
//                     onChange={() => handleFlavorChange(flavor.id)}
//                   />{' '}{flavor.flavor_name}
//                 </label>
//               ))}
//             </div>

//             <div className={styles.section}>
//               <div><b>Note</b></div>
//               <textarea
//                 value={note}
//                 onChange={e => setNote(e.target.value)}
//                 className={styles.textarea}
//               />
//             </div>
//             <button className={styles.addButton} onClick={handleAdd}>Add</button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

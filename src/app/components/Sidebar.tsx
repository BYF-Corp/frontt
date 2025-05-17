'use client'

import React from 'react';
import Link from 'next/link';
import './Sidebar.css';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('jwt_access');
    localStorage.removeItem('jwt_refresh')
  
    document.cookie = 'jwt_access=; path=/; max-age=0'

    router.push('/login')
  }

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul>
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/product-list">Product List</Link></li>
        <li><Link href="/order-page">Orders</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
      <ul>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </ul>
    </div>
  );
};

export default Sidebar;

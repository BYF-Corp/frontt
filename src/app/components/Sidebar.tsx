import React from 'react';
import Link from 'next/link';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul>
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/product-list">Product List</Link></li>
        <li><Link href="/order-page">Orders</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

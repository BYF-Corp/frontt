'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { GiFrenchFries } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import './Sidebar.css';

const navItems = [
  { id: 1, title: 'Home', path: '/home', icon: <IoIosHome /> },
  { id: 2, title: 'Product List', path: '/product-list', icon: <FaClipboardList /> },
  { id: 3, title: 'Orders', path: '/order-page', icon: <GiFrenchFries /> },
  { id: 4, title: 'Dashboard', path: '/dashboard', icon: <FaChalkboardTeacher /> },
];

const Sidebar = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleLogout = () => {
    localStorage.removeItem('jwt_access');
    localStorage.removeItem('jwt_refresh');
    document.cookie = 'jwt_access=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <div
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={{
        width: isExpanded ? '16rem' : '6rem',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="toggle-button" aria-label="Toggle Sidebar">
        <IoMenu size={60} />
      </button>

      {/* Navigation Items */}
      <ul className="nav-list">
        {navItems.map(item => (
          <li key={item.id} className="nav-item">
            <Link href={item.path} className="nav-link">
              <span className="icon">{item.icon}</span>
              {isExpanded && <span className="title">{item.title}</span>}
            </Link>
          </li>
        ))}

        {/* Logout */}
        <li
          className="nav-item logout-item"
          onClick={handleLogout}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleLogout();
          }}
          style={{ marginTop: 'auto' }}
        >
          <MdOutlineLogout size={24} className="icon" />
          {isExpanded && <span className="title">Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import './Sidebar.css';
import { useRouter } from 'next/navigation';
import { IoMenu } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { GiFrenchFries } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";

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
      className="sidebar"
      style={{
        width: isExpanded ? '16rem' : '5rem',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <button onClick={toggleSidebar} className="toggle-button" aria-label="Toggle Sidebar" style={{
        background: 'none',
        border: 'none',
        padding: '1rem',
        cursor: 'pointer',
        outline: 'none',
        color: 'inherit',
      }}>
        <IoMenu size={24} />
      </button>

      <ul className="nav-list" style={{ flexGrow: 1, paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
        {navItems.map(item => (
          <li key={item.id} className="nav-item" style={{
            marginBottom: '1rem',
          }}>
            <Link href={item.path} className="nav-link" style={{
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'background-color 0.3s',
            }}>
              <span className="icon" style={{
                fontSize: '1.5rem',
                marginRight: isExpanded ? '1rem' : 0,
                minWidth: '24px',
                textAlign: 'center',
              }}>
                {item.icon}
              </span>
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
          style={{
            marginTop: 'auto',
            padding: isExpanded ? '0.5rem 1rem' : '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#263238',
            fontWeight: 'bold',
            borderRadius: '6px',
            userSelect: 'none',
          }}
        >
          <span className="icon" style={{
            fontSize: '1.5rem',
            marginRight: isExpanded ? '1rem' : 0,
            minWidth: '24px',
            textAlign: 'center',
          }}><MdOutlineLogout  size={24} /></span>
          {isExpanded && <span className="title">Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

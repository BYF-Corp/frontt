// src/app/home/Home.tsx
import React from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <Header title="Home" />
        <div className="orders">
          <div className="order-item">
            <p>Order ID: 1</p>
            <button>Edit</button>
            <button>Delete</button>
            <button>Confirm</button>
          </div>
        </div>
      </div>
      <div classname="add-button"><button>+</button></div>
    </div>
  );
};

export default Home;
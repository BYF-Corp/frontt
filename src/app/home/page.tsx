import React from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <div className="header">
          <Header title="Home" />
        </div>
        <div className="orders">
          <div className="order-item">
            <p>Order ID: 1</p>
            <div className="order-action">
              <button>Edit</button>
              <button>Delete</button>
              <button>Confirm</button>
            </div>
          </div>
        </div>
        <div className="add-button">
          <button>+ ADD</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

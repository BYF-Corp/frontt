import React from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaCashRegister } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

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
              <button className='Edit'> <FaRegEdit size={24} /></button>
              <button className='Delete'> <FaTrash size={24} /> </button>
              <button className ='check'> <FaCashRegister size={24} />  </button>
            </div>
          </div>
        </div>
        <div className="add-button">
          <button> + ADD</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

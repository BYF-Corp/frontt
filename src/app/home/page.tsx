import React from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaCashRegister } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

async function getOrder() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`)

  if (!res.ok){
    throw new Error('fetch order failed!')
  }

  return res.json()
}

const Home = async () => {
  
  const orders = await getOrder()
  const sortedOrder = orders.sort((a: any, b: any) => new Date(a.date_ordered).getTime() - new Date(b.date_ordered).getTime())

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <div className="header">
          <Header title="Home" />
        </div>
        <div className="orders">
          {
            sortedOrder.map((order: any, index: number) => (
              <div className="order-item" key={index}>
                <p>Order {order.id}: by {order.guest_name}</p>
                <div className="order-action">
                  <button><FaRegEdit size={24} /></button>
                  <button><FaTrash size={24} /></button>
                  <button><FaCashRegister size={24} /></button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="add-button">
          <button> + ADD</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

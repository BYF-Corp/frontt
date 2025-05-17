import React from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaCashRegister } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import OrderItemCard from './components/OrderItemCard';

async function deleteOrder(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}/`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Delete order failed!');
  }

  
  return true;
}


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
              <OrderItemCard key={index} order={order}/>
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

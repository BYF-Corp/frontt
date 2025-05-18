import React from 'react';
import './Home.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import OrderItemCard from './components/OrderItemCard';
import AddOrderButton from './components/AddOrderButton';

// async function getOrder() {
//   console.log('getorder')
//   const res = await fetch(`http://127.0.0.1:8000/api/order`)
//   if (!res.ok){
//     throw new Error('fetch order failed!')
//   }

//   return res.json()
// }
async function getOrder() {
  // console.log('getorder')
  const res = await fetch(`http://127.0.0.1:8000/api/order`)
  if (!res.ok){
    throw new Error('fetch order failed!')
  }

  return res.json()
}
export interface Order {
  id: number;
  guest_name: string;
  date_ordered: Date;
}

const Home = async () => {
  
  const orders = await getOrder()
  const sortedOrder = orders.sort((a: Order, b: Order) => new Date(a.date_ordered).getTime() - new Date(b.date_ordered).getTime())

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <div className="header">
          <Header title="Home" />
        </div>
        <div className="orders">
          {
            sortedOrder.map((order: Order, index: number) => (
              <OrderItemCard key={index} order={order}/>
            ))
          }
        </div>
        <div className="add-button">
          <AddOrderButton />
        </div>
      </div>
    </div>
  );
};

export default Home;

'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import './dashboard.css';

type BestSeller = {
  fried__name: string;
  total_qty: number;
};

type DashboardData = {
  today_revenue: number;
  month_revenue: number;
  total_orders: number;
  best_sellers: BestSeller[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard_summary')  // เปลี่ยนตาม API URL จริงของคุณ
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading dashboard data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!data) return <div>Error loading data</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <Header title="Dashboard" />
        <div className="dashboard-cards">
          <div className="card total-sales">
            <h2>Total Sales</h2>
            <p>${data.today_revenue.toFixed(2)}</p>
          </div>
          <div className="card best-seller">
            <h2>Best Seller</h2>
            <ul>
              {data.best_sellers.map(item => (
                <li key={item.fried__name}>
                  {item.fried__name}: {item.total_qty}
                </li>
              ))}
            </ul>
          </div>
          <div className="card total-orders">
            <h2>Total Order</h2>
            <p>{data.total_orders}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import './dashboard.css';

type BestSeller = {
  fried__name: string;
  total_qty: number;
};
type PopularFlavor = {
  flavor: string;
  times_used: number;
};

type PopularSize = {
  size: string;
  total_sold: number | null;
};

type DailySale = {
  date: string;
  revenue: number;
};

type DashboardData = {
  today_revenue: number;
  month_revenue: number;
  total_orders: number;
  best_sellers: BestSeller[];
  popular_flavors: PopularFlavor[];
  popular_sizes: PopularSize[];
  daily_sales: DailySale[];
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/summary/`)  // เปลี่ยนตาม API URL จริงของคุณ
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
            <h2>Today Sales</h2>
            <p>${data.today_revenue.toFixed(2)}</p>
          </div>

          <div className="card total-month-sales">
            <h2>This Month Sales</h2>
            <p>${data.month_revenue.toFixed(2)}</p>
          </div>

          <div className="card total-orders">
            <h3>Total Orders: </h3>
            <h2> {data.total_orders}</h2>
          </div>

          <div className="card best-seller">
            <h2>Best Sellers</h2>
            <ul>
              {data.best_sellers.map(item => (
                <li key={item.fried__name}>
                  {item.fried__name}: {item.total_qty}
                </li>
              ))}
            </ul>
          </div>

          <div className="card popular-flavors">
            <h2>Popular Flavors</h2>
            <ul>
              {data.popular_flavors.map(flavor => (
                <li key={flavor.flavor}>
                  {flavor.flavor}: {flavor.times_used}
                </li>
              ))}
            </ul>
          </div>

          <div className="card popular-sizes">
            <h2>Popular Sizes</h2>
            <ul>
              {data.popular_sizes.map(size => (
                <li key={size.size}>
                  {size.size}: {size.total_sold ?? 0}
                </li>
              ))}
            </ul>
          </div>

          <div className="card daily-sales">
            <h2>Daily Sales</h2>
            <ul>
              {data.daily_sales.map(sale => (
                <li key={sale.date}>
                  {sale.date}: ${sale.revenue.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );  
}

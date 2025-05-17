// src/app/components/DashboardCard.tsx
import React from "react";

type DashboardCardProps = {
  title: string;
  className?: string;
  size?: string; // ใช้กำหนด grid span
};

export default function DashboardCard({
  title,
  className = "",
  size = "",
}: DashboardCardProps) {
  return (
    <div
      className={`${className} ${size}`}
      style={{
        backgroundColor: "#263238",
        color: "white",
        borderRadius: "8px",
        padding: "1.5rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "2rem",
        textAlign: "center",
        minHeight: "150px",
      }}
    >
      {title}
    </div>
  );
}

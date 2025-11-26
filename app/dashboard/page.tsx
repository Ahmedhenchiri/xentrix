import React from "react";
import Hero from "../components/dashboard/Hero";
import Card from "../components/dashboard/Card";
import DonutChart from "../components/dashboard/DonutChart";
import ProgressCard from "../components/dashboard/ProgressCard";
import BookingsTable from "../components/dashboard/BookingsTable";
import StatusList from "../components/dashboard/StatusList";

export default function DashboardPage() {
  const bookings = [
    { service: "Service Name", total: 2, status: "Completed" as const },
    { service: "Service Name", total: 1, status: "Completed" as const },
    { service: "Service Name", total: 1, status: "In progress" as const },
    { service: "Service Name", total: 2, status: "Pending" as const },
  ];

  const upcoming = [
    { name: "Test", service: "Service Name" },
    { name: "Test", service: "Service Name" },
    { name: "Test", service: "Service Name" },
  ];

  const inProgress = [{ name: "Test", service: "Service Name" }];

  const completed = [
    { name: "Test", service: "Service Name" },
    { name: "Test", service: "Service Name" },
  ];
  return (
    <div className="space-y-5">
      <h2 className="text-[24px] font-bold font-workSans text-[rgba(21,27,56,1)]">
        Dashboard
      </h2>
      <Hero />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sahdow-md">
        <ProgressCard title="Marketing" percent={20} />
        <ProgressCard title="Compliance" percent={20} />
      </div>
      {/* Bookings Table */}
      <BookingsTable data={bookings} />

      {/* Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatusList title="Upcoming" items={upcoming} />
        <StatusList title="In progress" items={inProgress} />
        <StatusList title="Completed" items={completed} />
      </div>
    </div>
  );
}

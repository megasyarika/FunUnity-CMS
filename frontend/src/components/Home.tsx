import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample data for the visitor chart
const data = [
  { name: "Mon", visitors: 400 },
  { name: "Tue", visitors: 300 },
  { name: "Wed", visitors: 500 },
  { name: "Thu", visitors: 200 },
  { name: "Fri", visitors: 320 },
  { name: "Sat", visitors: 680 },
  { name: "Sun", visitors: 700 },
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        {/* Hero Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-8 border-l-4 border-blue-500 transform transition-all duration-300 hover:scale-[1.01]">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Welcome to the Admin Dashboard</h1>
          <p className="text-lg text-blue-600">
            Manage all aspects of the YukMariProject here. From program management to transaction tracking, it's all in your hands.
          </p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-bold text-white mb-2">About Us</h3>
            <p className="text-blue-100 mb-4">Learn more about our mission and vision</p>
            <Link to="/aboutus">
              <button className="mt-2 px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-semibold shadow-md">
                Learn More
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-bold text-white mb-2">Programs</h3>
            <p className="text-blue-100 mb-4">Track and manage community programs</p>
            <Link to="/programs">
              <button className="mt-2 px-6 py-2 bg-white text-blue-500 rounded-lg hover:bg-blue-50 transition duration-300 font-semibold shadow-md">
                Manage Programs
              </button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
            <h3 className="text-xl font-bold text-white mb-2">Transactions</h3>
            <p className="text-blue-100 mb-4">View and manage all transactions</p>
            <Link to="/transactions">
              <button className="mt-2 px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-semibold shadow-md">
                View Transactions
              </button>
            </Link>
          </div>
        </div>

        {/* Visitor Statistics Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-blue-400 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Visitor Statistics</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions Section */}
        <div className="container mx-auto px-6 py-8 bg-white rounded-2xl shadow-xl border-t-4 border-blue-400">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* About Us Box */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:bg-blue-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-blue-800">About Us</h4>
              </div>
              <p className="text-blue-600 mb-4">Learn more about our mission and vision</p>
              <Link to="/aboutus">
                <button className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-semibold shadow-md">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Programs Box */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:bg-blue-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-blue-800">Manage Programs</h4>
              </div>
              <p className="text-blue-600 mb-4">Create and launch a new program for the community.</p>
              <Link to="/programs">
                <button className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-semibold shadow-md">
                  Add Program
                </button>
              </Link>
            </div>

            {/* Transactions Box */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:bg-blue-100">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-blue-800">Manage Transactions</h4>
              </div>
              <p className="text-blue-600 mb-4">Track and manage user payments and financial data.</p>
              <Link to="/transaksi">
                <button className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 font-semibold shadow-md">
                  Manage Transactions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
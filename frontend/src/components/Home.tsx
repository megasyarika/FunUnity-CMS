import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header"; // Corrected the import path for Header

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      {/* Header Component */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Welcome to the Admin Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage all aspects of the YukMariProject here. From program management to transaction tracking, it's all in your hands.
          </p>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">About Us</h3>
            <p className="text-gray-600">Learn more about our mission and vision</p>
            <Link to="/aboutus">
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Learn More
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Programs</h3>
            <p className="text-gray-600">Track and manage community programs</p>
            <Link to="/programs">
              <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
                Manage Programs
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Transactions</h3>
            <p className="text-gray-600">View and manage all transactions</p>
            <Link to="/transactions">
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
                View Transactions
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="container mx-auto px-6 py-8 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* About Us Box */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">About Us</h4>
              <p className="text-gray-600">Learn more about our mission and vision</p>
              <Link to="/aboutus">
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Programs Box */}
            <div className="bg-green-50 p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Manage Programs</h4>
              <p className="text-gray-600">Create and launch a new program for the community.</p>
              <Link to="/programs">
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
                  Add Program
                </button>
              </Link>
            </div>

            {/* Transactions Box */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Manage Transactions</h4>
              <p className="text-gray-600">Track and manage user payments and financial data.</p>
              <Link to="/transaksi">
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300">
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

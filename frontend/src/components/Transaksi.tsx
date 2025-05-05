import React, { useState } from "react";
import Header from "../layout/Header";

const Transaksi = () => {
  const [data, setData] = useState([
    { id: 1, nama: "John Doe", email: "john.doe@gmail.com", amount: 100000, message: "Keep up the good work!" },
    { id: 2, nama: "Jane Smith", email: "jane.smith@yahoo.com", amount: 150000, message: "Thank you for everything!" },
    { id: 3, nama: "Alice Johnson", email: "alice.johnson@hotmail.com", amount: 200000, message: "Best of luck!" },
    { id: 4, nama: "Bob Brown", email: "bob.brown@gmail.com", amount: 250000, message: "Happy to help!" },
    { id: 5, nama: "Charlie Black", email: "charlie.black@aol.com", amount: 300000, message: "Here's to a better future!" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<{ id: number; nama: string; email: string; amount: number; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEditClick = (item: React.SetStateAction<{ id: number; nama: string; email: string; amount: number; message: string; } | null>) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSave = () => {
    if (currentItem) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === currentItem.id
            ? { ...item, nama: currentItem.nama, email: currentItem.email, amount: currentItem.amount, message: currentItem.message }
            : item
        )
      );
    }
    handleModalClose();
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <Header />
      <div className="p-6 flex flex-col overflow-hidden max-w-8xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-700">Transaksi Kami</h2>
              <p className="text-blue-500 text-sm">Kelola semua transaksi dalam satu tampilan</p>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="bg-transparent border-none focus:ring-0 text-blue-700 placeholder-blue-300 w-64 text-sm"
                placeholder="Cari berdasarkan nama, email, atau pesan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table with modern styling */}
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-900 text-white">
                  <th className="py-3 px-6 text-left font-medium rounded-tl-lg">ID</th>
                  <th className="py-3 px-6 text-left font-medium">Nama</th>
                  <th className="py-3 px-6 text-left font-medium">Email</th>
                  <th className="py-3 px-6 text-left font-medium">Amount</th>
                  <th className="py-3 px-6 text-left font-medium">Message</th>
                  <th className="py-3 px-6 text-left font-medium rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50"
                    } hover:bg-blue-100 transition-colors duration-150`}
                  >
                    <td className="py-3 px-6 border-b border-blue-100">{item.id}</td>
                    <td className="py-3 px-6 border-b border-blue-100 font-medium text-blue-700">{item.nama}</td>
                    <td className="py-3 px-6 border-b border-blue-100">{item.email}</td>
                    <td className="py-3 px-6 border-b border-blue-100 font-medium text-blue-800">{`Rp ${item.amount.toLocaleString()}`}</td>
                    <td className="py-3 px-6 border-b border-blue-100 truncate max-w-xs">{item.message}</td>
                    <td className="py-3 px-6 border-b border-blue-100 flex space-x-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-indigo-600 px-3 py-1 bg-indigo-100 rounded-full hover:bg-indigo-200 text-sm transition-colors duration-150 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 px-3 py-1 bg-red-100 rounded-full hover:bg-red-200 text-sm transition-colors duration-150 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No results message */}
          {filteredData.length === 0 && (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-blue-700">Tidak ada hasil ditemukan</h3>
              <p className="mt-1 text-blue-500">Cobalah menggunakan kata kunci pencarian yang berbeda.</p>
            </div>
          )}

          {/* Pagination with better styling */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-blue-600">Menampilkan {filteredData.length} dari {data.length} transaksi</div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 shadow-sm transition-colors duration-150 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md transition-colors duration-150 flex items-center">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal dengan styling yang ditingkatkan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-t-xl flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Transaksi</h2>
              <button 
                onClick={handleModalClose}
                className="text-white hover:text-blue-100 transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-blue-700">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  value={currentItem?.nama || ""}
                  onChange={handleChange}
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-blue-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentItem?.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-blue-700">
                  Amount (IDR)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={currentItem?.amount || ""}
                  onChange={handleChange}
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-blue-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={currentItem?.message || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleModalClose}
                  className="px-5 py-2 border border-blue-200 text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-150"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md transition-colors duration-150"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Transaksi;
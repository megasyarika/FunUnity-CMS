import React, { useState } from 'react';
import Header from "../layout/Header"; 

const AboutUs = () => {
  const [tableData, setTableData] = useState([
    { id: 1, contentType: 'Header Title', content: 'Tentang Kami' },
    { id: 2, contentType: 'Title Description', content: 'Latar Belakang - Visi & Misi' },
    { id: 3, contentType: 'Background', content: 'Yuk-Mari Project atau disingkat YMP merupakan...' },
    { id: 4, contentType: 'Vision & Mission', content: '1. Berkomitmen memberikan layanan berkualitas...' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  // Handle Edit click - opens modal
  const handleEditClick = (item: any) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  // Close the modal without saving
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  // Handle save - update the content
  const handleSave = () => {
    if (currentItem) {
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === currentItem.id
            ? { ...item, content: currentItem.content, contentType: currentItem.contentType }
            : item
        )
      );
    }
    handleModalClose();
  };

  // Handle change - update content or contentType
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle delete - remove the item from the list
  const handleDelete = (id: number) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this item?')) {
      setTableData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <div> <Header />
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col overflow-hidden">
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Tentang Kami</h2>

        {/* Smaller search bar */}
        <div className="mb-4 flex items-center w-64">
          <input
            type="text"
            className="p-1 border border-gray-300 rounded-l-md w-full focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Search..."
          />
          <button className="bg-blue-600 text-white px-2 py-1 rounded-r-md hover:bg-blue-700 text-sm">
            Search
          </button>
        </div>

        {/* Table with complete borders */}
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left border border-blue-500">ID</th>
                <th className="py-3 px-4 text-left border border-blue-500">Content Type</th>
                <th className="py-3 px-4 text-left border border-blue-500">Content</th>
                <th className="py-3 px-4 text-left border border-blue-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50">
                  <td className="py-3 px-4 border border-gray-300">{item.id}</td>
                  <td className="py-3 px-4 border border-gray-300">{item.contentType}</td>
                  <td className="py-3 px-4 border border-gray-300">{item.content}</td>
                  <td className="py-3 px-4 border border-gray-300">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination buttons at the bottom left */}
        <div className="flex justify-start mt-4">
          <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-2 text-sm">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Edit Content</h2>
            <label className="block mb-2 text-gray-700">
              Content Type:
              <input
                type="text"
                name="contentType"
                value={currentItem ? currentItem.contentType : ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-4 text-gray-700">
              Content:
              <textarea
                name="content"
                value={currentItem ? currentItem.content : ''}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AboutUs;

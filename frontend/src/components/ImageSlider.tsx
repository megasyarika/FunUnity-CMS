import React, { useState, useEffect } from 'react';
import Header from "../layout/Header";
import axios from 'axios';
import { data } from 'react-router-dom';


const ImageSlider = () => {
  const [allData, setAllData] = useState<any[]>([]); // Original data from API
  const [filteredData, setFilteredData] = useState<any[]>([]); // Filtered data for display
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5); // Pagination
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem('authToken');
  const apiUrl = "https://backend-donatebank.vercel.app/v1/content/imageslider"; 

  // Logger function for better debugging
  const logger = (type: 'info' | 'error' | 'warning', message: string, data?: any) => {
    const styles = {
      info: 'background: #4299e1; color: white; padding: 2px 5px; border-radius: 3px;',
      error: 'background: #f56565; color: white; padding: 2px 5px; border-radius: 3px;',
      warning: 'background: #ecc94b; color: black; padding: 2px 5px; border-radius: 3px;'
    };
    
    if (data) {
      console.log(`%c${type.toUpperCase()}`, styles[type], message, data);
    } else {
      console.log(`%c${type.toUpperCase()}`, styles[type], message);
    }
  };

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      if (!token) {
        setError("Authentication token not found");
        logger('error', "Authentication token not found");
        setIsLoading(false);
        return;
      }

      try {
        logger('info', "Fetching data from API", apiUrl);
        
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        logger('info', "API Response received", response.data);
        
        // Log the first item from the response to inspect structure
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          logger('info', "First item in API response:", response.data[0]);
        } else if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          logger('info', "First item in API response:", response.data.data[0]);
        }

        if (response.data && Array.isArray(response.data)) {
          setAllData(response.data);
          setFilteredData(response.data);
          logger('info', "Data set successfully (array format)", response.data.length);
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setAllData(response.data.data);
          setFilteredData(response.data.data);
          logger('info', "Data set successfully (nested data format)", response.data.data.length);
        } else {
          setError("Unexpected data format received");
          logger('error', "Unexpected data format received", response.data);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errorMessage = err.response?.data?.message || err.message;
          setError(`Error: ${errorMessage}`);
          logger('error', "Axios error fetching data", {
            status: err.response?.status,
            message: errorMessage,
            data: err.response?.data
          });
        } else {
          setError("An unknown error occurred");
          logger('error', "Unknown error fetching data", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Handle Edit - opens modal with existing item data
  const handleEditClick = (item: any) => {
    logger('info', "Edit clicked for item", item);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  // Handle Add New - opens modal with empty fields for new image
  const handleAddNewClick = () => {
    logger('info', "Add new image clicked");
    setCurrentItem({
      id: null, // No ID for new item
      title: '',
      description: '',
      imageUrl: '', // Using imageUrl field name consistently
    });
    setIsModalOpen(true);
  };

  // Close the modal without saving changes
  const handleModalClose = () => {
    logger('info', "Modal closed");
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  // Handle Save - Add new or update existing image data
  const handleSave = async () => {
    if (!currentItem) {
      logger('warning', "Save attempted with no current item");
      return;
    }
    
    logger('info', "Saving item", currentItem);
    
    try {
      const formData = new FormData();
      formData.append('title', currentItem.title);
      formData.append('description', currentItem.description);

      // If an image is uploaded, append it to the FormData
      if (currentItem.imageUrl instanceof File) {
        formData.append('imageUrl', currentItem.imageUrl);
        logger('info', "File appended to form data", currentItem.imageUrl.name);
      } else if (typeof currentItem.imageUrl === 'string' && currentItem.imageUrl.trim() !== '') {
        // Only append if it's a non-empty string
        formData.append('imageUrl', currentItem.imageUrl);
        logger('info', "Image URL appended to form data", 
          currentItem.imageUrl.substring(0, 30) + (currentItem.imageUrl.length > 30 ? '...' : ''));
      }

      // Log form data entries
      formData.forEach((value, key) => {
        logger('info', `FormData entry: ${key}`, typeof value === 'string' ? (value.length > 30 ? value.substring(0, 30) + '...' : value) : '[File or other data]');
      });

      if (currentItem.id) {
        // Update existing image (PUT request)
        logger('info', `Updating item with ID: ${currentItem.id}`);
        
        const response = await axios.put(
          `${apiUrl}/${currentItem.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        
        logger('info', "Update successful", response.data);
        
        // Update both state arrays
        const updatedItem = response.data;
        setAllData(prevData =>
          prevData.map(item => item.id === currentItem.id ? updatedItem : item)
        );
        setFilteredData(prevData =>
          prevData.map(item => item.id === currentItem.id ? updatedItem : item)
        );
      } else {
        // Add new image (POST request)
        logger('info', "Adding new item");
        
        const response = await axios.post(apiUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        
        logger('info', "Add successful", response.data);
        
        // Add the new item to both state arrays
        const newItem = response.data;
        setAllData(prevData => [...prevData, newItem]);
        setFilteredData(prevData => [...prevData, newItem]);
      }

      handleModalClose(); // Close modal after save
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger('error', "Error saving image", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data
        });
      } else {
        logger('error', "Unknown error saving image", error);
      }
    }
  };

  // Handle change (input fields for title, description)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (currentItem) {
      const updatedItem = {
        ...currentItem,
        [e.target.name]: e.target.value,
      };
      setCurrentItem(updatedItem);
      logger('info', `Field ${e.target.name} changed`, e.target.value);
    }
  };

   // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Store the file object for form upload
        setCurrentItem({
          ...currentItem,
          imageFile: file,
          // Create a preview URL
          imageUrl: URL.createObjectURL(file)
        });
      }
    };
  // Handle delete - remove image item from database
  const handleDelete = async (id: number) => {
    logger('info', `Delete requested for item ID: ${id}`);
    
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        logger('info', `Deleting item with ID: ${id}`);
        
        await axios.delete(`${apiUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        logger('info', `Delete successful for ID: ${id}`);
        
        // Update both state arrays
        setAllData(prevData => prevData.filter(item => item.id !== id));
        setFilteredData(prevData => prevData.filter(item => item.id !== id));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          logger('error', `Error deleting item ID: ${id}`, {
            status: error.response?.status,
            message: error.response?.data?.message || error.message
          });
        } else {
          logger('error', `Unknown error deleting item ID: ${id}`, error);
        }
      }
    } else {
      logger('info', `Delete cancelled for item ID: ${id}`);
    }
  };

  // Handle search
  const handleSearch = () => {
    logger('info', `Search query: "${searchQuery}"`);
    
    if (searchQuery.trim() === "") {
      setFilteredData(allData); // Show all data when search query is empty
      logger('info', "Empty search - showing all data", allData.length);
    } else {
      const filtered = allData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      logger('info', `Search results: ${filtered.length} items found`);
    }
    setCurrentPage(1); // Reset to first page after search
  };

  // Get current page data for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => {
        const newPage = prev + 1;
        logger('info', `Pagination: moving to page ${newPage} of ${totalPages}`);
        return newPage;
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => {
        const newPage = prev - 1;
        logger('info', `Pagination: moving to page ${newPage} of ${totalPages}`);
        return newPage;
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <Header />
      <div className="p-6 flex flex-col overflow-hidden max-w-8xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">ImageSlider</h2>
              <p className="text-blue-500 text-sm">Manage your image slider collection</p>
            <button
              onClick={handleAddNewClick}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md transition-colors duration-150 flex items-center"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Image
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 rounded-md flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="bg-transparent border-none focus:ring-0 text-blue-700 placeholder-blue-300 w-64 text-sm"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="text-blue-700 hover:text-blue-900 transition-colors duration-150"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16 flex flex-col items-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600"></div>
              <p className="mt-4 text-blue-600 font-medium">Loading your images...</p>
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-16 bg-blue-50 rounded-lg border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">No Images Found</h3>
              <p className="text-blue-500">
                {searchQuery ? "Try a different search term or add new images." : "Start by adding your first image."}
              </p>
              <button
                onClick={handleAddNewClick}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md transition-colors duration-150"
              >
                Add Your First Image
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-900 text-white">
                    <th className="py-3 px-6 text-left font-medium rounded-tl-lg">ID</th>
                    <th className="py-3 px-6 text-left font-medium">Title</th>
                    <th className="py-3 px-6 text-left font-medium">Description</th>
                    <th className="py-3 px-6 text-left font-medium">Image</th>
                    <th className="py-3 px-6 text-left font-medium rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-blue-50"
                      } hover:bg-blue-100 transition-colors duration-150`}
                    >
                      <td className="py-4 px-6 border-b border-blue-100">{item.id}</td>
                      <td className="py-4 px-6 border-b border-blue-100 font-medium text-blue-700">{item.title}</td>
                      <td className="py-4 px-6 border-b border-blue-100 truncate max-w-xs">{item.description}</td>
                      <td className="py-4 px-6 border-b border-blue-100">
                        {item.imageUrl ? (
                          <div className="relative group">
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="h-16 w-24 object-cover rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://via.placeholder.com/100?text=No+Image';
                                logger('warning', `Image failed to load for item ${item.id}`, item.imageUrl);
                              }}
                            />
                            <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-opacity duration-300"></div>
                          </div>
                        ) : (
                          <div className="h-16 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 border-b border-blue-100">
                        <div className="flex space-x-2">
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination with better styling */}
          {data.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-blue-600">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} images
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    currentPage === 1
                      ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                      : "bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 shadow-sm transition-colors duration-150"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    currentPage >= totalPages
                      ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md transition-colors duration-150"
                  }`}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal dengan styling yang ditingkatkan */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-t-xl flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {currentItem?.id ? 'Edit Image' : 'Add New Image'}
              </h2>
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
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentItem?.title || ""}
                  onChange={handleChange}
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150"
                  placeholder="Enter image title"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-blue-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentItem?.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-150"
                  placeholder="Enter image description"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-blue-700">
                  Image Upload
                </label>
                <div className="bg-blue-50 p-4 rounded-lg border border-dashed border-blue-300 text-center cursor-pointer hover:bg-blue-100 transition-colors duration-150">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-blue-700 font-medium">Click to upload an image</span>
                    <span className="text-blue-500 text-sm mt-1">or drag and drop</span>
                  </label>
                </div>
              </div>

              {currentItem?.imageUrl && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-700 mb-2">Image Preview:</p>
                  <div className="flex justify-center">
                    <img
                      src={currentItem.imageUrl}
                      alt="Preview"
                      className="h-40 object-contain rounded-md shadow-sm"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://via.placeholder.com/100?text=No+Image';
                        logger('warning', 'Preview image failed to load', currentItem.imageUrl);
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleModalClose}
                  className="px-5 py-2 border border-blue-200 text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 shadow-md transition-colors duration-150"
                >
                  Save Image
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

export default ImageSlider;
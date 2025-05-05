import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  useNavigate, 
  useLocation 
} from 'react-router-dom';

// Components
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ErrorBoundary from './utils/ErrorBoundary';
import Programs from './components/Programs';
import Transaksi from './components/Transaksi';
import Partners from './components/Partners';
import Settings from './components/Settings';
import Sidebar from './layout/Sidebar';
import Login from './components/Login';
import Logout from './components/Logout';

// Context
import { AuthProvider } from './contexts/AuthContext';
import axios from "axios";
import ImageSlider from './components/ImageSlider';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;


// Protected Route Component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  
  // Check authentication on route change
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    // If user isn't logged in and trying to access protected route, redirect to login
    if (!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/logout") {
      navigate("/login");
    }
  }, [navigate, location]);
  
  // Determine if current page should show sidebar
  const shouldShowSidebar = !["/login", "/logout"].includes(location.pathname);
  
  return (
    <div className="app-container flex">
      {/* Show sidebar only if not on login/logout pages */}
      {shouldShowSidebar && (
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          isLoggedIn={!!localStorage.getItem("authToken")}
        />
      )}
      
      <div
        className="main-content transition-all duration-300 ease-in-out"
        style={{
          marginLeft: shouldShowSidebar ? (isSidebarOpen ? "250px" : "80px") : "0px",
          width: shouldShowSidebar
            ? `calc(100% - ${isSidebarOpen ? "250px" : "80px"})`
            : "100%",
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
          <Route path="/aboutus" element={
            <PrivateRoute>
              <ErrorBoundary>
              <AboutUs />
              </ErrorBoundary>
            </PrivateRoute>
          } />
           
          <Route path="/imageslider" element={
            <PrivateRoute>
              <ImageSlider />
            </PrivateRoute>
          } />
          
          <Route path="/programs" element={
            <PrivateRoute>
             <ErrorBoundary>
              <Programs />
              </ErrorBoundary>
            </PrivateRoute>
          } />

        <Route path="/partners" element={
            <PrivateRoute>
              <Partners />
            </PrivateRoute>
          } />

          <Route path="/transaksi" element={
            <PrivateRoute>
              <Transaksi />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

// Root render
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

export default App;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logoCMS from "../assets/images/logoCMS.jpg";
import login1 from "../assets/images/login1.jpg";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const { login, error: authError, loading: authLoading, isAuthenticated, clearError } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Sinkronisasi error dari context
  useEffect(() => {
    if (authError && error !== authError) {
      setError(authError);
    }
  }, [authError, error]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) clearError(); // Hanya bersihkan error jika ada sebelumnya
    setError(""); // Reset error lokal

    if (!recaptchaToken) {
      setError("Please verify that you are not a robot.");
      return;
    }

    try {
      // Integrasikan recaptchaToken pada login
      await login(email, password, recaptchaToken); // Now supports 3 arguments
      // Redirect akan dilakukan oleh useEffect di atas
    } catch (err) {
      console.error("Login attempt failed", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f8ff]">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg">
        
        {/* Left Side Image */}
        <div className="hidden md:flex w-1/2 bg-[#fffbfb] justify-center items-center p-3 pt-24">
          <img src={login1} alt="Illustration" className="w-4/5 h-auto" />
        </div>
        
        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-12 bg-[#f4f8fb] rounded-r-lg">
          <div className="flex justify-center mb-2">
            <img src={logoCMS} alt="Logo" className="w-28 h-auto" />
          </div>
          <h2 className="text-center text-xl font-semibold text-[#333] mb-8">
            Please enter your details
          </h2>
          
          <form onSubmit={handleLogin}>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}
            
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm text-[#333] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Account"
                className="w-full p-3 border border-[#b0c4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                required
              />
            </div>
            
            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm text-[#333] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                className="w-full p-3 border border-[#b0c4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                required
              />
            </div>

            {/* ReCAPTCHA */}
            <div className="mb-4">
              <ReCAPTCHA
                sitekey="6LdS5PkqAAAAAHZZeU73vxO99m-sKKQYDfZjSVGN" // Ganti dengan site key Anda
                onChange={(token) => setRecaptchaToken(token || "")}
              />
            </div>
            
            {/* Forgot Password Link */}
            <div className="flex justify-between items-center mb-6">
              <a
                href="#"
                className="text-sm text-[#007bff] hover:text-[#0056b3]"
              >
                Forgot Password?
              </a>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={authLoading}
              className={`w-full py-3 bg-[#007bff] text-white rounded-lg font-semibold hover:bg-[#0056b3] transition duration-300 ${
                authLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {authLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
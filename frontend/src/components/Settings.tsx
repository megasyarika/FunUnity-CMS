import React, { useState } from "react";
import Header from "../layout/Header";

const Settings = () => {
  const [email, setEmail] = useState("yukmari@gmail.com");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleEmailChange = () => {
    if (newEmail === "") {
      setEmailError("Email baru tidak boleh kosong.");
      return;
    }
    setEmail(newEmail);
    setNewEmail("");
    setEmailError("");
    setSuccessMessage("Email berhasil diubah!");
    setShowEmailForm(false);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handlePasswordChange = () => {
    if (newPassword === "" || newPasswordConfirm === "") {
      setPasswordError("Password baru dan konfirmasi password harus diisi.");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setPasswordError("Password baru dan konfirmasi password tidak cocok.");
      return;
    }
    setPassword(newPassword);
    setNewPassword("");
    setNewPasswordConfirm("");
    setPasswordError("");
    setSuccessMessage("Password berhasil diubah!");
    setShowPasswordForm(false);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      
      {/* Main Content */}
      <div className="p-6 flex flex-col overflow-hidden max-w-8xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Settings Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-900 p-6 text-white">
            <h2 className="text-xl font-semibold mb-1">Pengaturan Akun</h2>
            <p className="text-blue-100 text-xs">Kelola informasi akun Anda</p>
          </div>

          <div className="p-6">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p>{successMessage}</p>
              </div>
            )}

            {/* Email Settings */}
            <div className="mb-8 bg-blue-50 p-4 rounded-xl shadow-md">
              <div className="flex items-center mb-3">
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-blue-800">Data Email</h3>
              </div>
              <p className="text-blue-600 mb-3">Saat ini menggunakan email: <span className="font-semibold">{email}</span></p>

              {!showEmailForm ? (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="bg-blue-600 text-white py-1.5 px-6 rounded-lg transition-all duration-300 hover:bg-blue-700 text-xs font-medium shadow-md"
                >
                  Ganti Email
                </button>
              ) : (
                <div className="bg-white p-3 rounded-lg shadow-md">
                  <input
                    type="email"
                    placeholder="Masukkan Email Baru"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-2 mt-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {emailError}
                    </p>
                  )}
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleEmailChange}
                      className="bg-blue-600 text-white py-1.5 px-6 rounded-lg transition-all duration-300 hover:bg-blue-700 text-xs font-medium shadow-md w-full"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => {
                        setShowEmailForm(false);
                        setEmailError("");
                        setNewEmail("");
                      }}
                      className="bg-gray-200 text-gray-800 py-1.5 px-6 rounded-lg transition-all duration-300 hover:bg-gray-300 text-xs font-medium shadow-md w-full"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Password Settings */}
            <div className="mb-6 bg-blue-50 p-4 rounded-xl shadow-md">
              <div className="flex items-center mb-3">
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-blue-800">Data Password</h3>
              </div>

              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="bg-blue-600 text-white py-1.5 px-6 rounded-lg transition-all duration-300 hover:bg-blue-700 text-xs font-medium shadow-md"
                >
                  Ganti Kata Sandi
                </button>
              ) : (
                <div className="bg-white p-3 rounded-lg shadow-md">
                  <input
                    type="password"
                    placeholder="Masukkan Password Baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 mt-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Konfirmasi Password Baru"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    className="w-full p-2 mt-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {passwordError}
                    </p>
                  )}
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handlePasswordChange}
                      className="bg-blue-600 text-white py-1.5 px-6 rounded-lg transition-all duration-300 hover:bg-blue-700 text-xs font-medium shadow-md w-full"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordError("");
                        setNewPassword("");
                        setNewPasswordConfirm("");
                      }}
                      className="bg-gray-200 text-gray-800 py-1.5 px-6 rounded-lg transition-all duration-300 hover:bg-gray-300 text-xs font-medium shadow-md w-full"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Support Section */}
            <div className="mt-8 bg-blue-100 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 p-2 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-blue-800 mb-2">Butuh Bantuan?</h3>
                  <p className="text-blue-600 mb-3">Jika Anda mengalami masalah dengan akun Anda, silakan hubungi tim dukungan kami.</p>
                  <button className="bg-blue-500 text-white py-1.5 px-6 rounded-lg transition-all duration-300 hover:bg-blue-600 text-xs font-medium shadow-md flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Hubungi Dukungan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

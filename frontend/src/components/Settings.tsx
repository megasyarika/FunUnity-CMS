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
    setSuccessMessage("Email berhasil diubah.");
    setShowEmailForm(false);
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
    setSuccessMessage("Password berhasil diubah.");
    setShowPasswordForm(false);
  };

  return (
    <div>
      <Header />
      {/* Container Pengaturan */}
      <div className="pt-6 px-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-indigo-700 mb-2">Pengaturan Akun</h2>

        {/* Email Settings */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-indigo-600 mb-2">Data Email</h3>
          <p className="text-xs text-gray-500 mb-2">Saat ini menggunakan email: {email}</p>

          {!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="bg-indigo-600 text-white py-1 px-6 rounded-md transition-all duration-300 hover:bg-indigo-700 text-xs"
            >
              Ganti Email
            </button>
          ) : (
            <div>
              <input
                type="email"
                placeholder="Masukkan Email Baru"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-xs"
              />
              {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handleEmailChange}
                  className="bg-indigo-600 text-white py-1 px-6 rounded-md transition-all duration-300 hover:bg-indigo-700 text-xs w-full"
                >
                  Ganti Email
                </button>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="bg-gray-300 text-gray-800 py-1 px-6 rounded-md transition-all duration-300 hover:bg-gray-400 text-xs w-full"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>

        <hr className="border-t-2 border-gray-200 my-4" />

        {/* Password Settings */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-indigo-600 mb-2">Data Password</h3>

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="bg-indigo-600 text-white py-1 px-6 rounded-md transition-all duration-300 hover:bg-indigo-700 text-xs"
            >
              Ganti Kata Sandi
            </button>
          ) : (
            <div>
              <input
                type="password"
                placeholder="Masukkan Password Baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-xs"
              />
              <input
                type="password"
                placeholder="Konfirmasi Password Baru"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-xs"
              />
              {passwordError && <p className="text-red-500 text-xs mt-2">{passwordError}</p>}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handlePasswordChange}
                  className="bg-indigo-600 text-white py-1 px-6 rounded-md transition-all duration-300 hover:bg-indigo-700 text-xs w-full"
                >
                  Ganti Kata Sandi
                </button>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="bg-gray-300 text-gray-800 py-1 px-6 rounded-md transition-all duration-300 hover:bg-gray-400 text-xs w-full"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>

        <hr className="border-t-2 border-gray-200 my-4" />

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-600 text-xs mt-2">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Settings;

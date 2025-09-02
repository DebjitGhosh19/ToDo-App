import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestPasswordReset } from "../../auth/TodoAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requestPasswordReset(email);
      toast.success(
        res.message || "If the email exists, a reset link was sent."
      );
      if (res.token) {
        navigate(`/reset-password/${res.token}`);
      }
    } catch (err) {
      toast.error("Failed to request reset.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link to="/login" className="text-blue-600 hover:underline">
            ← Back to login
          </Link>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Forgot password
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your account email to receive a reset link.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-xl py-2.5 hover:bg-blue-700"
            >
              Reset 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    username: "",
    userType: "customer",
  });

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };
    loadGoogleScript();
  }, []);

  const initializeGoogleSignIn = () => {
    window.google.accounts.id.initialize({
      client_id:
        "534784964272-jbr7mh16lrq9l40ghvsoo940r7h0l06n.apps.googleusercontent.com",
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        loginData,
        { withCredentials: true }
      );

      if (data.success) {
        handleSuccessfulAuth(data.user);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials or server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/signup`,
        signupData,
        { withCredentials: true }
      );

      if (data.success) {
        alert(data.message);
        handleSuccessfulAuth(data.user);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(`Signup failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.error("Google Sign-In prompt not displayed:", notification);
        }
      });
    } catch (error) {
      console.error("Error initiating Google Sign-In:", error);
      alert("Failed to initiate Google Sign-In. Please try again.");
    }
  };

  const handleGoogleResponse = async (response) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/google-auth`,
        { credential: response.credential },
        { withCredentials: true }
      );

      if (data.success) {
        handleSuccessfulAuth(data.user);
      }
    } catch (error) {
      console.error("Error during Google sign in:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSuccessfulAuth = (user) => {
    if (user.role === "delivery") {
      console.log("Navigating to /delivery");
      navigate("/delivery");
    } else if (user.role === "admin") {
      console.log("Navigating to /admin");
      navigate("/admin");
    } else {
      console.log("Navigating to /");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f2ef]">
      <div className="w-full max-w-md bg-white rounded-sm shadow-sm overflow-hidden">
        <div className="grid grid-cols-2">
          <button
            className={`py-3 text-center text-sm tracking-wide transition-colors ${
              activeTab === "login"
                ? "bg-[#2f3633] text-white"
                : "bg-[#f5f2ef] text-[#2f3633]"
            }`}
            onClick={() => setActiveTab("login")}
          >
            LOGIN
          </button>
          <button
            className={`py-3 text-center text-sm tracking-wide transition-colors ${
              activeTab === "signup"
                ? "bg-[#2f3633] text-white"
                : "bg-[#f5f2ef] text-[#2f3633]"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            SIGN UP
          </button>
        </div>

        {activeTab === "login" && (
          <div className="p-8">
            <h2 className="text-2xl font-light mb-2 text-[#2f3633]">
              Welcome Back
            </h2>
            <p className="text-sm text-[#6b7280] mb-8">
              Enter your credentials to access your account
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-medium text-[#2f3633] mb-2 tracking-wide"
                >
                  EMAIL
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-sm text-sm focus:outline-none focus:border-[#2f3633] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-medium text-[#2f3633] mb-2 tracking-wide"
                >
                  PASSWORD
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-sm text-sm focus:outline-none focus:border-[#2f3633] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2f3633] text-white py-3 rounded-sm hover:bg-[#1a1f1c] transition-colors text-sm tracking-wide"
                disabled={isLoading}
              >
                {isLoading ? "PROCESSING..." : "LOGIN"}
              </button>
            </form>
            <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-sm hover:bg-gray-50 transition-colors text-sm tracking-wide flex items-center justify-center"
              >
                <img
                  src="/google-icon.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Login with Google
              </button>
            </div>
          </div>
        )}

        {activeTab === "signup" && (
          <div className="p-8">
            <h2 className="text-2xl font-light mb-2 text-[#2f3633]">
              Create Account
            </h2>
            <p className="text-sm text-[#6b7280] mb-8">
              Enter your details to create a new account
            </p>
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-medium text-[#2f3633] mb-2 tracking-wide"
                >
                  EMAIL
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-sm text-sm focus:outline-none focus:border-[#2f3633] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-username"
                  className="block text-xs font-medium text-[#2f3633] mb-2 tracking-wide"
                >
                  USERNAME
                </label>
                <input
                  id="signup-username"
                  type="text"
                  placeholder="Choose a username"
                  value={signupData.username}
                  onChange={(e) =>
                    setSignupData({ ...signupData, username: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-sm text-sm focus:outline-none focus:border-[#2f3633] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-medium text-[#2f3633] mb-2 tracking-wide"
                >
                  PASSWORD
                </label>
                <input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-sm text-sm focus:outline-none focus:border-[#2f3633] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2f3633] text-white py-3 rounded-sm hover:bg-[#1a1f1c] transition-colors text-sm tracking-wide"
                disabled={isLoading}
              >
                {isLoading ? "PROCESSING..." : "CREATE ACCOUNT"}
              </button>
            </form>
            <div className="mt-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-sm hover:bg-gray-50 transition-colors text-sm tracking-wide flex items-center justify-center"
              >
                <img
                  src="/google-icon.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Sign up with Google
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

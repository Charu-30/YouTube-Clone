import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if (storedUser) {
      const parsedUser = JSON.stringify(storedUser);
      setUser(parsedUser.username);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };
  // Handle Form SUbmission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isLogin
      ? "https://youtube-clone-1-oo9t.onrender.com/api/auth/login"
      : "https://youtube-clone-1-oo9t.onrender.com/api/auth/register";

    try {
      let requestData;
      let headers;

      if (isLogin) {
        //Send JSON for login
        requestData = {
          email: formData.email,
          password: formData.password,
        };
        headers = { "Content-Type": "application/json" };
      } else {
        //Send formData for register
        requestData = new FormData();
        requestData.append("username", formData.username);
        requestData.append("email", formData.email);
        requestData.append("password", formData.password);
        if (formData.avatar) {
          requestData.append("avatar", formData.avatar);
        }
        headers = { "Content-Type": "multipart/form-data" };
      }
      // console.log("Sending data:", requestData);
      const { data } = await axios.post(url, requestData, { headers });
      // console.log("Response:", data);

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); //Store user object
        setUser(data.user.username);
        setAvatarPreview(data.user.avatar);
        navigate("/");
      } else {
        alert("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Login error:", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />

          {/* Avatar Upload with Preview */}
          {!isLogin && (
            <div className="flex flex-col items-center gap-3">
              <label
                htmlFor="avatar-upload"
                className="text-gray-700 font-semibold"
              >
                Upload Avatar
              </label>
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          className="mt-4 text-blue-500 cursor-pointer text-center"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default SignIn;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn(){
    const [formData, setFormData]= useState({username: "", email: "", password: ""});
    const [isLogin, setIsLogin]= useState(true);
    const [loading, setLoading]= useState(false);
    const [user, setUser]= useState(null);
    const navigate= useNavigate();

    // Check if user is already logged in
    useEffect(() => {
      
      const storedUser = localStorage.getItem("user");
      console.log("Stored User:",storedUser);
      if (storedUser) {
        const parsedUser= JSON.stringify(storedUser);
          setUser(parsedUser.username);
      }
  }, []);

    // Handle input change
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Handle avatar upload
    const handleFileChange= (e)=>{
      setFormData({...formData, avatar: e.target.files[0]});
    }
    // Handle Form SUbmission
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoading(true);

        const url= isLogin 
            ? "http://localhost:5000/api/auth/login"
            : "http://localhost:5000/api/auth/register";

       try {
            let requestData;
            let headers;

            if(isLogin){
              //Send JSON for login
              requestData= {
                email: formData.email,
                password: formData.password
              };
              headers={"Content-Type": "application/json"};
            }else{
              //Send formData for register
              requestData= new FormData();
              requestData.append("username", formData.username);
              requestData.append("email", formData.email);
              requestData.append("password", formData.password);
              if(formData.avatar){
                  requestData.append("avatar", formData.avatar);
              }
              headers={"Content-Type": "multipart/form-data"};
            }
            console.log("Seding data:",requestData);
            const { data } = await axios.post(url, requestData, {headers});
            console.log("Response:", data);
          
            if (isLogin) {
                localStorage.setItem("token", data.token);
                // localStorage.setItem("username", data.user.username);
                // if(data.user.avatar) localStorage.setItem("avatar", data.user.avatar);
                localStorage.setItem("user", JSON.stringify(data.user)); //Stoe user object
                setUser(data.user.username);
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

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-semibold mb-4">{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border px-3 py-2"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border px-3 py-2"
                  />
                </>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border px-3 py-2"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border px-3 py-2"
                required
              />
              
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                {loading? "Processing...": isLogin ? "Login" : "Register"}
              </button>
            </form>

            <p className="mt-4 text-blue-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </p>
          </div>
    </div>
    )
}

export default SignIn;
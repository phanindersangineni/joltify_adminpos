
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext";
export const DEV = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { login } = useAuth();
  const router = useRouter();
  // State for form fields and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error when user types
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form is valid, making API call...");

      try {
       
        const response = await axios.post(`${DEV}/joltify/user/login`, formData);

       console.log(response.data.data);
        if (response.data.data == 'SUCCESS') {

          let resdata = response.data.message;
          await localStorage.setItem('posuser', JSON.stringify(resdata.user));
          
          await localStorage.setItem('posaccesstoken', resdata.accessToken);
          document.cookie = `postoken=${resdata.accessToken}; path=/;`;
         console.log(resdata.user);
          login(resdata.user, resdata.accessToken);
          
          Swal.fire({
            text: 'Login Successful',
            icon: 'success',
            timer: 2000, // The alert will automatically close after 3 seconds
            showConfirmButton: false, // Hide the confirm button
          });
          window.dispatchEvent(new Event("loginsuccess"));
          router.push(`/dashboards`);
  
        } else if (response.data.data == 'USER_NOT_FOUND') {
          Swal.fire({
            text: 'User does not exists, kindly register',
            icon: 'error',
            timer: 3000, // The alert will automatically close after 3 seconds
            showConfirmButton: true, // Hide the confirm button
          });
  
        } else if (response.data.data == 'INVALIDPASSWORD') {
          Swal.fire({
            text: 'Please enter a valid password',
            icon: 'error',
            timer: 3000, // The alert will automatically close after 3 seconds
            showConfirmButton: true, // Hide the confirm button
          });
  
        }
  
        else {
          Swal.fire({
            text: 'Failed to login',
            icon: 'error',
            timer: 3000, // The alert will automatically close after 3 seconds
            showConfirmButton: true, // Hide the confirm button
          });
        }

        


        console.log("Login successful!");
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Joltify</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <link rel="stylesheet" href="/assets/css/login.css" />
      </Head>

      <div className="container">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="input-box">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="input-box">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <i className="fas fa-eye eye-icon" id="togglePassword"></i>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            

            {/* Submit Button */}
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

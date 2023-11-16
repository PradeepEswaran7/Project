import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './External.css'; 

const Login = () => {
  
    const [formData, setFormData] = useState({
      useremail: '',
      userpass: '',
    });
  
    const [errors, setErrors] = useState({
      useremail: '',
      userpass: '',
    });
  
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const validateForm = () => {
      let isValid = true;
      const newErrors = { useremail: '', userpass: '' };
  
      // Email validation
      if (!formData.useremail) {
        newErrors.useremail = 'Email is required';
        isValid = false;
      } else if (!validateEmail(formData.useremail)) {
        newErrors.useremail = 'Invalid email address';
        isValid = false;
      }
  
      // Password validation
      if (!formData.userpass) {
        newErrors.userpass = 'Password is required';
        isValid = false;
      } else if (!validatePassword(formData.userpass)) {
        newErrors.userpass =
          'At least one lowercase letter, At least one uppercase letter, At least one special character, No spaces allowed, Minimum 8 and maximum 16 characters';
        isValid = false;
      }
  
      setErrors(newErrors);
      return isValid;
    };
  
    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
  
    const validatePassword = (password) => {
      const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
      return passwordPattern.test(password);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        setLoading(true);
        await loginUser();
        setLoading(false);
      }
    };
  
    const loginUser = async () => {
      const uemail = formData.useremail;
      const upass = formData.userpass;
  
      try {
        const response = await axios.get("http://localhost:8888/login");
        const data = response.data;
  
        const userFound = data.some((val) => val.email === uemail && val.password === upass);
  
        if (userFound) {
          sessionStorage.setItem("user", uemail);
          // Redirect or perform additional actions after successful login
          // Example: window.location.href = "/dashboard";
        } else {
          window.alert("Wrong Credential");
          setFormData({
            useremail: '',
            userpass: '',
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        window.alert("Error fetching user data. Please try again later.");
      }
    };
  
    return (
      <div >
        <div className="col-lg-4 mx-auto">
          <div className="card" style={{ backgroundColor: '#f0f0f0' }}>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <div className="card-body">
              <form className='myform' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type='text'
                    name='useremail'
                    value={formData.useremail}
                    onChange={handleChange}
                    className='form-control'
                    placeholder="Enter your Email"
                  />
                  <div className="text-danger">{errors.useremail}</div>
                </div>
                <div className="mb-3">
                  <input
                    type='password'
                    name='userpass'
                    value={formData.userpass}
                    onChange={handleChange}
                    className='form-control'
                    placeholder="Enter your password"
                  />
                  <div className="text-danger">{errors.userpass}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type='submit' className='btn btn-success mt-2'>Login        
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
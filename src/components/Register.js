import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    userpass: '',
    usermobile: '',
    textaddr: '',
    gender: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    useremail: '',
    userpass: '',
    usermobile: '',
    textaddr: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Add validation
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case 'username':
        newErrors.username = value.length < 1 ? 'Name is required.' : '';
        break;
      case 'useremail':
        newErrors.useremail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Invalid email address.';
        break;
      case 'userpass':
        // Password validation criteria
        newErrors.userpass = '';
        if (value.length < 8 || value.length > 16 || !/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[!@#$%^&*(),.?":{}|<>]/.test(value) || /\s/.test(value)) {
          newErrors.userpass = 'At least one lowercase letter, At least one uppercase letter, At least one special character, No spaces allowed, Minimum 8 and maximum 16 characters';
        }
        break;
      case 'usermobile':
        newErrors.usermobile = /^\d{10}$/.test(value) ? '' : 'Mobile number must be 10 digits.';
        break;
      // Add validation for other fields if needed
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if there are no errors
    if (Object.values(errors).every((error) => error === '')) {
      // Make your API call or other actions here
      axios.post("http://localhost:8888/login", formData).then(() => {
        window.alert("Customer added Successfully");
      }).catch((err) => {});
    } else {
      console.log('Form has errors. Cannot submit.');
    }
  };

  return (
    <div className="col-lg-4 mx-auto">
      <div className="card" style={{ backgroundColor: '#f0f0f0' }}>
        <h1 style={{ textAlign: 'center' }}>Register</h1>
        <div className="card-body">
          <form className="myform" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your Name"
              />
              <div className="text-danger">{errors.username}</div>
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your Email"
              />
              <div className="text-danger">{errors.useremail}</div>
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="userpass"
                value={formData.userpass}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your Password"
              />
              <div className="text-danger">{errors.userpass}</div>
            </div>
            <div className="mb-3">
              <input
                type='text'
                name='usermobile'
                value={formData.usermobile}
                onChange={handleChange}
                className='form-control'
                placeholder="Enter your Mobile Number"
              />
              <div className="text-danger">{errors.usermobile}</div>
            </div>
            <div className="mb-3">
              <textarea name="textaddr" id="textaddr" rows="3" cols="49" className='form-control' placeholder="Enter your Address"></textarea>
              <div className="text-danger"></div>
            </div>
            <div className="mb-3">
              <input type="radio" id="genderMale" name="gender"  value="M"/>
              Male &nbsp;&nbsp;
              <input type="radio" id="genderFemale" name="gender" value={formData.gender}/>
              Female &nbsp;&nbsp;
              <input type="radio" id="genderTrans" name="gender" value={formData.gender}/>
              Transgender
              <div className="text-danger"></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-success mt-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

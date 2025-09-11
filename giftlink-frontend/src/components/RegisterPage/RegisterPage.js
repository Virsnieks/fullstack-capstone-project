import React, { useState } from 'react';
import './RegisterPage.css';

// ✅ Task 1: Import urlConfig
import { urlConfig } from '../../config';
// ✅ Task 2: Import useAppContext
import { useAppContext } from '../../context/AuthContext';
// ✅ Task 3: Import useNavigate
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  // existing states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Task 4: State for error message
  const [showerr, setShowerr] = useState('');

  // ✅ Task 5: navigate + setIsLoggedIn
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  // ✅ Updated handleRegister
  const handleRegister = async () => {
    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        method: 'POST', // Task 6
        headers: {      // Task 7
          'content-type': 'application/json',
        },
        body: JSON.stringify({ // Task 8
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        navigate('/app');
      } else {
        const errorData = await response.json();
        setShowerr(errorData.message || 'Registration failed');
      }
    } catch (e) {
      console.log('Error fetching details: ' + e.message);
      setShowerr('Something went wrong. Try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="register-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Register</h2>

            {/* First Name input */}
            <div className="mb-4">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* You’ll also want to add inputs for lastName, email, password just like above */}

            {showerr && <p className="text-danger">{showerr}</p>}

            {/* Register button */}
            <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>
              Register
            </button>

            <p className="mt-4 text-center">
              Already a member? <a href="/app/login" className="text-primary">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

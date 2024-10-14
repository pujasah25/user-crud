import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formVal.name || !formVal.email || !formVal.age) {
      setError("All fields are required.");
      return;
    }
    
    try {
      await axios.post(`${API_URL}/users`, formVal); // Send form data
      navigate("/"); // Navigate to home after successful submission
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 shadow-lg">
        <h2>Add User</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name..."
              className="form-control"
              value={formVal.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email..."
              className="form-control"
              value={formVal.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter Age..."
              className="form-control"
              value={formVal.age}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

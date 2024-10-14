import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch the user details when the component mounts mns after clicking the Edit button from homepage
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/${id}`);
        const user = res.data;
        setFormVal({
          name: user.name,
          email: user.email,
          age: user.age,
        });
      } catch (err) {
        console.error("Error getting user:", err);
      }
    };
    getUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!formVal.name || !formVal.email || !formVal.age) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.put(`${API_URL}/users/${id}`, formVal);
      navigate("/");
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user. Please try again.");
    }
  };

  const handleChange = (idef, value) => {
    setFormVal((prev) => ({ ...prev, [idef]: value }));
  };
  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center ">
      <div className="w-50 bg-white rounded p-3 ">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name..."
              className="form-control"
              value={formVal.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email..."
              className="form-control"
              value={formVal.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Age..."
              className="form-control"
              value={formVal.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

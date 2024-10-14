import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [formVal, setFormVal] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (idef, val) => {
    setFormVal((prev) => {
      return {
        ...prev,
        [idef]: val,
      };
    });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/${id}`);
        setUser(res.data);
        setFormVal({
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/users/${id}`, formVal);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      alert("User has been deleted!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center p-5 ">
      <div className="card  p-5 " style={{ width: "40rem" }}>
        {editMode ? (
          <h1>Update your details: </h1>
        ) : (
          <div className="d-flex justify-content-between  p-2">
            <Link to="/" style={{ textDecoration: "none" }}>
              <h3>Back</h3>
            </Link>
            <div>
              <button
                className="btn btn-success mx-3"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
        <div className="card-body">
          {editMode ? (
            <>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  value={formVal.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div>
                <label>Email: </label>
                <input
                  type="email"
                  value={formVal.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div>
                <label>Age: </label>
                <input
                  type="age"
                  value={formVal.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <h5 className="card-title">{user.name} </h5>
              <h6 className="card-subtitle mb-2 text-muted">{user.email} </h6>
              <p className="card-text">{user.age}</p>
            </>
          )}
          {editMode && (
            <div class="d-flex justify-content-center mt-5">
              <button class="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

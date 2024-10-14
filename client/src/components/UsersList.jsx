import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user when clicking on view button
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [query, setQuery] = useState(""); // search term
  const [loadingSearch, setLoadingSearch] = useState(false); // To track loading state for search result
  const [errorSearch, setErrorSearch] = useState(null); // To track errors for search 
  const debounceTimeout = useRef(null); // For debouncing

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const getUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      setError("Error fetching users.");
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(); // Fetch users on component mount and when currentPage changes
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      // Re-fetch users after deletion
      getUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Function to fetch users based on the search query
  const fetchUsers = async (searchQuery) => {
    try {
      setLoadingSearch(true); // Start loading when the API request begins
      setErrorSearch(null); // Clear any previous errors
      const response = await axios.get(`${API_URL}/users/search`, {
        params: { query: searchQuery },
      });
      setUsers(response.data); // Set the fetched users
    } catch (error) {
      setErrorSearch("Error fetching users. Please try again later.");
      setUsers([]); // Clear users if there is an error
    } finally {
      setLoadingSearch(false); // Stop loading after the API request completes
    }
  };

  // Debounced search logic
  useEffect(() => {
    if (query.length > 0) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      // Set the debounce timeout for 500ms
      debounceTimeout.current = setTimeout(() => {
        fetchUsers(query); // Fetch users after debounce delay
      }, 500);
    } else {
      getUsers(); // Fetch all users when the query is empty
    }
    // Cleanup the timeout on component unmount or query change
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]); // Effect depends on `query`

  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
    setSelectedUser(null); // Clear the selected user
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="d-flex  justify-content-center align-items-center p-5 ">
        <div className="col-12 col-md-8 col-lg-6 bg-white rounded p-3 ">
          <div className="d-flex justify-content-between">
            <h3>
              <input
                placeholder="search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </h3>
            {/* Show loading indicator */}
            {loadingSearch && <p>Loading...</p>}

            {/* Show error message if there's an error */}
            {errorSearch && <p style={{ color: "red" }}>{error}</p>}

            {/* Show a message if no users are found */}
            {!loadingSearch && users.length === 0 && query && (
              <p>No users found.</p>
            )}
            <Link to="/create" className="btn btn-success mb-3">
              Add +
            </Link>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      {/* <button
                        className="me-2 btn btn-secondary"
                        onClick={() => navigate(`/view/${user._id}`)}
                      >
                        View
                      </button> */}
                      <button
                        className="me-2 btn btn-secondary"
                        onClick={() => handleView(user)} // Open modal on view
                      >
                        View
                      </button>
                      <Link
                        to={`/update/${user._id}`}
                        className="me-2 btn btn-success"
                      >
                        Edit
                      </Link>
                      <button
                        className="me-2 btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for viewing user details */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="myModal"
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Details</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              {selectedUser && (
                <div>
                  <p>
                    <strong>Name:</strong> {selectedUser.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Age:</strong> {selectedUser.age}
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/users/${selectedUser._id}`)}
              >
                View to Edit
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

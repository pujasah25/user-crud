import PropTypes from "prop-types";

export default function Alert({ message, type, onClose }) {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "success",
    "danger",
    "warning",
    "info",
    "primary",
    "secondary",
    "light",
    "dark",
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
};


// import Alert from "../logic/Alert";

// const [showAlert, setShowAlert] = useState(false); // State for alert visibility
// const [alertMessage, setAlertMessage] = useState("");
// const [alertType, setAlertType] = useState("success"); // Default alert type


// const handleDelete = async (userId) => {
//     try {
//       await axios.delete(`${API_URL}/users/${userId}`);
//       // Re-fetch users after deletion
//       const updatedUsers = await axios.get(`${API_URL}/users`, {
//         params: { page: currentPage, limit: 10 },
//       });
//       setUsers(updatedUsers.data.users);

//       // Check if the current page becomes empty after deletion
//       if (updatedUsers.data.users.length === 0 && currentPage > 1) {
//         setCurrentPage(currentPage - 1); // Move to the previous page if the current page is empty
//       }

//       setTotalPages(updatedUsers.data.totalPages); // Update total pages if needed
//       setAlertMessage("User deleted successfully!");
//       setAlertType("success");
//       setShowAlert(true);
//     } catch (err) {
//       setAlertMessage("Error deleting user.");
//       setAlertType("danger");
//       setShowAlert(true);
//       console.error("Error deleting user:", err);
//     }
//   };


// {showAlert && (
//     <Alert
//       message={alertMessage}
//       type={alertType}
//       onClose={handleCloseAlert}
//     />
//   )}

// const handleCloseAlert = () => {
//     setShowAlert(false);
//   };
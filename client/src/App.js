import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UsersList from "./components/UsersList";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import NotFound from "./components/NotFound"; // Assume you create this component for 404 handling
import SingleUser from "./components/SingleUser";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} /> {/* Updated route */}
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="*" element={<NotFound />} /> {/* Handle 404 - Not Found */}
      </Routes>
    </Router>
  );
}

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const authData = JSON.parse(localStorage.getItem("auth"));

  if (!authData || !authData.loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
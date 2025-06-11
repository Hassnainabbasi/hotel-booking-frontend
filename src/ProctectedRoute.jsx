import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.isAdmin) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        🚫 Unauthorized Access
      </h1>
    );
  }

  return children;
};

export default ProtectedRoute;

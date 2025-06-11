import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserOnlyRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.isAdmin) {
    return <Navigate to="/dashboard" />; 
  }

  return children;
};

export default UserOnlyRoute;

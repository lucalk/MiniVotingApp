import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if(!user){
    return <Navigate to="/connexion"/>
  }

  if(role) {
    // Si role est une string → un seul rôle
    if (typeof role === "string" && user.role !== role) {
      return <Navigate to="/"/>;
    }

    // Si role est un tableau → plusieurs rôles acceptés
    if (Array.isArray(role) && !role.includes(user.role)) {
      return <Navigate to="/" />;
    }
  }
  return children;
}
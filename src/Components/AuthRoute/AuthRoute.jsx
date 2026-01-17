import { useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}

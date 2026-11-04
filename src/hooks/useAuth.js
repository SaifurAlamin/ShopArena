import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return {
    user,
    isAuthenticated,
    signIn: (userData) => dispatch(login(userData)),
    signOut: () => dispatch(logout()),
  };
};
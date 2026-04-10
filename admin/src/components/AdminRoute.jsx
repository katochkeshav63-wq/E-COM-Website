import { useNavigate} from "react-router";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate()
  // ❌ Not logged in
  if (!user) {
    
     navigate("/")
  }

  // ❌ Not admin
  if (user.role !== "admin") {
   navigate("/")
     
  }

  // ✅ Admin allowed
  return children;
};

export default AdminRoute;
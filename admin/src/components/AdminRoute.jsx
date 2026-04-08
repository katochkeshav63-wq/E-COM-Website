import { Link} from "react-router";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return  <> 
    <span className="flex items-center justify-center p-70 text-xl">PLEASE GO AND LOGIN ON THIS PAGE TO ACCESS ADMIN PANEL <button className="bg-blue-400 rounded-2xl border p-5 font-bold m-10 hover:bg-blue-500 "><Link to = "https://e-com-website-5.onrender.com/">GO AND LOGIN </Link></button></span> 

    </>
     
     
  }

  // ❌ Not admin
  if (user.role !== "admin") {
    return  <> 
    <span className="flex items-center justify-center p-70 text-xl">PLEASE GO AND LOGIN ON THIS PAGE TO ACCESS ADMIN PANEL <button className="bg-blue-400 rounded-2xl border p-5 font-bold m-10 hover:bg-blue-500 "><Link to = "https://e-com-website-5.onrender.com/">GO AND LOGIN </Link></button></span> 

    </>
     
  }

  // ✅ Admin allowed
  return children;
};

export default AdminRoute;
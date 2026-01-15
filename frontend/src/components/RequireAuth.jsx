import { Navigate } from "react-router-dom";

function RequireAuth({children,role}){
    const user=JSON.parse(localStorage.getItem("user"));

    if(!user){
        console.log("no user navigated to login page");
        alert("Please sign in first")
        return <Navigate to="/"/>;
    }
    if(role && user.role!==role){
        console.log("role diff navigated to login page");
        alert("permission denied");
        
        return <Navigate to="/"/>;
    }
     
     else return children;
}

export default RequireAuth;
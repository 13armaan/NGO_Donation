import { useNavigate } from "react-router-dom";

function UserDashboard(){
    const nav=useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    console.log(user["user_id"]);
    return(
        <div>
            <h2>Welcome {user.email}</h2>

            <button onClick={()=>nav("/donate")}>Donate</button>
            
            <button onClick={()=>{
                localStorage.removeItem("user");
                nav("/")
            }}>Log Out</button>
            
            <button onClick={()=>nav("/history")}>Your Donation History</button>
        </div>
    );
}
export default UserDashboard;
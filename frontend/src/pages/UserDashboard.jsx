import { useNavigate } from "react-router-dom";

function UserDashboard(){
    const nav=useNavigate();
    const user=localStorage.getItem("user");

    return(
        <div>
            <h2>Welcome {user.email}</h2>

            <button onClick={()=>nav("/donate")}>Donate</button>
            
            <button onClick={()=>{
                localStorage.removeItem("user");
                nav("/")
            }}>Log Out</button>
            
            <button onClick={()=>nav("/donation_history")}>Your Donation History</button>
        </div>
    );
}
export default UserDashboard;
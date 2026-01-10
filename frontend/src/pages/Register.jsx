import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[role, setRole]=useState("user");
    const nav=useNavigate();

    async function handleRegister(){
    const res=await fetch("http://127.0.0.1:8000/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password,
            role: role
        })
    });
    const data =await res.json();
    alert(data.message);
    }
    return(
        <div>
            <h2>Register</h2>
    
            <input
            placeholder="email"
            onChange={(e)=>setEmail(e.target.value)}
            />
            <br />
            <input
            placeholder="password"
            onChange={(e)=>setPassword(e.target.value)}
            />
            <br />
    
            <select onChange={(e)=>setRole(e.target.value)}>
                <option value={"admin"}>Admin</option>
                <option value={"user"}>User</option>
            </select>
    
        <br />
    
        <button onClick={handleRegister}>Register</button>
        <button onClick={()=>nav("/")}>Registered? Login here</button>
        </div>
    )
}


export default Register;
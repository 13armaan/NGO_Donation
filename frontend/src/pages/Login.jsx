import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Login(){
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const nav=useNavigate();

async function handleLogin(){
    const res = await fetch("http://127.0.0.1:8000/login",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify({email,password})
        
    });
    
    const data=await res.json();

    if(data.error){
        alert(data.error);
    }
    else{
        localStorage.setItem("user",JSON.stringify(data));

        if(data.role=="admin"){
            nav("/admin");
        }
        else if(data.role=="user"){
        nav("/dashboard");
    }
}
}

return(
    <div>
        <h2>Login</h2>

        <input
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
        />
        <br/>
        <input
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}
        />
        <br/>

        <button onClick={handleLogin}>Login</button>
        <button onClick={()=>nav("/register")}>New user? Register</button>
    </div>
);
}

export default Login;
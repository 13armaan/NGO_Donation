import {useState} from "react";
import { useNavigate } from "react-router-dom";

function Login(){
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const nav=useNavigate();

async function handleLogin(){
  if (!email.trim() || !password.trim()) {
    alert("Please enter both email and password");
    return;
}
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

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
    <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-2 text-blue-800">
        Welcome Back
      </h2>

      <p className="text-sm text-center text-blue-500 mb-6">
        Login to your NGO dashboard
      </p>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => nav("/register")}
          className="w-full text-blue-600 font-medium hover:underline"
        >
          New user? Register
        </button>
      </div>
      </div>
    </div>
  );

}

export default Login;
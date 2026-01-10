import { useState } from "react";

function Donate(){
    const[amount,setAmount]=useState("");
    const user=JSON.parse(localStorage.getItem("user"));
    
    async function handleDonate(){
        const res = await fetch("http://127.0.0.1:8000/register",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                user:user.user_id,
                amount:parseFloat(amount)
            })
        });

        const data=await res.json();
        alert("Donation created with ID"+data.donation_id);
    }
    return(
        <div>
            <h2>Donate</h2>
            
            <input
            placeholder="amount"
            onChange={(e)=>setAmount(e.target.value)}
            />
            <br/>
            <button onClick={handleDonate}>Confirm Donation</button>
        </div>
    );
}

export default Donate;

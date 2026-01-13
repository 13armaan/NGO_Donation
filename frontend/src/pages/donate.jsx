import { useState } from "react";

function Donate(){
    const[amount,setAmount]=useState("");
    const user=JSON.parse(localStorage.getItem("user"));
    
    console.log(user.user_id);
    async function handleDonate(){
        const res = await fetch("http://127.0.0.1:8000/donate",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                user_id:user.user_id,
                amount:parseFloat(amount)
            })
        });

        const data=await res.json();
        alert("Donation created with ID "+data.donation_id);
        const id=data.donation_id;
        const amt=parseFloat(amount);
        console.log("Sending:", { id,amt});
        console.log(typeof id, id);

        StartPayment(String(data.donation_id),parseFloat(amount));
    }
    return(
      

        <div>
              <div className="text-red-500 text-4xl font-bold">
  Tailwind is alive
</div>
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
async function StartPayment(donation_id,amount){
    const res=await fetch("http://127.0.0.1:8000/create-payment",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({donation_id,amount})
    });
    console.log("payment running");
    const data=await res.json();

    const options={
        key:data.key,
        amount:data.amount*100,
        currency:"INR",
        name:"NGO Donations",
        order_id: data.order_id,
        handler: function(){
            alert("payment processing ...")
        }
    };
    const rzp=new window.Razorpay(options);
    rzp.open();
}

export default Donate;

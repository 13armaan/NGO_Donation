import { useState,useEffect } from "react";

function History(){
    const user=JSON.parse(localStorage.getItem("user"));
    
    console.log(user.user_id);
    const [donations,setDonation]=useState([]);
    
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/my_donations/${user.user_id}`)
        .then(res => res.json())
        .then(data => setDonation(data));
    },[]);

    return(
        <div>
            <h2>My Donations</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>created at</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(donations) && donations.map(d=>(
                        <tr key={d.donation_id}>
                            <td>{d.amount}</td>
                            <td>{d.created_at ? new Date(d.created_at).toLocaleString(): "NA"}</td>
                            <td>{d.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
export default History;
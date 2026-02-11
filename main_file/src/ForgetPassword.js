import "./ForgetPassword.css";
import { useState } from "react";

function ForgetPassword({onClose}){
   const [email,setEmail] = useState("");
   const [bornPlace,setBornplace] = useState("");
   const [newPassword,setNewpassword] = useState("");

   const handleReset = async(e) =>{
    e.preventDefault();
    try{
        const res = await fetch("http://localhost:5000/forgetPassword",{
            method:"POST",
            headers:{"Content-Type":"application/json" },
            body:JSON.stringify({ email,bornPlace,newPassword })
        });
        const data = await res.json();
        console.log(data.message);
        if(!res.ok){
            alert(data.message);
            return;
        }
        alert("Password Changed Successfully");
        onClose();
    }catch(err){
    console.error(err);
        alert("Server Error");
    }
   };

    return(
        <div className="backside">
            <div className="fp-model">
                <h2>Reset Password</h2>
                <input className="ip" type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} required />
                <input className="ip" type="text" placeholder="Where were you born ?" onChange={(e)=>setBornplace(e.target.value)} required/>
                <input className="ip" type="password" placeholder="Enter new Password" onChange={(e)=>setNewpassword(e.target.value)} required/>
                <div className="fp-btn">
                    <button type="button" id="Changebtn" onClick={handleReset}>Change Password</button>
                    <button onClick={onClose} id ="canbtn">Cancel</button>
                </div>
                </div>
        </div>
    );
}

export default ForgetPassword;
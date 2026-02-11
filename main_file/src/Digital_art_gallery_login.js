import ForgetPassword from './ForgetPassword';
import {useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
function  Login(){

    const [showForget,setShowForget] = useState(false);

    useEffect(()=>{
        localStorage.removeItem("username");
    },[]);
    
const navigate = useNavigate();
const handleSubmit = async(e)=>{
    e.preventDefault();
    const logininfo = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    try{
        const res = await fetch("http://localhost:5000/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ logininfo, password }),
});
const data = await res.json();
    console.log("Login Response: ",data)
    if(!res.ok){
        alert(data.message);
        return
    }
    alert("Login Successful");

    if(res.ok){
        localStorage.setItem("username",data.username);
        navigate("/home");
    }

}

    catch(error){

        console.error("Login error: ",error);

    }

};

return(

    <div>

            <div className="container">

<div className="image">

    <img id="logo" src="digital_art_gallery_logo.png" alt="logo"/>

    <p id="heading"><span>Art begins with curiosity and</span><br/><br/><span>ends with<span class="mc"> imagination.</span> </span></p>

    <img id="template" src="Template_png.png" alt="temp"/>

</div>

<div className="form">

    <p id="p">Log into Lunara</p><br/>

    <form id="f" onSubmit={handleSubmit}>

        <input type="text" className="input" id="user" placeholder="Mobile number or email" required/><br/><br/>

        <input type="password" className="input" id="pass" placeholder="Password" required/><br/><br/>

        <button type="submit" id="btn1">Log in</button><br/><br/>

        <button type="button" id="btn2" onClick={()=> setShowForget(true)}>Forget password?</button><br/><br/><br/><br/>
        {showForget && <ForgetPassword onClose={()=> setShowForget(false)}/>}

        <button type="button" id="btn3"> <img src="digital_art_gallery_logo.png" id="lunara" alt="logo21"/>Log in and Enjoy Lunara</button><br/><br/>

        <button type="button" id="btn4" onClick={()=> navigate("/signup")}>Create new account

        </button><br/>


    </form>

    </div>
</div>
    </div>
)

}

export default Login;
import {useState} from 'react';

import {useNavigate} from 'react-router-dom'

function CreateAccount(){

const navigate = useNavigate()

const [formData,setformData] = useState({

username:"",

email:"",

phoneNumber:"",

password:"",

birthday:{

  month:"",

  day:"",

  year:""

},
bornPlace:"",

});

const handleChange =(e)=>{

if(!e || !e.target) return;

const {name,value} = e.target;

if(!name) return;

if(["month","day","year"].includes(name)) {

  setformData((prev) =>({

    ...prev,birthday:{

      ...prev.birthday,[name]:value,

    },

  }));

}

else{

  setformData((prev) =>({

    ...prev,[name]:value,

  }));

}

};

const handleSubmit = async(e)=>{

e.preventDefault();

console.log("Submit Clicked");

console.log(formData);

try{

const res = await fetch("http://localhost:5000/signup", {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify(formData)

})

const data = await res.json();

console.log("Signup response:",data);

if(!res.ok){

  alert(data.message);

  return;

}

alert("Account Created Successfully");
localStorage.setItem("username",data.user.username);
navigate('/home');

}

catch(error){

console.error("signup error:",error);

}

};

return(

  <div className='body'>

     <div className="divi">

<form onSubmit={handleSubmit}>

    

     <div>

        <img id="img" src="digital_art_gallery_logo.png" alt = "logo"/>

        <h4 id="head">Lunara</h4></div>

        <p id="para1">Get started on Lunara</p>

        <p id="para2">Sign up to see photos and videos from your friends.</p>

        <label className="lable"  htmlFor ="email" >Email</label><br/>

         <input  className="input" type="email" name ="email" placeholder="email" onChange={handleChange} required />

    <br/>

    <label className="lable"  htmlFor="number" >Mobile number</label><br/>

    <input  className="input" type="text" name ="phoneNumber" placeholder="Mobile number" onChange={handleChange} required />

    <br/><br/>

    <label  className="lable"  htmlFor="password" >Password</label><br/>

    <input  className="input" type="password" name ="password" placeholder="Password" onChange={handleChange} required/><br/><br/>

    <label className="lable"  htmlFor="birthday" >Birthday</label><br/>

<select id="month" name="month" onChange={handleChange}>  <option value="">Month</option>  <option value="jan">January</option>  <option value="feb">February</option>  <option value="mar">March</option>  <option value="apr">April</option>  <option value="may">May</option>  <option value="jun">June</option>  <option value="jul">July</option>  <option value="aug">August</option>  <option value="sep">September</option>  <option value="oct">October</option>  <option value="nov">November</option>  <option value="dec">December</option></select><select id="dates" name="day" onChange={handleChange}>  <option value="">Day</option>  <option value="1">1</option>  <option value="2">2</option>  <option value="3">3</option>  <option value="4">4</option>  <option value="5">5</option>  <option value="6">6</option>  <option value="7">7</option>  <option value="8">8</option>  <option value="9">9</option>  <option value="10">10</option>  <option value="11">11</option>  <option value="12">12</option>  <option value="13">13</option>  <option value="14">14</option>  <option value="15">15</option>  <option value="16">16</option>  <option value="17">17</option>  <option value="18">18</option>  <option value="19">19</option>  <option value="20">20</option>  <option value="21">21</option>  <option value="22">22</option>  <option value="23">23</option>  <option value="24">24</option>  <option value="25">25</option>  <option value="26">26</option>  <option value="27">27</option>  <option value="28">28</option>  <option value="29">29</option>  <option value="30">30</option>  <option value="31">31</option></select><select id="year" name="year" onChange={handleChange}>  <option value="">Year</option>  <option value="1990">1990</option>  <option value="1991">1991</option>  <option value="1992">1992</option>  <option value="1993">1993</option>  <option value="1994">1994</option>  <option value="1995">1995</option>  <option value="1996">1996</option>  <option value="1997">1997</option>  <option value="1998">1998</option>  <option value="1999">1999</option>  <option value="2000">2000</option>  <option value="2001">2001</option>  <option value="2002">2002</option>  <option value="2003">2003</option>  <option value="2004">2004</option>  <option value="2005">2005</option>  <option value="2006">2006</option>  <option value="2007">2007</option>  <option value="2008">2008</option>  <option value="2009">2009</option>  <option value="2010">2010</option>  <option value="2011">2011</option>  <option value="2012">2012</option>  <option value="2013">2013</option>  <option value="2014">2014</option>  <option value="2015">2015</option>  <option value="2016">2016</option>  <option value="2017">2017</option>  <option value="2018">2018</option>  <option value="2019">2019</option>  <option value="2020">2020</option>  <option value="2021">2021</option>  <option value="2022">2022</option>  <option value="2023">2023</option>  <option value="2024">2024</option>  <option value="2025">2025</option></select><br/><br/>
<label className='lable'>Where were you born ?</label>
<input type ="text" id='in' placeholder='Security key' name="bornPlace" onChange={handleChange} required></input>
<label className="lable" htmlFor="user">Username</label><br/>

<input type="text" className="input" name ="username" placeholder="Username" onChange={handleChange} required/><br/><br/>
<button id="login" type="submit" >Submit</button><br/>
     <button id="no" type="button" onClick={()=> navigate('/')} >I already have an account</button>
</form>

 </div>

 </div>

);

}

export default CreateAccount;
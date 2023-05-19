import React, { useState } from "react"
import {  useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=  useState('');


    return(
        <>
            <form>
                <label htmlFor ="email">Email</label>
                <input value={email}  type = "email" placeholder="email" id ="email" name="email"></input>
                <label htmlFor ="password">Password</label>
                <input value={password}  type = "password" placeholder="***********" id ="password" name="password"></input>
                <button type="submit">Log In</button>
            
            {/* <div>  
                Don't have an Account?<a href="/createAccount" >Create account</a>
            </div> */}
            </form>
        </>
    )


}
export default Login;
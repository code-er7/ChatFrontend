import React, { useState } from 'react'
import './join.css'
import logo from "../../image/logo.png"
import { Link } from 'react-router-dom'
let user ;
const Join = () => {
    const [name , setName] = useState("");
    const sendUser = ()=>{
       user = document.getElementById('joininput').value ;
    }
    return (

        <div className='JoinPage'>
            <div className='JoinContainer'>
                <img src={logo} alt="logo" />
                <h1>Join Page</h1>
                <input onChange={(e)=>setName(e.target.value)} type="text" value={name} id='joininput' placeholder='Enter Your Name' />
               <Link onClick={(e)=> !name ? e.preventDefault():null} to={"/chat"} > <button  onClick={sendUser}className='joinbtn'>Login</button></Link>
            </div>
        </div>
    )
}

export default Join;
export {user};
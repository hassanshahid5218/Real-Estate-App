import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const[formdata,setformdata]=useState({
    username:'',
    email:'',
    password:''
  })
  const handlechange=(e)=>{
    setformdata({
      ...formdata,
      [e.target.id]:e.target.value,
    })
  }

  const handlesubmit= async (e)=>{
    e.preventDefault();
    const res=await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formdata)
    }
    );
    const data=await res.json();
    console.log(data)
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up </h1>
      <form className='flex flex-col gap-4' onSubmit={handlesubmit}>
        <input type='text' placeholder='Enter Username' id='username' className='border p-3 rounded-lg'  onChange={handlechange}/>
        <input type='email' placeholder='Enter Email' id='email' className='border p-3 rounded-lg' onChange={handlechange}/>
        <input type='password' placeholder='Enter Password' id='password' className='border p-3 rounded-lg' onChange={handlechange}/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-90' >sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      

    </div>
  )
}

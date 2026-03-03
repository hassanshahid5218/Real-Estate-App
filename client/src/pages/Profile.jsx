import React from 'react'
import { useSelector } from 'react-redux'
import { useRef,useState } from 'react'; 
import {supabase} from '../supabase'
// import axios from "axios";
export default function Profile() {
  const {currentuser}=useSelector(state=>state.user)
  console.log(currentuser);
  const fileref=useRef(null);
  const [filePerc,setFilePerc]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormdata]=useState({});
  const handleFileUpload=async(file)=>{
    try{
       setFileUploadError(false);
       setFilePerc(0);
       const fileExt=file.name.split(",").pop();
       const fileName=`${currentuser._id}-${Date.now()}.${fileExt}`;
       setFilePerc(30);
       const {error}=await supabase.storage
       .from("avatars")
       .upload(fileName,file);
       if(error){
        setFileUploadError(true)
        return;
       }
       setFilePerc(70);
       const {data}=supabase.storage
       .from("avatars")
       .getPublicUrl(fileName);
       setFilePerc(100);
       setFormdata({
        ...formData,
        avatar:data.publicUrl,
       });
    }
    catch(err){
      setFileUploadError(true)
    }
  }
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.put(
//       `/api/user/update/${currentUser._id}`,
//       {
//         ...formData,
//       }
//     );

//     console.log("Updated user:", res.data);

//   } catch (error) {
//     console.log(error);
//   }
// };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <input type='file' ref={fileref} hidden accept='image/*' onChange={(e)=>{handleFileUpload(e.target.files[0])}}/>
        <img  onClick={()=>{fileref.current.click()}} src={formData.avatar||currentuser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <p>
          {fileUploadError?(
            <span className="text-red-700">
              Error Uploading image
            </span>
          ):filePerc>0&&filePerc<100?(
            <span className="text-slate-700">
              Uploading{filePerc}%
            </span>
          ):filePerc===100?(
            <span className="text-green-700">
              Image successfully uploaded!
            </span>
          ):("")

          }
        </p>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      
    </div>

  )
}

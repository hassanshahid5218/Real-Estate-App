import { createSlice } from "@reduxjs/toolkit"; 

const initialState={
    currentuser:null,
    loading:false,
    error:null
}
 const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signinStart:(state)=>{
           state.loading=true
        },
        signinSuccsess:(state,action)=>{
            state.currentuser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signinfailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        }
    }
 })

export const{signinStart,signinSuccsess,signinfailure}=userSlice.actions;
export default userSlice.reducer 
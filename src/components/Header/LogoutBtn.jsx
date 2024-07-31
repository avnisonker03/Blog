import React from "react";
import {useDispatch} from "react-redux";
import authService from '../../appwrite/auth';
import {logout} from "../../store/authSlice"

export default function LogoutBtn(){
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }

    return(
        <>
         <div className={`md:block px-2 py-2 bg-pink-200 text-black rounded font-semibold cursor-pointer hover:bg-slate-200`}>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </>
    )

}
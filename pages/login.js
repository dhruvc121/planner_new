import axios from 'axios';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { Store } from '../utils/store';

const Login = () => {
    const {state,dispatch}=React.useContext(Store)
    const router=useRouter()
    const [username,setUsername]=React.useState("")
    const [password,setPassword]=React.useState("")
    React.useEffect(()=>{
        const getuser=async()=>{
            const {data}=await axios.get("/api/login",{withCredentials:true})
            if(data.id){
                dispatch({type:"SET_USER",payload:{username:data.username,user_type:data.user_type,id:data.id}})   
                router.push('/')
            }
        }
        if(jsCookie.get('Planner_Login_Token')){
            getuser()
        }
    },[])
    const handleSubmit=async(e)=>{
        try{
            e.preventDefault()
            if(!username.trim()||!password){
                window.alert("Please fill all fields!")
                return;
            }
            const {data}=await axios.post("/api/login",{username,password})
            if(data.id){
                dispatch({type:"SET_USER",payload:{username:data.username,user_type:data.user_type,id:data.id}})  
                jsCookie.set("Planner_Login_Token",data.token,{expires:1})
                router.push('/')
            }
        }catch(err){
            if(err.response.status==401){
                window.alert("invalid credentials")
            }else if(err.response.status==404){
                window.alert("User does not exists")
            }else{
                window.alert("Something went wrong")
            }
        }
    }
    return (
        <div className='login-form-container' style={styles.loginFormContainer}>
            <form onSubmit={(e)=>handleSubmit(e)} style={styles.form}>
                <input style={styles.input} type="text" placeholder='username'  value={username} onChange={(e)=>setUsername(e.target.value)} required></input>
                <input style={styles.input} type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
}


const styles={
    loginFormContainer:{
        minWidth:"20%",
        position:" absolute",
        top:" 50%",
        left:" 50%",
        transform:" translate(-50%, -50%)",
        padding:" 1rem",
        border:" 1px solid #eee",
        boxShadow:" 1px 1px 1px 1px #eee",
        borderRadius:" 0.5rem",
    },
    form:{
        display:" flex",
        flexDirection:" column",
        justifyContent:" center",
        alignItems:" center",
    },
    input:{
        margin:"0.25rem 0.5rem",
        width:" 100%",
        padding:" 0.25rem 0.5rem",
        border:" 1px solid #eee",
        borderRadius:" 5px",
        lineHeight:" 1rem",
    },
    button:{
        width:" 100%",
        margin:" 0.25rem",
    }
}

export default Login;



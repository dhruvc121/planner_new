import bcryptjs from 'bcryptjs'
import nc from 'next-connect'
import pool from '../../utils/db'
const jwt=require('jsonwebtoken')


const handler=nc()

handler.get(async(req,res)=>{
    try{
        //console.log("++++++++++++++++++++++")
        let checkUser=jwt.verify(req.cookies.Planner_Login_Token,"THE_secret_Key")
        res.send(checkUser)
    }catch(err){
        console.log(err)
        res.status(400).send(err)  
    }
})

handler.post(async(req,res)=>{
    try{
        const {username,password}=req.body
        
        const data=await pool.query("select * from tbl_planner_user where username=$1",[username])
        if(!data.rows.length){
            res.status(404).json({message:"user not found"})
        }else{
            const isMatch=await bcryptjs.compare(password,data.rows[0].password)
            if(isMatch){
                const{username,user_type,id}=data.rows[0]
                const token=jwt.sign({
                    username,user_type,id
                  }, 'THE_secret_Key', { expiresIn: '1d'})
                res.send({username,user_type,id,token})
            }else{
                res.status(401).json({message:"Invalid credentials"})
            }
        }       
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

export default handler  
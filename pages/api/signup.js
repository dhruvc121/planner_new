import bcryptjs from 'bcryptjs'
import nc from 'next-connect'
import pool from '../../utils/db'


const handler=nc()

handler.post(async(req,res)=>{
    try{
        const {username,password,user_type}=req.body
        const hashpassword=await bcryptjs.hash(password,10)
        const data=await pool.query("insert into tbl_planner_user(username,password,user_type) values($1,$2,$3)",[username,hashpassword,user_type])
        res.send("user registered")        
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

export default handler  
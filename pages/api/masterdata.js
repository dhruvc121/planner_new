import nc from 'next-connect'
import pool from '../../utils/db'

const handler=nc()

handler.get(async(req,res)=>{
    try{
        const data=await pool.query("select * from master order by id,ordno")
       //console.log("call")
        res.send(data.rows)        
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

export default handler  
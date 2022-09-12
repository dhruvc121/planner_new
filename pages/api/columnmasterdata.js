import nc from 'next-connect'
import pool from '../../utils/db'

const handler=nc()

handler.get(async(req,res)=>{
    try{
        const data=await pool.query("select * from tbl_visible_columns order by id")
        /* console.log(data.rows) */
       res.send({rows:data.rows})        
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})
handler.put(async(req,res)=>{
    try{
        const id=parseInt(req.body.id)
        await pool.query("update tbl_visible_columns set status= not status where id=$1",[id])
        res.send("OK")
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

export default handler  
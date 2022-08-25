import nc from 'next-connect'
import pool from '../../../utils/db'



const handler=nc()

handler.get(async(req,res)=>{
    try{
        const response=await pool.query(`select "id","stone id" ,"fl","username","totalr.wt","partroughwt","partpolishwt","diameter",
            "ratio","grading","clarity","color","shape","td%","tdmm","table%","pavilangle","crownangle","crownHeight","length","width",
            flrc,tinch,milky,cut,pol,sym,depth,cps,"+2","+1","-1","-2" from tbl_stone_allocation order by id`)
        res.send(response.rows)
    }catch(err){
        console.log(err)
        res.status(400).send(err)  
    }
})

export default handler;

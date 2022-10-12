import nc from 'next-connect'
import pool from '../../../utils/db'

const handler=nc()

handler.post(async(req,res)=>{
    try{
        //console.log(req.body)
       const plan=await JSON.parse(req.body.plan)
        console.log(plan)
      const executeQuery=async(query,queryValues)=>{
        const result=await pool.query(query,queryValues)
        return result
    }
        plan.map((row,index)=>{
            let queryValues=[]
            Object.keys(row).map( (key)=>{ queryValues=[...queryValues,row[key]||""] } )
            const query=`insert into tbl_stone_allocation("id","stone id" ,"fl","username","totalr.wt","partroughwt","partpolishwt","diameter",
            "ratio","grading","clarity","color","shape","td%","tdmm","table%","pavilangle","crownangle","crownHeight","length","width",
            flrc,tinch,milky,cut,pol,sym,depth,cps,"+2","+1","-1","-2") values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
            ,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33)`
            //console.log(queryValues)
            const result=executeQuery(query,queryValues)
        })
        res.send("ok")
    }catch(err){
        console.log(err)
        res.status(400).send(err)  
    }
})

export default handler;
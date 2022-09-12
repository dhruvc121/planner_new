import nc from 'next-connect'
import pool from '../../../utils/db'

const handler=nc()

handler.put(async(req,res)=>{
    try{
        const {data}=req.body
      //  console.log(data.clarity,data.fl,data.color,data.flrc,data.tinch,data.milky,data.shape,data.partroughwt,data.partpolishwt,data.diameter,data.cut,data.pol,data.sym,data.depth,data.ratio,data.id,data['stone id'])
        const response=await pool.query(`update tbl_stone_allocation set clarity=$1,fl=$2,color=$3,flrc=$4,tinch=$5,milky=$6,shape=$7,partroughwt=$8,partpolishwt=$9,diameter=$10
        ,cut=$11,pol=$12,sym=$13,depth=$14,ratio=$15,cps=$16 where id=$17 and "stone id"=$18`
        ,[data.purity,data.natts,data.color,data.flrc,data.tinch,data.milky,data.shape,data.rghwt,data.polwt,data.diameter,data.cut,data.pol,data.sym,data.depth,data.ratio,data.cps,data.id,data['stone id']])    //update query
       // console.log(response)
        res.status(200).json({message:`value updated for stone_id ${data['stone id']} and id ${data.id}`})
    }catch(err){
        console.log(err)
        res.status(400).send(err)  
    }
})

export default handler;
import axios from 'axios';
import React from 'react';
import { Store } from '../../../utils/store';

const SelectFields=(props)=>{
  const handleInput=(e)=>{
      props.setInput({...props.input,[props.title]:e.target.value})
    }  
    return  <div style={{padding:"5px",margin:"0 5px",width:"7%"}}>
    <h6 style={{margin:0}}>{props.title}</h6>
    
      <div style={{width:"100%",backgroundColor:"white",height:"200px", overflow:"auto"}} >
        <ul>    {/* initial value show */}
        {
          props.master.map((item,index)=>{
            return item.mastertype==props.title?<li className='d-flex'>
              <input type={"radio"} name={item.mastertype} value={item.actualname} checked={props.input[props.title]==item.actualname} onChange={(e)=>handleInput(e)}/>
              <label style={{fontSize:"10px"}}>{item.actualname}</label>
            </li>:null
          })
        }
      </ul>
      </div>    
  </div>
}

const TextFields=(props)=>{
  const handleInput=(e)=>{
    props.setInput({...props.input,[props.title]:e.target.value})
  }
  return  <div style={{padding:"5px",margin:"0 5px",width:"6%"}}>
  <h6 style={{margin:0}}>{props.title}</h6>
    <input style={{width:"100%"}} onChange={handleInput} value={props.input[props.title]}></input>
  </div>
}

const InputModal=(props)=>{
const {state,dispatch}=React.useContext(Store)
const {master,colStatus,currPage}=state
const {posY}=props||100
const style={
      position:"absolute",
      top:`${posY}px`,
      width:"90%",
      height:"300px",
      backgroundColor:"#eee",
      border:"1px solid black",
}

const titleList=[
{title:"purity",type:"select"},
{title:"natts",type:"select"},
{title:"color",type:"select"},
{title:"flrc",type:"select"},
{title:"tinch",type:"select"},
{title:"milky",type:"select"},
{title:"shape",type:"select"},
{title:"rghwt",type:"text"},
{title:"polwt",type:"text"},
{title:"diameter",type:"text"},
{title:"cut",type:"select"},
{title:"pol",type:"select"},
{title:"sym",type:"select"},
{title:"depth",type:"select"},
{title:"ratio",type:"text"},
]

const [input,setInput]=React.useState({
    purity:props.rowData.clarity||"",
    natts:props.rowData.fl||"",
    color:props.rowData.color||"",
    flrc:props.rowData.flrc||"",
    tinch:props.rowData.tinch||"",
    milky:props.rowData.milky||"",
    //shape:shapeDetail.find(obj=>props.rowData.shape==obj.shapename).original_name||"",
    shape:props.rowData.shape||"",
    rghwt:props.rowData.partroughwt||"",
    polwt:props.rowData.partpolishwt||"",
    diameter:props.rowData.diameter||"",
    cut:props.rowData.cut||"",
    pol:props.rowData.pol||"",
    sym:props.rowData.sym||"",
    depth:"",
    ratio:props.rowData.ratio||"",
   })
   const handleSubmit=async()=>{
    const getCPSValue=(c,p,s)=>{
      if(c=="EXCELLENT")
        c="X"
      else if(c=="V. GOOD")
        c="V"
      else c="G"
      //set 'p' value
      //p=getPolValue(obj)
      if(p=="EXCELLENT")
        p="X"
      else if(p=="V. GOOD")
        p="V"
      else p="G"
      //set 's' value
      //s=getSymValue()
      if(s=="EXCELLENT")
        s="X"
      else if(s=="V. GOOD")
        s="V"
      else s="G"
      return c+p+s
    }  
    if(currPage!="allocation"){
        let update=[...state.plans] 
        update[props.id].data.splice(props.rowData.index,1,{...props.rowData
          ,...input,clarity:input.purity,partroughwt:input.rghwt,partpolishwt:input.polwt,fl:input.natts,cps:getCPSValue(input.cut,input.pol,input.sym)
        })  
        if(update[props.id].data[props.rowData.index])  delete update[props.id].data[props.rowData.index].natts;
        if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].purity;
        if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].polwt;
        if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].rghwt;
        if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].index;
        dispatch({type:"UPDATE_PLANS",payload:update})
      }else{
       try{
        const reqObj={...props.rowData,...input,cps:getCPSValue(input.cut,input.pol,input.sym)}
        const res=await axios.put('/api/allocation/updateallocatedstone',{data:reqObj})
        console.log(reqObj,input,"===================")
        window.alert(res.data.message)
        props.getallocationdata()
       }catch(err){
        window.alert(`Data update failed. check console for error.`)
        console.log(err)
       }
      }
      props.setRowData({})
        let ele=document.querySelector('.active')
        ele.classList.remove('active')
   }
   const handleCancel=()=>{
    props.setRowData({})
    let ele=document.querySelector('.active')
    ele.classList.remove('active')
   }
    return  <div style={style}>
      <div style={{display:"flex"}}>
        {
          titleList.map((title,index)=>{
            if(title.type=="select"){ 
              let colIndex=colStatus.findIndex((cols)=>cols.col_name==title.title)
              if(colIndex!=-1 && colStatus[colIndex].status){
                return <SelectFields key={index} input={input} setInput={setInput} title={title.title} master={master}/>
              }
            }else{
              let colIndex=colStatus.findIndex((cols)=>cols.col_name==title.title)
              if(colIndex!=-1 && colStatus[colIndex].status){
                return <TextFields key={index} input={input} setInput={setInput} title={title.title} master={master}/>
              }
            }
          })
        }
      </div>
      <div className="d-flex-around" style={{marginTop:"20px"}}>
        <button onClick={()=>handleSubmit()}>ok</button>
        <button onClick={()=>handleCancel()}>cancel</button>
      </div>
    </div>
}
export default InputModal;
 {/* change mtype to milky in db */}
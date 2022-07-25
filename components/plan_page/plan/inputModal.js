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
const {master}=state
const {posY}=props
const style={
      
      position:"absolute",
      top:`${posY}px`,
      width:"90%",
      height:"300px",
      backgroundColor:"#eee",
      border:"1px solid black",
}

//console.log(shapeDetail.find(obj=>props.rowData.shape==obj.shapename).original_name)
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
   const handleSubmit=()=>{
      let update=[...state.plans] 
      console.log(props.rowData.id)
      update[props.id].data.splice(props.rowData.index,1,{...props.rowData,...input,clarity:input.purity,partroughwt:input.rghwt,partpolishwt:input.polwt,fl:input.natts})  
      if(update[props.id].data[props.rowData.index])  delete update[props.id].data[props.rowData.index].natts;
      if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].purity;
      if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].polwt;
      if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].rghwt;
      if(update[props.id].data[props.rowData.index]) delete update[props.id].data[props.rowData.index].index;
      dispatch({type:"UPDATE_PLANS",payload:update})
      props.setRowData({})
      let ele=document.querySelector('.active')
      console.log(ele)
      ele.classList.remove('active')
   }
   const handleCancel=()=>{
    props.setRowData({})
    let ele=document.querySelector('.active')
    ele.classList.remove('active')
   }
    return  <div style={style}>
      <div style={{display:"flex"}}>
        <SelectFields input={input} setInput={setInput} title="purity" master={master}/>
        <SelectFields input={input} setInput={setInput} title="natts" master={master}/>
        <SelectFields input={input} setInput={setInput} title="color" master={master}/>
        <SelectFields input={input} setInput={setInput} title="flrc" master={master}/>
        <SelectFields input={input} setInput={setInput} title="tinch" master={master}/>
        <SelectFields input={input} setInput={setInput} title="milky" master={master}/>   {/* change mtype to milky in db */}
        <SelectFields input={input} setInput={setInput} title="shape" master={master}/>
        <TextFields input={input} setInput={setInput} title="rghwt" master={master}/>
        <TextFields input={input} setInput={setInput} title="polwt" master={master}/>
        <TextFields input={input} setInput={setInput} title="diameter" master={master}/>
        <SelectFields input={input} setInput={setInput} title="cut" master={master}/>
        <SelectFields input={input} setInput={setInput} title="pol" master={master}/>
        <SelectFields input={input} setInput={setInput} title="sym" master={master}/>
        <SelectFields input={input} setInput={setInput} title="depth" master={master}/>
        <TextFields input={input} setInput={setInput} title="ratio" master={master}/>
      </div>
      <div className="d-flex-around" style={{marginTop:"20px"}}>
        <button onClick={()=>handleSubmit()}>ok</button>
        <button onClick={()=>handleCancel()}>cancel</button>
      </div>
    </div>
}
export default InputModal;

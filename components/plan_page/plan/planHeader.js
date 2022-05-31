import React from 'react';
import { Store } from '../../../utils/store';

export const REGrid=()=>{
    const columns=[{field:"Receive Date"},{field:"Export Date"},{field:"diff"},{field:"dispatch"}]
    const rows=[{rec_date:"02/05/2022",exp_date:"02/05/2022",diff:3,dispatch:"02/05/2022"}]
    return  <table style={{height:"100%", width:"15%",fontSize:"9px"}}>
    <thead>
        <tr>
            {
                columns.map((col,index)=>{
                    return <th key={index} style={{paddingTop:0,paddingBottom:0}}>{col.field}</th>
                })
            }
        </tr>
    </thead>
    <tbody>
            {
                rows.map((row,index)=>{
                    return (<tr key={index}>
                        {
                            Object.keys(row).map((col,index)=>{
                                return <td key={index} style={{paddingTop:0,paddingBottom:0}}>
                                    {row[col]}   
                                </td>
                            })
                        }
                    </tr>)
                })
            }
    </tbody>
</table>
}
export const MCGrid=()=>{
    return <div  style={{height:"100%",fontSize:"9px",padding:"5px",width:"50%",border:"1px solid black"}}>
        <div className="d-flex" style={{width:"100%"}}>
            <label style={{width:"30%", fontWeight:"bold"}}>Marker</label>
            <p style={{width:"70%"}}>marker name</p>
        </div>
        <div className="d-flex" style={{width:"100%"}}>
            <label style={{width:"30%", fontWeight:"bold"}}>checker</label>
            <p style={{width:"70%"}}>checker name</p>
        </div>
    </div>
}


const Planheader = (props) => {
    const {state,dispatch}=React.useContext(Store)
    const[showOtherDetails,setShowOtherDetails]=React.useState(true)
    const clone=(id)=>{
        console.log(state.plans[id])
        dispatch({type:"UPDATE_PLANS",payload:[...state.plans,{
            data:[...state.plans[id].data],
            columns:[...state.plans[id].columns],
            id:state.plans.length
        }]})
        
    }
    return (
        <div className='d-flex-space' style={{fontSize:"12px",height:"2rem"}}>
            <div name="party-name">
                <button>Party</button>
            </div>
            <div className='d-flex' name="oct-select">
                <div className='d-flex'>
                    <label>octs</label>
                    <input style={{backgroundColor:"white"}}></input>
                </div>
                <div className='d-flex'>
                    <input type={'checkbox'} onChange={()=>setShowOtherDetails(showOtherDetails?false:true)}></input>
                    <label>Select</label>
                </div>
            </div>
            <div className='d-flex' name="file-operations">
                <button>save</button>
                <button>file</button>
                <button>recheck</button>
                <button onClick={()=>clone(props.id)}>clone plan</button>
            </div>
            <div className='d-flex' name="crown-revie-select">
                <input type={'checkbox'}/>
                <label>cross review</label>
            </div>
            <div className='d-flex' name="re-mc-grid">
                <REGrid/>       {/* receive-export grid */}
                <MCGrid/>       {/* marker-checker grid */}
            </div>
            <div className='d-flex' name="other-details" style={{display:(!showOtherDetails)?"flex":"none"}}>
                    <input type={'checkbox'}/>
                    <label>
                        before LSAW
                    </label>
                    <input style={{backgroundColor:"white"}}></input>
            </div>
        </div>
    );
}

export default Planheader;

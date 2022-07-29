import React from 'react';
import { Store } from '../../utils/store'
import PlanHeader from './plan/planHeader'
import PlanTable from './plan/planTable'

const Plan = ({plan,colStatus}) => {
    const {state,dispatch}=React.useContext(Store)
    const {data,columns}=plan
    
    const removePlan=(id)=>{
        //window.alert(id)
        let updatePlans=state.plans.filter((plan)=>plan.id!=id)
        dispatch({type:"UPDATE_PLANS",payload:updatePlans})
      }
    return (
        <div> 
        <button  onClick={()=>removePlan(plan.id)} size="small" style={{margin:"0 1rem"}}>Clear</button>
            <div style={{backgroundColor:"#eee",padding:"0.5rem"}}>
                <PlanHeader data={data} columns={columns} id={plan.id}/>
            </div>
            <div  style={{backgroundColor:"#eee",padding:"0.5rem", width:"100%", overflow:"auto"}}>
                <PlanTable data={data} columns={columns} id={plan.id} colStatus={colStatus}/>
            </div>
        </div>
    );
}

export default Plan;

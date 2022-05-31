import axios from 'axios';
import React from 'react';
import PageHeader from '../components/plan_page/pageHeader';
import Plan from '../components/plan_page/plan';
import PlanImport from '../components/plan_page/plan/planImport';
import { Store } from '../utils/store';


const PlanPage = () => {
    const {state,dispatch}=React.useContext(Store)
    const {plans}=state

    React.useEffect(()=>{
        const getMasterData=async()=>{
            const {data}=await axios.get('/api/masterdata')
            dispatch({type:"MASTER",payload:data})
        }
        getMasterData()
    },[])
    return (
        <div>
        <PlanImport/>
            <PageHeader/>
            {
                plans.map((plan,index)=>{
                 return <Plan plan={plan} key={index}/>  
                })
            }
            
        </div>
    );
}

export default PlanPage;

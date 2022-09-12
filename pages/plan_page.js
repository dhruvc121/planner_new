import axios from 'axios';
import React from 'react';
import PageHeader from '../components/plan_page/pageHeader';
import Plan from '../components/plan_page/plan';
import PlanImport from '../components/plan_page/plan/planImport';
import { Store } from '../utils/store';
import { useRouter } from 'next/router';

const PlanPage = () => {
    const {state,dispatch}=React.useContext(Store)
   
    const {plans}=state
    const router=useRouter()
    React.useEffect(()=>{
        if(Object.keys(state.colStatus).length==0){
            router.push('/home')
            }
        dispatch({type:"PAGE",payload:"plan"})
    },[])
    return (
        <div>
        <PlanImport/>
            <PageHeader/>
            {
                plans.map((plan,index)=>{
                 return <Plan plan={plan} key={index} />  
                })
            }
            
        </div>
    );
}

export default PlanPage;

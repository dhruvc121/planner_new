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
        const getMasterData=async()=>{
            const {data}=await axios.get('/api/masterdata')
            dispatch({type:"MASTER",payload:data})
        }
        getMasterData()
        const getColStatus=async()=>{
            try{
                const {data}=await axios.get('/api/columnmasterdata')
                dispatch({type:"SET_COL_STATUS",payload:data.rows})
             
            }catch(err){
                console.log(err)
                window.alert("Fetch data failed!")
            }
        }
        getColStatus()
        console.log(state.user)
    },[])
    //console.log(colStatus)
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

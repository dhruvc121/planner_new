import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import PartyTable from '../components/allocation_page/partyTable';
import PageHeader from '../components/plan_page/pageHeader';
import { Store } from '../utils/store';

const AllocationPage = () => {
    const [rows,setRows]=React.useState([])
    const [columns,setColumns]=React.useState([])
    const {state,dispatch}=React.useContext(Store)
    const router=useRouter()
    const requiredParams={
        'top opens':"",
        'bot opens':"",
        'lab':"",
        'shade range':"",
        'pointer range':"",
        'assort':"",
        'trend':"",
        'price':"",
        'value':"",
        'labour':"",
        'net value':"",
        'net value%':"",
        'reminder':"",
        'remark':"",
    }
    const hideCols=['id',
    'stone id',
    'username',
    'totalr.wt',
    'diameter',
    'td%',
    'tdmm',
    'table%',
    'pavilangle',
    'crownangle',
    'crownHeight',
    'length',
    'width',
    'cut',
    'pol',
    'sym'
    ]
    React.useEffect(()=>{
        if(Object.keys(state.colStatus).length==0){
        router.push('/home')
        }
        dispatch({type:"UPDATE_PLANS",payload:[]})
        dispatch({type:"PAGE",payload:"allocation"})
        getData()
    },[])
    const addRequiredCols=(data)=>{
        let update=[...data]
        update=update.map(row=>{ return {...row,...requiredParams}})
        setRows(update)
    }
    const getData=async()=>{
        //console.log("called")
        const {data}=await axios.get('/api/allocation/getallocationdata')  
        setColumns([
            ,{field: 'shape',displayName:"shape"}
            ,{field: 'partroughwt',displayName:"partroughwt"}
            ,{field: 'partpolishwt',displayName:"partpolishwt"}
            ,{field: 'color',displayName:"color"}
            ,{field: 'clarity',displayName:"clarity"}
            ,{field: 'flrc',displayName:"flrc"}
            ,{field:'cps',displayName:'cps' }
            ,{field: 'cut',displayName:"cut"}
            ,{field: 'pol',displayName:"pol"}
            ,{field: 'sym',displayName:"sym"}
            ,{field: 'depth',displayName:"depth"}
            ,{field: 'fl',displayName:"natts"}
            ,{field: 'tinch',displayName:"tinch"}
            ,{field: 'ratio',displayName:"ratio"}
            ,{field: 'milky',displayName:"milky"}
            ,{field: 'top opens',displayName:"top opens"}
            ,{field: 'bot opens',displayName:"bot opens"}
            ,{field: 'lab',displayName:"lab"}
            ,{field: 'shade range',displayName:"shade range"}
            ,{field: 'pointer range',displayName:"pointer range"}
            ,{field: 'assort',displayName:"assort"}
            ,{field: 'trend',displayName:"trend"}
            ,{field: 'price',displayName:"price"}
            ,{field: 'value',displayName:"value"}
            ,{field: 'labour',displayName:"labour"}
            ,{field: 'net value',displayName:"net value"}
            ,{field: 'net value%',displayName:"net value%"}
            ,{field: 'reminder',displayName:"reminder"}
            ,{field: 'remark',displayName:"remark"}
            ,{field: 'grading',displayName:"grading"}
            ,{field: '+2',displayName:"+2"}
            ,{field: '+1',displayName:"+1"}
            ,{field: '-1',displayName:"-1"}
            ,{field: '-2',displayName:"-2"}
            ,{field:'id',displayName:'' }
            ,{field:'stone id',displayName:'' }
            ,{field:'username',displayName:'' }
            ,{field:'totalr.wt',displayName:'' }
            ,{field:'diameter',displayName:'' }
            ,{field:'td%',displayName:'' }
            ,{field:'tdmm',displayName:'' }
            ,{field:'table%',displayName:'' }
            ,{field:'pavilangle',displayName:'' }
            ,{field:'crownangle',displayName:'' }
            ,{field:'crownHeight',displayName:'' }
            ,{field:'length',displayName:'' }
            ,{field:'width',displayName:'' }
        ])
        addRequiredCols(data)
    }
    return (
        <div>
        <PageHeader/>
        {
            ['Party 1 Name','Party 2 Name','Party 3 Name'].map((party,index)=>{
                return <div className='plan-container' style={styles.planContainer}>
                <h5 style={styles.h5}>{party}</h5>
                <hr/>
                <PartyTable columns={columns} data={rows} hideCols={hideCols} getData={getData}/>
                <hr/>
                </div>
            })
        }
        </div>
    );
}

const styles={
    planContainer:{
        backgroundColor:"#eee"
    },
    h5:{
        margin:"0 0 1rem 0",
    }
}
export default AllocationPage;


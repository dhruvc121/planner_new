import axios from 'axios';
import React from 'react';
import PartyTable from '../components/allocation_page/partyTable';
import PageHeader from '../components/plan_page/pageHeader';

const AllocationPage = () => {
    const [data,setData]=React.useState([])
    const [columns,setColumns]=React.useState([])
    React.useEffect(()=>{
       // window.alert("1")
        getData()
        //window.alert("5")
    },[])
    const getData=async()=>{
        const {data}=await axios.get('/api/allocation/getallocationdata')
        //console.log(data)
      //  window.alert("2")
        setData(data)
        //window.alert("3")
        setColumns([
            {field: 'id'}
            ,{field: 'stone id'}
            ,{field: 'fl'}
            ,{field: 'username'}
            ,{field: 'totalr.wt'}
            ,{field: 'partroughwt'}
            ,{field: 'partpolishwt'}
            ,{field: 'diameter'}
            ,{field: 'ratio'}
            ,{field: 'grading'}
            ,{field: 'clarity'}
            ,{field: 'color'}
            ,{field: 'shape'}
            ,{field: 'td%'}
            ,{field: 'tdmm'}
            ,{field: 'table%'}
            ,{field: 'pavilangle'}
            ,{field: 'crownangle'}
            ,{field: 'crownheight'}
            ,{field: 'length'}
            ,{field: 'width'}
            ,{field: 'flrc'}
            ,{field: 'tinch'}
            ,{field: 'milky'}
            ,{field: 'cut'}
            ,{field: 'pol'}
            ,{field: 'sym'}
            ,{field: 'depth'}
            ,{field: 'cps'}
            ,{field: '-2'}
            ,{field: '-1'}
            ,{field: '+1'}
            ,{field: '+2'}
        ])
        //window.alert("4")
    }
    return (
        <div>
        <PageHeader/>
        {
            ['Party 1 Name','Party 2 Name','Party 3 Name'].map((party,index)=>{
                return <div className='plan-container' style={styles.planContainer}>
                <h5 style={styles.h5}>{party}</h5>
                <hr/>
                <PartyTable columns={columns} data={data} />
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

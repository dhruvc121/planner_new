import React from 'react';
import { Store } from '../../../utils/store';
import InputModal from './inputModal';

const PlanTable = ({data,columns,id}) => {
    const{state,dispatch}=React.useContext(Store)
    const [rowData,setRowData]=React.useState({})
    const getSum=(col)=>{
        let sum=data.reduce((sum,row)=>(parseFloat(row[col]==""?0:row[col])+sum),0)
        if(isNaN(sum) || col=="id"){
          sum=""
        }else{
          sum=sum.toFixed(3)
        }
        return sum
    }
    const createEmptyRow=()=>{
        let row={}
        columns.map((title)=> row[title.field]="")
        return row
      }
    const handleRightClick=(e)=>{
        e.preventDefault()
        let emptyRow=createEmptyRow()
        const updatedPlans=state.plans.map((plan)=>{return plan.id==e.target.parentElement.id?{...plan,data:[...plan.data,{...emptyRow,id:plan.data.length,['stone id']:plan.data[0]['stone id']}]}:plan})
        dispatch({type:"UPDATE_PLANS",payload:updatedPlans})
    }
    const handleClick=(e,row)=>{
        
       e.target.parentElement.className="active"
        setRowData(row)
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column,index)=>{
                            return<th key={index}>{column.field}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                        {
                            data.map((row,index)=>{
                                return <tr key={index} id={id} onContextMenu={(e)=>handleRightClick(e)} onClick={(e)=>handleClick(e,row)} style={{cursor:"pointer"}}>
                                {
                                    Object.keys(row).map((cell,index)=>{
                                        return <td >
                                            {row[cell]}
                                        </td> 
                                    })
                                }
                                </tr>
                            })
                        }
                        <tr>
                            {
                                columns.map((col)=>{
                                    return <td>
                                        {getSum(col.field)}
                                    </td> 
                                })
                            }
                        </tr>
                </tbody>
            </table>
            {
                rowData.id &&
                <InputModal id={id} rowData={rowData} setRowData={setRowData}/>
            }
        </div>
    );
}

export default PlanTable;

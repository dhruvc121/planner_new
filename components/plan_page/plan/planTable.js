import React from 'react';
import { Store } from '../../../utils/store';
import InputModal from './inputModal';

const PlanTable = ({data,columns,id}) => {
    const{state,dispatch}=React.useContext(Store)
    const[posY,setPosY]=React.useState(0)
    const [rowData,setRowData]=React.useState({})
    let prevId=-1
    //console.log(state.plans["0"],"===========")
    const getSum=(col,id)=>{
        console.log("called")
        let sum=0;
        data.map((item)=>{
            if(item.id==id){
                sum=sum+parseFloat(item[col]||0)

            }
        })
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

      console.log(state.plans[0])
    const handleRightClick=(e)=>{
        e.preventDefault()
        const planId=e.target.parentElement.attributes.id.value
        const index=e.target.parentElement.attributes.data.value
        console.log("last row test",planId,index)
        
        
        let emptyRow=createEmptyRow()
        let newData=[...state.plans[planId].data]
        console.log("last row test",newData)
        newData.splice(parseInt(index)+1,0,{...emptyRow,id:state.plans[planId].data[index].id,['stone id']:state.plans[planId].data[index]['stone id']})
        
        //const updatedPlans=state.plans.map((plan)=>{return plan.id==e.target.parentElement.id?{...plan,data:[...plan.data,{...emptyRow,id:plan.data.length+1,['stone id']:plan.data[0]['stone id']}]}:plan})
        const updatedPlans=state.plans.map((plan)=>{return plan.id==e.target.parentElement.id?{...plan,data:newData}:plan})
        console.log("last row test",newData)
        dispatch({type:"UPDATE_PLANS",payload:updatedPlans})

       /*  e.target.parentElement.className="active"
       console.log(e.screenY,e.pageY)
       setPosY(e.pageY+10)
       setRowData({...row,index:index+1}) */
    }
    const handleClick=(e,row,index)=>{
       e.target.parentElement.className="active"
       console.log(e.screenY,e.pageY)
       setPosY(e.pageY+10)
       setRowData({...row,index})
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
                                if((prevId==-1 || prevId==row.id) && index!=data.length-1){
                                    prevId==-1?prevId=row.id:prevId
                                    return <tr key={index} data={index} id={id} onContextMenu={(e)=>handleRightClick(e)} onClick={(e)=>handleClick(e,row,index)} style={{cursor:"pointer"}}>
                                    {
                                        Object.keys(row).map((cell,index)=>{
                                            return <td>
                                                {row[cell]}
                                            </td> 
                                        })
                                    }
                                    </tr>
                                }else{
                                    prevId=row.id
                                    return <React.Fragment>
                                        {
                                            index!=data.length-1 &&
                                            <tr>
                                            {
                                                columns.map((col)=>{
                                                    return <td>
                                                        {getSum(col.field,row.id-1)}
                                                    </td> 
                                                })
                                            }
                                            </tr>
                                        }
                                        <tr key={index} id={id} data={index} onContextMenu={(e)=>handleRightClick(e)} onClick={(e)=>handleClick(e,row)} style={{cursor:"pointer"}}>
                                        {
                                            Object.keys(row).map((cell,index)=>{
                                                return <td>
                                                    {row[cell]}
                                                </td> 
                                            })
                                        }
                                        </tr>
                                        {
                                            index==data.length-1 &&
                                            <tr>
                                            {
                                                columns.map((col)=>{
                                                    return <td>
                                                        {getSum(col.field,row.id)}
                                                    </td> 
                                                })
                                            }
                                            </tr>
                                        }
                                    </React.Fragment>
                                }
                            })
                        }

                </tbody>
            </table>
            {
                rowData.id &&
                <InputModal id={id} rowData={rowData} setRowData={setRowData} posY={posY}/> //rowData has the index of the row to be updated
            }
        </div>
    );
}

export default PlanTable;



{/* 
data.map((row,index)=>{
                                if((prevId==-1 || prevId==row.id) && index!=data.length-1){
                                    prevId==-1?prevId=row.id:prevId
                                    return <tr key={index} data={index} id={id} onContextMenu={(e)=>handleRightClick(e)} onClick={(e)=>handleClick(e,row)} style={{cursor:"pointer"}}>
                                    {
                                        Object.keys(row).map((cell,index)=>{
                                            return <td>
                                                {row[cell]}
                                            </td> 
                                        })
                                    }
                                    </tr>
                                }else{
                                    prevId=row.id
                                    return <React.Fragment>
                                        <tr>
                                        {
                                            columns.map((col)=>{
                                                return <td>
                                                    {getSum(col.field,row.id-1)}
                                                </td> 
                                            })
                                        }
                                        </tr>
                                        <tr key={index} id={id} data={index} onContextMenu={(e)=>handleRightClick(e)} onClick={(e)=>handleClick(e,row)} style={{cursor:"pointer"}}>
                                        {
                                            Object.keys(row).map((cell,index)=>{
                                                return <td>
                                                    {row[cell]}
                                                </td> 
                                            })
                                        }
                                        </tr>
                                        {
                                            index==data.length-1 &&
                                            <tr>
                                            {
                                                columns.map((col)=>{
                                                    return <td>
                                                        {getSum(col.field,row.id)}
                                                    </td> 
                                                })
                                            }
                                            </tr>
                                        }
                                    </React.Fragment>
                                }
                            })
*/}

{
    /* 
    data.map((tableRow,index)=>{
                                if(true){
                                    return <tr key={index} onClick={(e)=>handleClick(e,tableRow,index)} onContextMenu={handleRightClick} data={index} id={id}>
                                        {
                                            Object.keys(tableRow).map((cell,index)=>{
                                                return <td>
                                                    {tableRow[cell]}
                                                </td> 
                                            })
                                        }
                                    </tr>
                                }else{
                                    return <tr key=""></tr>
                                }
                            })
     */
}

{
    /* 
        
    {
                            data.map((tableRow,index)=>{
                                if((prevId==-1 || prevId==tableRow.id) && index!=data.length-1){
                                    prevId==-1?prevId=tableRow.id:prevId
                                    return <tr key={index} onClick={(e)=>handleClick(e,tableRow,index)} onContextMenu={(e)=>handleRightClick(e,tableRow,index)} data={index} id={id}>
                                        {
                                            Object.keys(tableRow).map((cell,index)=>{
                                                return <td key={index}>
                                                    {tableRow[cell]}
                                                </td> 
                                            })
                                        }
                                    </tr>
                                }else if(index==data.length-1){
                                    return <React.Fragment>
                                        <tr key={index} id={id} data={index} onContextMenu={(e)=>handleRightClick(e)} onClick={(e)=>handleClick(e,tableRow,index)} style={{cursor:"pointer"}}>
                                        {
                                            Object.keys(tableRow).map((cell,index)=>{
                                                return <td key={index}>
                                                    {tableRow[cell]}
                                                </td> 
                                            })
                                        }
                                        </tr>
                                        <tr>
                                        {
                                            columns.map((col,index)=>{
                                                //================== sum proper nahi hai================
                                                return <td key={index}>
                                                    {getSum(col.field,tableRow.id)}    
                                                </td> 
                                            })
                                        }
                                        </tr>
                                    </React.Fragment>
                                }else{  
                                    prevId=tableRow.id
                                    return <React.Fragment>
                                        <tr>
                                        {
                                            columns.map((col,index)=>{
                                                return <td key={index}>
                                                    {getSum(col.field,tableRow.id-1)}
                                                </td> 
                                            })
                                        }
                                        </tr>
                                        <tr key={index} id={id} data={index} onContextMenu={(e)=>handleRightClick(e)} onClick={(e)=>handleClick(e,tableRow,index)} style={{cursor:"pointer"}}>
                                        {
                                            Object.keys(tableRow).map((cell,index)=>{
                                                return <td key={index}>
                                                    {tableRow[cell]}
                                                </td> 
                                            })
                                        }
                                        </tr>
                                    </React.Fragment>
                                }
                            })
                        }

    */
}
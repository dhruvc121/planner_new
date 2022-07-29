import React from 'react';
import { Store } from '../../../utils/store';
import InputModal from './inputModal';

/* export const ContextMenu=()=>{
    return  <div className='context-menu-container' style={{...styles.contextMenuContainer,display:showMenu?'flex':"none"}}>
    <ul className='context-menu' style={styles.contextMenu}>
        <li className='context-menu-item' style={styles.contextMenuItem}>Add Sub stone</li>
        <li className='context-menu-item' style={styles.contextMenuItem}>Add New Stone</li>
        <li className='context-menu-item' style={styles.contextMenuItem} onClick={()=>setShowMenu(false)}>Cancel</li>
    </ul>
</div>
} */


const PlanTable = ({data,columns,id}) => {
    const{state,dispatch}=React.useContext(Store)
    const {colStatus}=state
    const[posY,setPosY]=React.useState(0)
    const [rowData,setRowData]=React.useState({})
    /* const [showMenu,setShowMenu]=React.useState(false) */
    let prevId=-1
    const getSum=(col,id)=>{
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

    /* const handleRightClick=(e)=>{
        e.preventDefault()
        const planId=e.target.parentElement.attributes.id.value
        const index=e.target.parentElement.attributes.data.value
        
        const x=e.pageX
        const y=e.pageY
        setShowMenu(true)
        //open modal and get option

        //if sub stone
            addSubStone(e,planId,index)
        //if new stone
    } */
    const handleRightClick=(e,planId,index)=>{
        e.preventDefault()
        const planId=e.target.parentElement.attributes.id.value
        const index=e.target.parentElement.attributes.data.value
           
        let emptyRow=createEmptyRow()
        let newData=[...state.plans[planId].data]
        newData.splice(parseInt(index)+1,0,{...emptyRow,id:state.plans[planId].data[index].id,['stone id']:state.plans[planId].data[index]['stone id']})
        const updatedPlans=state.plans.map((plan)=>{return plan.id==e.target.parentElement.id?{...plan,data:newData}:plan})
        dispatch({type:"UPDATE_PLANS",payload:updatedPlans})
    }
    const handleClick=(e,row,index)=>{
       e.target.parentElement.className="active"
       //console.log(e.screenY,e.pageY)
       setPosY(e.pageY+10)
       setRowData({...row,index})
    }
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column,index)=>{
                            let colIndex=colStatus.findIndex((cols)=>cols.col_name==column.field)
                            if(colStatus[colIndex].status){
                                return<th key={index}>{column.field}</th>
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                        {
                            data.map((row,index)=>{
                                if(prevId==-1){
                                    prevId=row.id
                                    return <tr key={index} data={index} id={id} onContextMenu={handleRightClick} onClick={(e)=>handleClick(e,row,index)} style={{cursor:"pointer"}}>
                                    {
                                        Object.keys(row).map((cell,index)=>{
                                            let colIndex=colStatus.findIndex((cols)=>cols.col_name==cell)
                                            if(colStatus[colIndex].status){
                                            return <td key={index}>
                                                {row[cell]}
                                            </td> }
                                        })
                                    }
                                    </tr>
                                }else{
                                    if(index==data.length-1){
                                        return <React.Fragment>
                                            {prevId!=row.id &&
                                                <tr>
                                            {
                                                columns.map((col,index)=>{
                                                    let colIndex=colStatus.findIndex((cols)=>cols.col_name==col.field)
                                                    if(colStatus[colIndex].status){
                                                    return <td key={index}>
                                                        {getSum(col.field,row.id-1)}
                                                    </td> }
                                                })
                                            }
                                            </tr>}
                                            <tr key={index} data={index} id={id} onContextMenu={handleRightClick} onClick={(e)=>handleClick(e,row,index)} style={{cursor:"pointer"}}>
                                            {
                                                Object.keys(row).map((cell,index)=>{
                                                    let colIndex=colStatus.findIndex((cols)=>cols.col_name==cell)
                                                    if(colStatus[colIndex].status){
                                                    return <td key={index}>
                                                        {row[cell]}
                                                    </td> }
                                                })
                                            }
                                            </tr>
                                            <tr>
                                            {
                                                columns.map((col,index)=>{
                                                    let colIndex=colStatus.findIndex((cols)=>cols.col_name==col.field)
                                                    if(colStatus[colIndex].status){
                                                    return <td key={index}>
                                                        {getSum(col.field,row.id)}
                                                    </td> }
                                                })
                                            }
                                            </tr>
                                        </React.Fragment>
                                    }else{
                                        if(prevId==row.id){
                                            return  <tr key={index} data={index} id={id} onContextMenu={handleRightClick} onClick={(e)=>handleClick(e,row,index)} style={{cursor:"pointer"}}>
                                            {
                                                Object.keys(row).map((cell,index)=>{
                                                    let colIndex=colStatus.findIndex((cols)=>cols.col_name==cell)
                                                    if(colStatus[colIndex].status){
                                                    return <td key={index}>
                                                        {row[cell]}
                                                    </td> }
                                                })
                                            }
                                            </tr>
                                        }else{
                                            prevId=row.id
                                            return <React.Fragment>
                                            <tr>
                                            {
                                                columns.map((col,index)=>{
                                                    let colIndex=colStatus.findIndex((cols)=>cols.col_name==col.field)
                                                    if(colStatus[colIndex].status){
                                                    return <td key={index}>
                                                        {getSum(col.field,row.id-1)}
                                                    </td> }
                                                })
                                            }
                                            </tr>
                                            <tr key={index} data={index} id={id} onContextMenu={handleRightClick} onClick={(e)=>handleClick(e,row,index)} style={{cursor:"pointer"}}>
                                            {
                                                Object.keys(row).map((cell,index)=>{
                                                    let colIndex=colStatus.findIndex((cols)=>cols.col_name==cell)
                                                    if(colStatus[colIndex].status){
                                                    return <td key={index}>
                                                        {row[cell]}
                                                    </td> }
                                                })
                                            }
                                            </tr>
                                            </React.Fragment>
                                        }
                                    }
                                }
                                
                                
                                
                                
                            })
                        }

                </tbody>
            </table>
            {
                rowData.id &&
                <InputModal id={id} rowData={rowData} setRowData={setRowData} posY={posY}/> //rowData has the index of the row to be updated
            }
            {
             /*    showMenu &&
                <ContextMenu data={data}/>
              */   
            }
        </div>
    );
}

export default PlanTable;


const styles={
    contextMenuContainer:{
        backgroundColor:" white",
        width:" 100%",
        maxWidth:" 100px",
        padding:"1px 5px",
    },
    contextMenu:{
        listStyleType: "none",
        margin: "0px",
    },
    contextMenuItem:{
        margin:"3px 0",
        cursor:"pointer",
    }
}
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

{
    /* if((prevId==-1 || prevId==row.id) && index!=data.length-1){
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
                                } */
}
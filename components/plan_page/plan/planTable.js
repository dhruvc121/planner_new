import React from 'react';
import { Store } from '../../../utils/store';
import InputModal from './inputModal';

export const ContextMenu=({showMenu,setShowMenu,eventData,columns,state,dispatch})=>{
    const x=eventData.pageX
    const y=eventData.pageY
    const createEmptyRow=()=>{
        let row={}
        columns.map((title)=> row[title.field]="")
        return row
      }    
    const addSubStone=()=>{
        console.log("2")
        const planId=eventData.target.parentElement.attributes.id.value
        const index=eventData.target.parentElement.attributes.data.value
           
        let emptyRow=createEmptyRow()
        let newData=[...state.plans[planId].data]
        newData.splice(parseInt(index)+1,0,{...emptyRow,id:state.plans[planId].data[index].id,['stone id']:state.plans[planId].data[index]['stone id']})
        const updatedPlans=state.plans.map((plan)=>{return plan.id==eventData.target.parentElement.id?{...plan,data:newData}:plan})
        dispatch({type:"UPDATE_PLANS",payload:updatedPlans})
        setShowMenu(false)
    }
    
    const createStone=(id)=>{
        let update=[...state.plans]
        let emptyRow=createEmptyRow()
        const{data}=update[id]
        emptyRow.id=data[data.length-1].id + 1
        emptyRow['stone id']=data[data.length-1]['stone id']
        update[id].data=[...update[id].data,emptyRow]
        dispatch({type:"UPDATE_PLANS",payload:update})
        setShowMenu(false)
    }
    return  <div className='context-menu-container' style={{...styles.contextMenuContainer,top:y,left:x,display:showMenu?'flex':"none"}}>
    <ul className='context-menu' style={styles.contextMenu}>
        <li className='context-menu-item' style={styles.contextMenuItem} onClick={addSubStone}>Add Sub stone</li>
        <li className='context-menu-item' style={styles.contextMenuItem} onClick={()=>createStone(parseInt(eventData.target.parentElement.attributes.id.value))}>Add New Stone</li>        {/* onclick call createstone */}
        <li className='context-menu-item' style={styles.contextMenuItem} onClick={()=>setShowMenu(false)}>Cancel</li>
    </ul>
</div>
}


const PlanTable = ({data,columns,id}) => {
    const{state,dispatch}=React.useContext(Store)
    const {colStatus}=state
    const[posY,setPosY]=React.useState(0)
    const [rowData,setRowData]=React.useState({})
    const [showMenu,setShowMenu]=React.useState(false)
    const [eventData,setEventData]=React.useState({})
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

    
    const handleRightClick=(e)=>{
        e.preventDefault()
        console.log("1")
        setEventData({...e})
        setShowMenu(true)
       
    }
    const handleClick=(e,row,index)=>{
       e.target.parentElement.className="active"
       //console.log(e.screenY,e.pageY)
       setPosY(e.pageY+10)
       setRowData({...row,index})
    }
    const getCPSValue=(c,p,s)=>{
        if(c=="EXCELLENT")
          c="X"
        else if(c=="V. GOOD")
          c="V"
        else c="G"
        //set 'p' value
        //p=getPolValue(obj)
        if(p=="EXCELLENT")
          p="X"
        else if(p=="V. GOOD")
          p="V"
        else p="G"
        //set 's' value
        //s=getSymValue()
        if(s=="EXCELLENT")
          s="X"
        else if(s=="V. GOOD")
          s="V"
        else s="G"
        return c+p+s
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
                                            {/* row[cell] */
                                                (cell=="cps")?getCPSValue(row.cut,row.pol,row.sym):row[cell]
                                            }
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
                                                        {/* row[cell] */
                                                            (cell=="cps")?getCPSValue(row.cut,row.pol,row.sym):row[cell]
                                                        }
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
                                                        {/* row[cell] */
                                                            (cell=="cps")?getCPSValue(row.cut,row.pol,row.sym):row[cell]
                                                        }
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
                                                        {/* row[cell] */
                                                            (cell=="cps")?getCPSValue(row.cut,row.pol,row.sym):row[cell]
                                                        }
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
                showMenu && eventData &&
                <ContextMenu showMenu={showMenu} setShowMenu={setShowMenu} eventData={eventData} state={state} dispatch={dispatch} columns={columns}/>
                
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
        position:"absolute",
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

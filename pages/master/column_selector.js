import React from 'react';
import axios from 'axios'

const ColumnSelector = () => {
    const [selectedCols,setSelectedCols]=React.useState([])
    React.useEffect(()=>{
        getColName()
    },[])
    const getColName=async()=>{
        try{
            const data=await axios.get('/api/columnmasterdata')
            setSelectedCols(data.data.rows)   
        }catch(err){
            console.log(err)
            window.alert("Fetch data failed!")
        }
    }
    //console.log(selectedCols)
    const handleChange=async(colId)=>{
        try{
            let update=[...selectedCols]
            await axios.put('/api/columnmasterdata',{id:colId})
            update=update.map((col)=>{
                if(col.id==colId){
                    //console.log("here",col.id,colId,col,{...col,status:!col.status})
                    return col.status?{...col,status:false}:{...col,status:true}
                }else{
                    //console.log("eles")
                    return col
                }
            })
            //console.log(update)
            setSelectedCols(update)
        }catch(err){
            window.alert('Column status update failed')
            getColName()
        }
    }
   //console.log(selectedCols)
    return (
        <div className='container' style={styles.container}>
            <h4>Column Selector Master</h4>
            <hr/>
            <div className='user-permissions-container' style={styles.userPermissionContainer}>
                    <h5>User Permissions:</h5>
                    <div className='table-container' style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <td>Column Name</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedCols.map((colname,index)=>{
                                        return <tr key={index}>
                                            <td>{colname.col_name}</td>
                                            <td><input type="checkbox" value={colname.id} checked={colname.status} onChange={(e)=>handleChange(e.target.value)}/></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    );
}


const styles={
    container:{
        minHeight:"100vh",
        position:" absolute",
        top:" 50%",
        left:" 50%",
        transform:" translate(-50%, -50%)",
        width:" 100%",
        maxWidth:"1300px",
        background:" aliceblue",
        display:" flex",
        flexDirection:" column",
        alignItems:" center",
    },
    userSelectionContainer:{
        width:" 50%",
        backgroundColor:" antiquewhite",
        display:" flex",
        justifyContent:" space-around",
        alignItems:"center"
    },
    userPermissionContainer:{
        width:"50%",
    },
    tableContainer:{
        maxHeight:" 400px",
        overflow:" auto",
        width:"100%",
    },
    table:{
        width:"100%"
    },
    button:{
        marginTop:" 1rem",
        width:" 100%",
        padding:" 0.5rem",
    }
}

export default ColumnSelector;

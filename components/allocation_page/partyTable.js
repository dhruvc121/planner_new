import React from 'react';
import InputModal from '../plan_page/plan/inputModal';

const PartyTable = ({columns,data,hideCols,getData}) => {
    const [rowData,setRowData]=React.useState({})
    const [posY,setPosY]=React.useState()
    const getSum=(col)=>{
        //console.log(data)
        let sum=0;
        data.map((item)=>{
          //      console.log("========",item[col],col)
                sum=sum+parseFloat(item[col]||0)
            })
        if(isNaN(sum) || col=="id"){
            sum=""
          }else{
            sum=sum.toFixed(3)
          } 
        return sum
    }
    const handleClick=(e,row,index)=>{
        if(!Object.keys(rowData).length){
            setRowData({...row,index})
            e.target.parentElement.className="active"
            setPosY(e.pageY+10)
        }else{
            setRowData({})
            let ele=document.querySelector('.active')
            ele.classList.remove('active') 
        }
     }
   
    return (
        <div>
            <table>
                <thead>
                    <tr key="1">
                        {
                            columns.map((colName,index)=>{
                                if(!hideCols.includes(colName.field))
                                return <th key={index}>{colName.displayName}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                        {
                            <tr>
                                            {
                                                columns.map((col,index)=>{
                                                    if(!hideCols.includes(col.field))
                                                    return <td key={index}>
                                                        {getSum(col.field)}
                                                    </td>
                                                })
                                            }
                            </tr>
                        }
                        {
                            data.map((row,index)=>{
                                return <tr style={styles.tr} key={index} onClick={(e)=>{handleClick(e,row,index)}}>{
                                    columns.map((cell,index)=>{
                                        //return cell only if col exists
                                        if(!hideCols.includes(cell.field))
                                            return <td key={index}>{row[cell.field]}</td>
                                        
                                    })
                                }</tr>
                            })
                        }
                    
                </tbody>
            </table>
            {
                rowData.id &&
                <InputModal rowData={rowData} setRowData={setRowData} getallocationdata={getData}/>
            }
        </div>
    );
}

const styles={
    tr:{
        cursor:"pointer"
    }
}

export default PartyTable;





/* 
+1:"",
+2:"",
-1:"",
-2:"",
assort:"",
bot opens:"",
clarity:"IF",
color:"D",
cps:"",
crownHeight:"17.8",
crownangle:"38.49",
cut:"",
depth:"",
diameter:"4.2",
fl:"NOBLK",
flrc:"",
grading:"KP-DISC VG",
id:1,
lab:"",
labour:"",
length:"4.2",
milky:"",
net value:"",
net value%:"",
partpolishwt:"0.311",
partroughwt:"0.941",
pavilangle:"39.8",
pointer range:"",
pol:"EXCELLENT",
price:"",
ratio:"1",
remark:"",
reminder:"",
shade range:"",
shape:"ROUND",
stone id:"DLU859-1",
sym:"EXCELLENT",
table%:"55.1",
td%:"65",
tdmm:"2.73",
tinch:"",
top opens:"",
totalr.wt:"0.941",
trend:"",
username:"",
value:"",
width:"4.2",

*/
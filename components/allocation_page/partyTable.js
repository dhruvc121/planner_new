import React from 'react';

const PartyTable = ({columns,data,hideCols}) => {
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
                                return <tr key={index}>{
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
        </div>
    );
}

export default PartyTable;

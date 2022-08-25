import React from 'react';

const PartyTable = ({columns,data}) => {
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
                                return <th key={index}>{colName.field}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                        {
                            <tr>
                                            {
                                                columns.map((col,index)=>{
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
                                    Object.keys(row).map((cell,index)=>{
                                        return <td key={index}>{row[cell]}</td>
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

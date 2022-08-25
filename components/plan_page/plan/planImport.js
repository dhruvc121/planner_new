import React from 'react';
import * as XLSX from 'xlsx';
import { Store } from '../../../utils/store';
import {shapeDetail,symDetails} from '../../../utils/constants'
const PlanImport = () => {
    const [fileImport,setFileImport]=React.useState("")
    const fileInput = React.useRef();
    const {state,dispatch}=React.useContext(Store)
   
    const requiredcols=[{                 //these are the extra columns to be added
      field: "flrc",
    },{
      field: "tinch",
    },{
      field: "milky",
    },{
      field: "cut",
    },{
      field: "pol",
    },{
      field: "sym",
    },{
      field: "depth",
    },{
      field: "cps",
    },{
      field: "-2",
    },{
      field: "-1",
    },{
      field: "+1",
    },{
      field: "+2",
    },  
  ]
    
  /* const addSumRow=(list)=>{
    let newArr=[...list]
    const getEmptyRow=()=>{
      return row
    }
    list.map((row,index)=>{
      
      //when stone id change
      const emptyRow=getEmptyRow()
      //push this row to specific index
      newArr.splice(index,0,emptyRow)
    })
  } */


    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      //let count=1
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
          const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
          if (headers && row.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              let d = row[j];
              if (d.length > 0) {
                if (d[0] === '"')
                  d = d.substring(1, d.length - 1);
                if (d[d.length - 1] === '"')
                  d = d.substring(d.length - 2, 1);
              }
              if (headers[j]) {
                if(headers[j].toLowerCase().trim()=='shape'){
                  obj[headers[j].toLowerCase().trim()] = shapeDetail.find(obj=>d==obj.shapename).original_name
                }else if(headers[j].toLowerCase().trim()=='sym'){
                  obj[headers[j].toLowerCase().trim()] = symDetails.find(obj=>d==obj.symName).original_name
                  //obj[headers[j].toLowerCase().trim()] = symDetails.find(item=>obj.grading==item.symName).original_name
                }else{
                  obj[headers[j].toLowerCase().trim()] = d;
                }
              }
            }
            const getSymValue=()=>{
              return symDetails.find(item=>obj.grading==item.symName).original_name||"EXCELLENT"
            }
            const getPolValue=(obj)=>{
              /* if(count){
                console.log(obj.partpolishwt,"0.69",obj.partpolishwt>0.33,obj.partpolishwt<0.69,"====================");
                count--;
              } */
              const symmetry=getSymValue()
              if(obj.shape=="ROUND"){         //for round shapes
                console.log("if")
                if(obj.partpolishwt<0.298){
                  if(symmetry=="EXCELLENT" ){
                    return "V. GOOD"
                  }else if(symmetry=="V. GOOD"){
                    return "V. GOOD"
                  }
                }else if(obj.partpolishwt>=0.298 && obj.partpolishwt<0.698){
                  if(symmetry=="EXCELLENT" ){
                    return "EXCELLENT"
                  }else if(symmetry=="V. GOOD"){
                    return "V. GOOD"
                  }
                }else if(obj.partpolishwt>=0.698){
                  if(symmetry=="EXCELLENT" ){
                    return "EXCELLENT"
                  }else if(symmetry=="V. GOOD"){
                    return "EXCELLENT"
                  }                  
                }
              }
              else{           //for fancy shapes
                console.log("else")
                if(obj.partpolishwt<0.298){
                  if(symmetry=="EXCELLENT" ){
                    return "V. GOOD"
                  }else if(symmetry=="V. GOOD"){
                    return "V. GOOD"
                  }
                }else if(obj.partpolishwt>=0.298 && obj.partpolishwt<0.698){
                  if(symmetry=="EXCELLENT" ){
                    return "EXCELLENT"
                  }else if(symmetry=="V. GOOD"){
                    return "V. GOOD"
                  }
                }else if(obj.partpolishwt>=0.698){
                  if(symmetry=="EXCELLENT" ){
                    return "EXCELLENT"
                  }else if(symmetry=="V. GOOD"){
                    return "EXCELLENT"
                  }                  
                }
              }
            }
            const getCutValue=(obj)=>{
              if(obj.shape!="ROUND"){
                if(obj.grading.match("KP PRM") || obj.grading.match("KP-PRM")){
                  return "EXCELLENT"
                }else if(obj.grading.match("KP STD") || obj.grading.match("KP-STD") || obj.grading.match("KPSTD" || obj.grading.match("KP-std"))){
                  return "V. GOOD"
                }else if(obj.grading.match("KP DISC") || obj.grading.match("KP-DISC") || obj.grading.match("KP DISCOUNT") || obj.grading.match("KP-DISCOUNT") || obj.grading.match("KP- DISCOUNT")){
                  return "GOOD"
                }else{
                  return ""
                }
              }else{
                return ""
              }
            }


            // remove the blank rows
            if (Object.values(obj).filter(x => x).length > 0) {
              list.push({...obj,
              id:parseInt(obj.id)+1,
              flrc:"",
              tinch:"",
              milky:"",
              cut:getCutValue(obj),
              pol:getPolValue(obj),
              sym: getSymValue(),           //sym will get its value from grading generalization
              depth:"",
              cps:"",
              ['-2']:"",
              ['-1']:"",
              ['+1']:"",
              ['+2']:"",
              });
            }
          }
        }
        // prepare columns list from headers
        const columns = headers.map(c => ({
          field: c.toLowerCase().trim(), 
        }));

        //addSumRow(list)
        dispatch({type:"UPDATE_PLANS",payload:[...state.plans,{id:state.plans.length,data:list,columns:[...columns,...requiredcols]}]})
        
      }
      // handle file upload
      const handleFileUpload = e => {
        console.log(e.target.value)
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
          /* Parse data */
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          processData(data);
        };
        reader.readAsBinaryString(file);
      // console.log(data)
      }
    return (
        <div>
        <div style={{display:"none"}}>
            <label>Import File:</label>
            <input
                value={fileImport}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                ref={fileInput}
            />
        </div>
        <button onClick={()=>fileInput.current.click()}>import</button>
        </div>
    );
}

export default PlanImport;

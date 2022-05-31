import React from 'react';
import * as XLSX from 'xlsx';
import { Store } from '../../../utils/store';

const PlanImport = () => {
    const [fileImport,setFileImport]=React.useState("")
    const fileInput = React.useRef();
    const {state,dispatch}=React.useContext(Store)
   
    const requiredcols=[{
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
    }, 
  ]
    // process CSV data
    const processData = dataString => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    
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
                obj[headers[j].toLowerCase().trim()] = d;
              }
            }
    
            // remove the blank rows
            if (Object.values(obj).filter(x => x).length > 0) {
              list.push({...obj,
              flrc:"",
              tinch:"",
              milky:"",
              cut:"",
              pol:"",
              sym:"",
              depth:""
              });
            }
          }
        }
        // prepare columns list from headers
        const columns = headers.map(c => ({
          field: c.toLowerCase().trim(), 
        }));

        dispatch({type:"UPDATE_PLANS",payload:[...state.plans,{id:state.plans.length,data:list,columns:[...columns,...requiredcols]}]})
      //  console.log({data:list,columns:columns})
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

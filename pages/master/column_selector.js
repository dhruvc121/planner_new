import React from 'react';
import { Store } from '../../utils/store';

const ColumnSelector = () => {
    const {state}=React.useContext(Store)
    const [selectedCols,setSelectedCols]=React.useState([])
    const colList=[
        {field: 'id'},
{field: 'stone id'},
{field: 'fl'},
{field: 'username'},
{field: 'totalr.wt'},
{field: 'partroughwt'},
{field: 'partpolishwt'},
{field: 'diameter'},
{field: 'ratio'},
{field: 'grading'},
{field: 'clarity'},
{field: 'color'},
{field: 'shape'},
{field: 'td%'},
{field: 'tdmm'},
{field: 'table%'},
{field: 'pavilangle'},
{field: 'crownangle'},
{field: 'crownheight'},
{field: 'length'},
{field: 'width'},
{field: 'flrc'},
{field: 'tinch'},
{field: 'milky'},
{field: 'cut'},
{field: 'pol'},
{field: 'sym'},
{field: 'depth'},
{field: 'cps'},
{field: '-2'},
{field: '-1'},
{field: '+1'},
{field: '+2'},
    ]



    const handleChange=(colName)=>{
        setSelectedCols([...selectedCols,colName])
    }
    return (
        <div>
            {
                colList.map((col,index)=>{
                    return <div className='select-col-container' key={index}>
                        <label>{col.field}</label>
                        <input type="checkbox" value={col.field} onChange={(e)=>handleChange(e.target.value)}/>
                    </div>
                })
            }
            <div>{`${selectedCols} `}</div>        
        </div>
    );
}

export default ColumnSelector;

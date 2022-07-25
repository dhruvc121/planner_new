import React from 'react';
import { Store } from '../../utils/store';


const UpperLeft=()=>{
    return <fieldset>
        <div className='d-flex' name="top">
            <div className='d-flex'>
                <label>pktno:</label>
                <input type='text'></input>
            </div>
            <div className='d-flex'>
                <label>quality:</label>
                <input type='text'></input>
                <input type='text'></input>
            </div>
            <div className='d-flex'>
                <label>remarks:</label>
                <input type='text'></input>
            </div>
        </div>
        <div name="bottom">
            <div className='d-flex-space'>
                <button>Show</button>
                <button>save all</button>
                <button>de-allo</button>
                <button>original</button>
                <button>rret</button>
                <button>pnl-x</button>
                <button>cancel</button>
                <button>d to z</button>
                <button>lot replan</button>
                <button>discuss</button>
                <button>cross plan</button>
            </div>
        </div>
    </fieldset>
} 

const UpperRight=()=>{
    return <fieldset>
        <div className='d-flex'>
            <div name="grid1">
                <table>
                    <tbody>
                        <tr>
                            <th>color/result/remark</th>
                            <td>h-</td>
                            <td>h+</td>
                            <td>g</td>
                        </tr>
                        <tr>
                            <th>flrc/remark</th>
                            <td>light 002</td>
                            <td></td>
                            <td>none</td>
                        </tr>
                        <tr>
                            <th>yl uv/8n tin/fanoy yl</th>
                            <td></td>
                            <td>n/a</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div name="grid2">
                <table>
                    <thead>
                        <tr>
                            <th>issue</th>
                            <th>diff</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>04/04</td>
                            <td>14</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div name="grid3">
                <table>
                <tbody>
                    <tr>
                        <th>tension</th>
                        <td>leopard high</td>
                    </tr>
                    <tr>
                        <th>allocation outstanding</th>
                        <td>392</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div name="some-details">
                <div name="time-seconds">
                    <center><b>{`3 seconds`}</b></center>
                </div>
                <div className='d-flex' name="some-buttons">
                    <div className='d-flex'>
                        <input type="checkbox" />
                        <label>fill new</label>
                    </div>
                    <button>Sub-bug</button>
                    <button>mail</button>
                </div>
            </div>
        </div>
    </fieldset>
}
const LowerLeft=({master})=>{
    return <fieldset>
    <legend>update in all plans</legend>
    <div className='d-flex'>
        <div className='d-flex'>
            <label>color</label>
            <select>
                <option value="select" key={-1}>select</option>
                {
                    master.map((menuItem,index)=>{
                        return menuItem.mastertype=="color"?<option key={index}>{menuItem.displayname}</option>:null
                    })
                }
            </select>
        </div>
        <div className='d-flex'>
            <label>flrc</label>
            <select>
                <option value="select" key={-1}>select</option>
                {
                    master.map((menuItem,index)=>{
                        return menuItem.mastertype=="flrc"?<option key={index}>{menuItem.displayname}</option>:null
                    })
                }
            </select>
        </div>
        <div className='d-flex'>
            <label>tinch</label>
            <select>
                <option value="select" key={-1}>select</option>
                {
                    master.map((menuItem,index)=>{
                        return menuItem.mastertype=="tinch"?<option key={index}>{menuItem.displayname}</option>:null
                    })
                }
            </select>
        </div>
        <button>save</button>
    </div>
</fieldset>
}

const LowerCenter=()=>{
    return <fieldset>
        <legend>direct</legend>
        <div className='d-flex'>
            <button>sbs</button>
            <button>am</button>
            <button>hod</button>
            <button>cm</button>
        </div>
    </fieldset>
}

const LowerRight=()=>{
    return<fieldset>
    <legend></legend>
        <div className='d-flex'>
            <div>
                <button>images</button>
            </div>
            <div>
                <div className='d-flex'>
                    <button>Up</button>
                    <p>order pending</p>
                </div>
                <div className='d-flex'>
                    <button>Down</button>
                    <p>order confirm</p>
                </div>
            </div>
        </div>
    </fieldset>
}
const PageHeader = () => {
    const {state,dispatch}=React.useContext(Store)
    const {master}=state
    return (
        <div style={{backgroundColor:"#eee",padding:"5px",fontSize:"smaller"}}>
            <div className='d-flex-space' name="upper-section">
                <div name="upper-left">
                    {<UpperLeft/>}
                </div>
                <div name="upper-right">
                    {<UpperRight/>}
                </div>
            </div>
            <div className='d-flex' name="lower-section">
                <div name="lower-left">
                    <LowerLeft master={master}/>
                </div>
                <div name="lower-center">
                    <LowerCenter/>
                </div>
                <div name="lower-right">
                    <LowerRight/>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;

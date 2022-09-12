import React from 'react';
import {useRouter} from 'next/router'
import { Store } from '../utils/store';
import axios from 'axios';

const Home = () => {
    const router=useRouter()
    const {state,dispatch}=React.useContext(Store)
    React.useEffect(()=>{
        if(!state.user.id){
            router.push('/login')
        }
    },[])
    React.useEffect(()=>{
        if(!state.user.id){
            router.push('/login')
        }
        const getMasterData=async()=>{
            const {data}=await axios.get('/api/masterdata')
            dispatch({type:"MASTER",payload:data})
        }
        getMasterData()
        const getColStatus=async()=>{
            try{
                const {data}=await axios.get('/api/columnmasterdata')
                dispatch({type:"SET_COL_STATUS",payload:data.rows})
            }catch(err){
                console.log(err)
                window.alert("Fetch data failed!")
            }
        }
        getColStatus()
        console.log(state.user)
    },[])
    return (
        <div className='container' style={styles.container}>
            <h3>Master</h3>
            <hr style={{width:"100%"}}/>
            <div className="card-container" onClick={()=>router.push('/master/column_selector')} style={styles.cardContainer}>
                <img src="https://placeholder.pics/svg/75" alt="placeholder" />
                <div className='card-body' style={styles.cardBody}>
                    <h5>Column Master</h5>
                </div>
            </div>
            <br/>
            <br/>
            <h3>Pages</h3>
            <hr style={{width:"100%"}}/>
            <div className='pages-container' style={styles.pagesContainer}>
            <div className="card-container" onClick={()=>router.push('/plan_page')} style={styles.cardContainer}>
                <img src="https://placeholder.pics/svg/75" alt="placeholder" />
                <div className='card-body' style={styles.cardBody}>
                    <h5>Plan Page</h5>
                </div>
            </div>
            <div className="card-container" onClick={()=>router.push('/allocation_page')} style={styles.cardContainer}>
                <img src="https://placeholder.pics/svg/75" alt="placeholder" />
                <div className='card-body' style={styles.cardBody}>
                    <h5>Allocation Page</h5>
                </div>
            </div>
            </div>
        </div>
    );
}

const styles={
    container:{
        maxWidth:" 1300px",
        width:" 100%",
        position:" absolute",
        top:" 50%",
        left:" 50%",
        transform:" translate(-50%, -50%)",
        minHeight:" 100vh",
        display:" flex",
        flexDirection:" column",
        alignItems:" flex-start",
        justifyContent:" flex-start",
    },
    cardContainer:{
        display:" flex",
        alignItems:" center",
        boxShadow:" 2px 1px 3px -2px",
        padding:" 0.5rem",
        width:" 20%",
        cursor:"pointer",
    },
    cardBody:{
        width:" 100%",
        display:" flex",
        justifyContent:" center",
    },
    pagesContainer:{
        width:"100%",
        display:"flex",
        alignItems:"center",
    }

    

}

export default Home;

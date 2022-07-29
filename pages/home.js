import React from 'react';
import {useRouter} from 'next/router'
import { Store } from '../utils/store';

const Home = () => {
    const router=useRouter()
    const {state}=React.useContext(Store)
    React.useEffect(()=>{
        if(!state.user.id){
            router.push('/login')
        }
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
            <div className="card-container" onClick={()=>router.push('/plan_page')} style={styles.cardContainer}>
                <img src="https://placeholder.pics/svg/75" alt="placeholder" />
                <div className='card-body' style={styles.cardBody}>
                    <h5>Plan Page</h5>
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
    }
    

}

export default Home;
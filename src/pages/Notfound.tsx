import React from 'react'
import MetaData from '../misc/MetaData'
import { IconHouse } from '../assets/icons'
import { Link } from 'react-router-dom'

const Notfound:React.FC = () => {
  return (
    <>
     <MetaData title='Page Not found'/>
     <div style={{height:'100vh', width:'100vw', display:'flex', alignItems:'center',justifyContent:'center'}}> <h2>Page Not found :(&nbsp;<Link to={'/'}><p style={{fontSize:'12px', color:'grey', textDecoration:'underline'}}><IconHouse/> Go to Home</p></Link></h2></div>
    
    </>
   
  )
}

export default Notfound
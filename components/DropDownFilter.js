import React from 'react'
import styles from '../styles/dropdown_filter.module.css'



function Dropdownfilter(props) {




  return (
    
    <div className={styles.main_div}>
      
      {props.list.map((item,index)=>{return <div style={{color:'rgba(147, 147, 147, 1)',width:'100%',paddingTop:'0.5em',paddingBottom:'0.5em',backgroundColor:'rgba(251, 252, 255, 1)',cursor:'pointer'}} key={index} onClick={()=>{props.click(index)}} ><span>{item}</span></div>})}
      {/* {props.things.map((item)=>{return <div><h1>{item}</h1></div>})} */}



    </div>
  )
}

function setClicked(e){
  console.log(e)

}

export default Dropdownfilter
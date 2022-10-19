import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import style from '../styles/PickPaper_PaperCard.module.css'

import {app} from '../firebase-config'
import {getStorage,ref,getDownloadURL} from 'firebase/storage'
import { query } from 'firebase/firestore'

const firebaseStorage = getStorage(app)

function PickPaper_PaperCard(props) {

  const router = useRouter()

  const[imageUrl,setImageUrl] = useState("")

  function IconImage(){


    getDownloadURL(ref(firebaseStorage,props.icon))
      .then((url)=>{
        setImageUrl(url)

    // console.log("storage *********************")
    // console.log(url)
    // console.log("storage *********************")

        
        
      })
      return <img class={style.paper_icon} src={imageUrl} alt="" />
      // return <div className="">{imageUrl}</div>

    
  }
  return (
    // <Link href={{ pathname:`/papers/${props.meta_name}`, query:{}}}>
    <Link href={{ pathname:`/papers/${props.full_path.replaceAll("/",'-')}`, query:{'meta_name':props.meta_name}}}>

    <div className={style.paper_card}>
      {/* {props.title}  */}
      {/* {props.full_path.replaceAll("/",'_').replace('/papers','').replace("_",'')} */}
      {props.title}
      <IconImage/>
      {/* {getDownloadURL(ref(firebaseStorage,props.icon)).then((url)=>{return  <img src={url}></img>})} */}
    </div>
    
    </Link>
  )
}



export default PickPaper_PaperCard


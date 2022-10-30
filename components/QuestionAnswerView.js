import { arrayUnion, doc, increment, updateDoc ,query, addDoc, collection, where} from 'firebase/firestore';
import {useState , useEffect} from 'react'
import {getStorage,ref,getDownloadURL} from 'firebase/storage'
import {app, db} from '../firebase-config'
import { getAuth } from 'firebase/auth';

import styles from '../styles/question_answer_view.module.css'


const firebaseStorage = getStorage(app)
const auth = getAuth()


function QuestionAnswerView(props) {
  // {console.log(props.info.data()['user_info']['name'])}

  const [isLiked,setIsLiked] = useState(false)
  const [profilePic,setProfilePic] = useState('')
  const [likeCount,setLikeCount] = useState([props.info.data()['like_count']])
  const [idLikedTemp,setIsLikedTemp] = useState(false)

  const likedUsersRef = `${props.info.ref.path}/liked_users`

  // useEffect(()=>{
  //   getDownloadURL(ref(firebaseStorage,props.info.data()['user_info']['profile_pic'])).then((downUrl)=>{
  //     setProfilePic(downUrl)

  //   })
  // },[])

  // useEffect(()=>{
  //   // console.log()
  //   if(likedUsersRef != undefined){
  //     const q = query(likedUsersRef,where('user_id','array-contains',auth.currentUser.uid))
  //   console.log('************this*************')
  //   console.log(q)
  //   console.log('************this*************')
  //   }

  useEffect(()=>{
    setLikeCount([props.info.data()['like_count']])
  },[])
    

  // },[likedUsersRef])

  async function likeAnswer(){

    setIsLiked(true)

    
      await updateDoc(props.info.ref,{'like_count':increment(1)})
      setIsLiked(true)
      updateDoc(props.info.ref,{'liked_users':arrayUnion(auth.currentUser.uid)})
      setLikeCount(parseInt(likeCount)+1)
      // console.log(props.info.ref.path)
      const docRed = await addDoc(collection(db,likedUsersRef),{'user_id':auth.currentUser.uid})
      setIsLiked(false)   
    
   
    // console.log(props.info)
  }

  function LikeIcon() {

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="25"
        fill="none"
        viewBox="0 0 26 25"
      >
        <path
          fill={isLiked ? '#0048ba' : '#000000'}
          d="M2.863 24.81H4.14V8.218H2.863A2.553 2.553 0 00.311 10.77v11.488a2.553 2.553 0 002.552 2.553zM23.287 8.218h-8.935l1.432-4.3A2.553 2.553 0 0013.362.559h-.287L6.693 7.5v17.312h14.04l4.994-10.973.113-.515V10.77a2.553 2.553 0 00-2.553-2.553z"
        ></path>
      </svg>
    );
  }

  return (
    <div className={styles.main_div}>
        <img src={props.imageUrl}></img>
    <div className={styles.answer_info}>
      <img style={{height:'2em',width:'auto'}} src={props.info.data()['user_info']['profile_pic']}></img>
      {props.info.data()['user_info']['name']}  
      <div onClick={()=>{likeAnswer()}} className={styles.like_icon}><LikeIcon/></div>
      {likeCount}
      
    </div>    


    </div>
  )
}



export default QuestionAnswerView
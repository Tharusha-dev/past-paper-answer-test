import {useState,useEffect} from 'react'
import {doc,collection,getDocs,getDoc, query, where} from 'firebase/firestore'
import {app} from '../firebase-config'
import {getStorage,ref,getDownloadURL} from 'firebase/storage'
import QuestionAnswerView from './QuestionAnswerView'
import {styles} from '../styles/select_answer_card.module.css'



const firebaseStorage = getStorage(app)

function SelectAnswerCard(props) {

  const [docs,setDocs] = useState([])
  const [imageUrl,setImageUrl] = useState('')
  const [isAnswerViewOpen,setAnswerViewOpen] = useState(false)
  // let imageUrl

  async function getAnswers(){
    console.log("********************")

    const q = query(props.answerLoc, where("question","==",props.questionNum + 1))


    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docs[docs.length] = doc
      setDocs([...docs])
      // console.log(doc.id, " => ", doc.data());
    });


  }  



  useEffect(()=>{
    getAnswers()

  },[])
  return (
   
    <div style={{overflow:'hidden',position:'absolute',backgroundColor:'rgba(232, 232, 232, 1)',display:'flex'}}>
    {isAnswerViewOpen ? <></> : docs.map((doc,index)=>{
      console.log(doc)
      getDownloadURL(ref(firebaseStorage,doc.data()['answer_image'])).then((downUrl)=>{
        setImageUrl(downUrl)
      })
      return <div onClick={()=>{setAnswerViewOpen(true)}} key={index} style={{overflow:'hidden',margin:'1vw',padding:'0.8em',backgroundColor:'white',borderRadius:'1em'}}>
        <img style={{height:'30vw',borderRadius:'1em'}} src={imageUrl}></img>
        <div style={{position:'absolute',overflow:'hidden',bottom:'2em',fontSize:'1.8em',display:'flex',color:'white'}}>
        <span>{`${doc.data()['user_info']['name']}'s answer`}</span>
        <div style={{marginLeft:'30%'}}>
        <LikeIcon />
        <span>{doc.data()['like_count']}</span>
        </div>

        </div>
 
      </div>
    })}

      {isAnswerViewOpen ? <QuestionAnswerView imageUrl={imageUrl}/> : <span>none</span>}

    </div>

    
    
  )
  
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
        fill="#fff"
        d="M2.863 24.81H4.14V8.218H2.863A2.553 2.553 0 00.311 10.77v11.488a2.553 2.553 0 002.552 2.553zM23.287 8.218h-8.935l1.432-4.3A2.553 2.553 0 0013.362.559h-.287L6.693 7.5v17.312h14.04l4.994-10.973.113-.515V10.77a2.553 2.553 0 00-2.553-2.553z"
      ></path>
    </svg>
  );
}




export default SelectAnswerCard
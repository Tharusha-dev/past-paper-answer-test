import {useState,useEffect} from 'react'
import {doc,collection,getDocs,getDoc, query, where } from 'firebase/firestore'
import {app} from '../firebase-config'
import {getStorage,ref,getDownloadURL} from 'firebase/storage'
import QuestionAnswerView from './QuestionAnswerView'
import {styles} from '../styles/select_answer_card.module.css'



const firebaseStorage = getStorage(app)

function SelectAnswerCard(props) {

  const [docs,setDocs] = useState([])
  const [imageUrl,setImageUrl] = useState('')
  const [imageUrl2,setImageUrl2] = useState([])
  const [answerClicked,setAnswerClicked] = useState(0)
  const [isAnswerViewOpen,setAnswerViewOpen] = useState(false)
  // let imageUrl

  let tesImg;

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

    docs.forEach((doc,index)=>{
      console.log('done chane')
  
      getDownloadURL(ref(firebaseStorage,doc.data()['answer_image'])).then((downUrl)=>{
        tesImg = downUrl
        imageUrl2[index] = downUrl
        setImageUrl2([...imageUrl2])
        // console.log(tesImg)
    
      })
    })


  }  



  useEffect(()=>{
    getAnswers()

  },[])


  // useEffect(()=>{
  //   setImageUrl(tesImg)
  //   console.log('changed')
  //   console.log(tesImg)
  // },[tesImg])





  return (
   <>
    <div style={{position:'absolute',backgroundColor:'rgba(232, 232, 232, 1)',display:'flex',overflow:'scroll',width:'100vw'}}>


    {imageUrl2.map((image,index)=>{
      // console.log('rendered')
      return <div onClick={()=>{setAnswerViewOpen(true);setAnswerClicked(index)}} key={index} style={{margin:'1vw',padding:'0.8em',backgroundColor:'white',borderRadius:'1em'}}>
      <img style={{height:'30vw',borderRadius:'1em'}} src={image}></img>
      <div style={{position:'absolute',bottom:'2em',fontSize:'1.8em',display:'flex',color:'white',width:'max-content'}}>
      <span>{`${docs[index].data()['user_info']['name']}'s answer`}</span>
      <div style={{marginLeft:'30%'}}>
      <LikeIcon />
      
      <span>{docs[index].data()['like_count']}</span>
      </div>

      </div>
      </div>
    })}

      

    </div>
    {isAnswerViewOpen ? <div style={{position:'absolute'}}><QuestionAnswerView info={docs[answerClicked]} imageUrl={imageUrl2[answerClicked]}/></div> : <span></span>}
    </>

    
    
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
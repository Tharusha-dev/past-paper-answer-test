import { useRouter } from "next/router";

import {app, db} from '../../firebase-config'
import {getStorage,ref,getDownloadURL , list, listAll} from 'firebase/storage'
import {doc,collection,getDocs,getDoc, query, where} from 'firebase/firestore'

import React, { useState , useEffect } from 'react'
import styles from '../../styles/PaperView.module.css'
import SelectAnswerCard from "../../components/SelectAnswerCard";
import QuestionAnswerView from '../../components/QuestionAnswerView'


console.log("lets see")

function openAnswerView(){
  setAnswerCardOpen(false)
  setAnswerViewOpen(true)
}


function PaperView() {

  let tempQuestionImages = []
  let answersLocation
  // let questionImages = []


  const [questionImages,setQuestionImages] = useState([])
  const [questionImages2,setQuestionImages2] = useState([])
  const [isLoading,setLoading] = useState(true)
  const [testList,setTestList] = useState([1,2,3])

  const [isAnswerCardOpen,setAnswerCardOpen] = useState(false)
  const [isAnswerViewOpen,setAnswerViewOpen] = useState(false)

  const [answerSelected,setAnswerSelected] = useState(0)

  const [isViewPaperButton,setViewPaperButton] = useState(true)
  let querySnapshot


    
    const router = useRouter()
    // const {paper} = router.query
    const paper = router.query['meta_name']
    let testPa = router.query['paper']
    if (typeof testPa !== 'undefined'){
      testPa = testPa.replaceAll('-','/')
      answersLocation = collection(db,`${testPa}/answers`)
      console.log(testPa)
    }
    
    const teee = router.query['meta_name']

    const firebaseStorage = getStorage(app)
    const storageFolder = ref(firebaseStorage,`/papers/${paper}`)
    
    console.log(testPa)

    async function getImages(){

      console.log("refres")

    const result = await (await listAll(storageFolder)).items

      console.log(result[0].fullPath)

      result.forEach((url,index)=>{
        // console.log(url.fullPath)
        getDownloadURL(ref(firebaseStorage,url.fullPath)).then((downUrl)=>{
          // console.log(downUrl)
          let num = downUrl.split('=')[0].split("_")
          num = parseInt(num[num.length-1].replace('.png?alt',''))
          // questionImages2[]
          questionImages2[questionImages2.length] = num
          questionImages[index] = downUrl

          setQuestionImages([...questionImages])
          setQuestionImages2([...questionImages2])
          
          // setQuestionImages([...questionImages])

        })
        // setLoading(false)

      }) 




      setTestList([5,6,7])


      const mapped = questionImages.map((image,i)=>({image:questionImages2[i]}))
      const merged = questionImages.map((question, i) => ({question, 'answer' : questionImages2[i]}));
      console.log(questionImages)




  }


  function sort(array){
    let paper_ = "temp" 
    let numList = [1,2,3]

    numList = array.length

    console.log(numList)
    console.log(`is ${array.length}` )
  }




    return (
    <div  style={{display:'grid',placeItems:'center',height:'100vh'}}>

      
       {isViewPaperButton ? <button style={{height:'10vw',width:'10vw'}} onClick={()=>{getImages();console.log(questionImages);setViewPaperButton(false)}}>View Paper</button> : <></>}
       {questionImages.map((url,index)=>{return <div key={index} style={{margin:'1em',borderRadius:'1em',border:'0.2em solid rgba(135, 181, 255, 1)'}}><img onClick={async ()=>{console.log(questionImages2[index])
       setAnswerCardOpen(true)
       setAnswerSelected(index)
       console.log(answerSelected)

 

       }} style={{'marginTop':'2vw'}} key={index} src={url}></img></div>}) }
      {/* {console.log(answersLocation)} */}
      {isAnswerCardOpen ? <SelectAnswerCard viewOpen={setAnswerViewOpen} answerLoc={answersLocation} questionNum = {answerSelected}/> : <></>}

      {/* {isAnswerViewOpen ? <QuestionAnswerView/> : <span>none</span>} */}

    </div>
    
  )
}

export default PaperView





// gs://pastpaperhelp-test.appspot.com/papers/2019_gce_al_physics/2019_gce_al_physics_1.png
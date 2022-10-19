import { useRouter } from "next/router";

import {app, db} from '../../firebase-config'
import {getStorage,ref,getDownloadURL , list} from 'firebase/storage'
import {doc,collection,getDocs,getDoc, query, where} from 'firebase/firestore'

import React, { useState , useEffect } from 'react'
import styles from '../../styles/PaperView.module.css'
import SelectAnswerCard from "../../components/SelectAnswerCard";
console.log("lets see")



function PaperView() {

  let tempQuestionImages = []
  let answersLocation
  // let questionImages = []


  const [questionImages,setQuestionImages] = useState([])
  const [questionImages2,setQuestionImages2] = useState([])
  const [isLoading,setLoading] = useState(true)
  const [testList,setTestList] = useState([1,2,3])
  const [isAnswerCardOpen,setAnswerCardOpen] = useState(false)
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

    const result = await (await list(storageFolder, {maxResults: 10})).items

      console.log(result[0].fullPath)

      result.forEach((url)=>{
        // console.log(url.fullPath)
        getDownloadURL(ref(firebaseStorage,url.fullPath)).then((downUrl)=>{
          // console.log(downUrl)
          let num = downUrl.split('=')[0].split("_")
          num = parseInt(num[num.length-1].replace('.png?alt',''))
          // questionImages2[]
          questionImages2[questionImages2.length] = num
          questionImages[questionImages.length] = downUrl

          setQuestionImages([...questionImages])
          setQuestionImages2([...questionImages2])
          
          // setQuestionImages([...questionImages])

        })
        // setLoading(false)

      }) 
      setTestList([5,6,7])


      // sort(questionImages)
      // console.log(questionImages)
      // console.log(questionImages2)

      const mapped = questionImages.map((image,i)=>({image:questionImages2[i]}))
      const merged = questionImages.map((question, i) => ({question, 'answer' : questionImages2[i]}));
      console.log(questionImages)




  }


  function sort(array){
    let paper_ = "temp" 
    let numList = [1,2,3]
    // array.forEach((result)=>{
    //   // paper_ = result.fullPath.split('?')[0].split('_')
    //   // paper_ = parseInt(paper_[paper_.length-1].replace('.png',''))
    //   paper_ = result
      
    //   numList.push(paper_)
    
    // })

    numList = array.length

    console.log(numList)
    console.log(`is ${array.length}` )
  }


    
    
    // console.log('++++++++++++++++++++++++++++++++++++')
    // console.log(questionImages)
    // console.log('++++++++++++++++++++++++++++++++++++')

    // useEffect(()=>{setQuestionImages([...questionImages])},[isLoading]) 

    return (
    <div onClick={()=>{
      if(isAnswerCardOpen){
        setAnswerCardOpen(false)
      }
    }} style={{display:'grid',placeItems:'center',height:'100vh'}}>

      
       {isViewPaperButton ? <button style={{height:'10vw',width:'10vw'}} onClick={()=>{getImages();console.log(questionImages);setViewPaperButton(false)}}>View Paper</button> : <></>}
       {questionImages.map((url,index)=>{return <div key={index} style={{margin:'1em',borderRadius:'1em',border:'0.2em solid rgba(135, 181, 255, 1)'}}><img onClick={async ()=>{console.log(questionImages2[index])
       setAnswerCardOpen(true)

      //  querySnapshot.forEach((doc) => {
      //    // doc.data() is never undefined for query doc snapshots
      //    console.log(doc.id, " => ", doc.data());
      //  });

       }} style={{'marginTop':'2vw'}} key={index} src={url}></img></div>}) }
      {/* {console.log(answersLocation)} */}
      {isAnswerCardOpen ? <SelectAnswerCard answerLoc={answersLocation}/> : <></>}

    </div>
    
  )
}

export default PaperView





// gs://pastpaperhelp-test.appspot.com/papers/2019_gce_al_physics/2019_gce_al_physics_1.png
import {useState,useCallback, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../styles/upload_answer.module.css'
import Dropdownfilter from '../components/DropDownFilter'

import { db,app } from '../firebase-config';
import {collection,addDoc,getDocs} from 'firebase/firestore'
import { getStorage,ref,uploadBytes } from 'firebase/storage';
import {GoogleAuthProvider , getAuth , signInWithPopup} from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'


const firebaseStorage = getStorage(app)
// const answersLocationRed = collection(db)
let fileName;
let examsT;
let paperNamesList = [];
let paperDocs;
let uploadedImagePath;
let answerImage;

const handleImageUpload = (file_) => {
  //Upload Image to Firebase
  //Check if file exists
  console.log(file_.file)
  fileName = uuidv4()

  if (typeof file_ != 'undefined' || file_ !== undefined) {
    console.log(file_)
    uploadedImagePath = `/answers/${fileName}`
    const answersStorageFolder = ref(firebaseStorage,uploadedImagePath)

    // const storageRef = ref(
    //   Client.storage,
    //   `/db-dev/user-metadata/portfolio/images/first-image.jpg`
    // );

    console.log('Process begins');
    uploadBytes(answersStorageFolder, file_, {
      contentType: file_.type,
    }).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    console.log(file_)
  }
};
function Upload_paper() {

    const [examMenuOpen,setExamMenuOpen] = useState(false)
    const [examYearMenuOpeen,setExamYearMenuOpeen] = useState(false)
    const [examNamesMenuOpen,setExamNamesMenuOpeen] = useState(false)


    // const [file,setFile] = useState({})
    const [fileUploade,setFileUploaded] = useState(false)

    const [exams,setExams] = useState([])
    const [years,setYears] = useState([])

    const [examSelected,setExamSelected] = useState(0)
    const [yearSelected,setYearSelected] = useState(0)
    const [paperSelected,setPaperSelected] = useState(0)
    const [questionNumber,setQuestionNumber] = useState(1)

    const authProvider = new GoogleAuthProvider()
    const auth = getAuth();



    // const exams = ['GCE ADCANCED LEVEL','GCE ORDINARY LEVEL','TERM EXAMS']
    // const papersDocsRef = collection(db,`/papers/`)

    // const papersDocsRef = collection(db,`papers`)
    const collectionRef = collection(db,'papers')



    async function getPapers(){
      console.log("runned")
      examsT = await (await getDocs(collectionRef)).docs
      console.log(examsT[0].data().name)
      // examsT.map(exam => exam.data().name)
      // setExams(examsT)
      examsT.forEach((exam)=>{
        exams[exams.length] = exam.data().name
        setExams([...exams])
        console.log(exams)
      })

      // console.log(exams[0])

    
    }


    useEffect(()=>{
      getPapers()
    },[])

    



    const onDrop = useCallback((acceptedFiles, fileRejections) => {
      //Check if file type is image
      //Check if file size < 5MB
      //Upload
      // if (fileRejections.length > 0) {
      //   setError(true);
      // } else setError(false);
      if (acceptedFiles.length > 0) {
        answerImage = acceptedFiles[0];
        console.log(answerImage);
        // setFile({
        //   file:file,
        //   preview: URL.createObjectURL(file),
        // });
        setFileUploaded(true);
      // handleImageUpload(answerImage)

      }
    }, []);


    async function getPaperNames(){
      const paperNamesRef = collection(db,`/papers/${examsT[examSelected].id}/${examsT[examSelected].data()['years'][yearSelected]}`)
      // const paperNamesRef = collection(db,`/papers/GCE_AL/2019`)

      
      paperDocs = await (await getDocs(paperNamesRef)).docs
      paperDocs.forEach((paper)=>{paperNamesList.push(paper.data()['display_name'])})

      console.log(`papers/${examsT[examSelected].id}/${examsT[examSelected].data()['years'][yearSelected]}`)
      console.log(paperNamesList)
    
    }


    function signInWithGoogle(){
      signInWithPopup(auth, authProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user)

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);


    // ...
  }
  
  
  
  );

    }

    function finalUploadPaper(){
      handleImageUpload(answerImage)

      const docRef = addDoc(collection(db,`papers/${examsT[examSelected].id}/${examsT[examSelected].data()['years'][yearSelected]}/${paperDocs[paperSelected].id}/answers`),
      {
        
        'answer_image':uploadedImagePath,
        'question':parseInt(questionNumber),
        'like_count':0,
        'user_info':{'name':auth.currentUser.displayName,'profile_pic':auth.currentUser.photoURL}
      
      
    
      })

    }

    
    



    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // async function GetData(){
 
    //     const data = await getDocs(collectionRef);
    //     const data_doc = await getDoc(docRef);
      
    //     test_names = await getDocs(collectionRef)
    //     // const gghg = await getDocs(collectionRef)
    //     // gghg.docs.forEach((doc)=>{doc.id})
      
        
    //     test_names.docs.forEach((doc)=>{test_names_list.push(doc.data()['name'])})
    //     console.log("runned")
    //     // console.log(test_names_list)
      
    //     // return test_names_list
      
    //   }
  return (
    <div className={styles.main}>
        <h1 className={styles.main_heading}>Upload Answers</h1>


        <button className={styles.submit_button} onClick={()=>{auth.signOut();signInWithGoogle()}}>Sign In</button>


        <span style={{fontSize:'2em',marginLeft:'1em'}}>Select the paper you want to answer</span>
        <div className={styles.select_exam_n_year}>
        <div>
        <div className={styles.drop_down}>
                    <span>Select Exam</span>
                    <DropDownIcon click={setExamMenuOpen} bool={examMenuOpen}/>

        </div>
        {examMenuOpen ? <Dropdownfilter list={exams} click={setExamSelected}/> : <></>}
        </div>

        <div>
        <div className={styles.drop_down}>
        
          <span>2021</span>
          <DropDownIcon click={setExamYearMenuOpeen} bool={examYearMenuOpeen}/>
          {/* <button onClick={()=>{setExamYearMenuOpeen(true)}}>test</button> */}
        
        </div>
        {examYearMenuOpeen ? <div style={{backgroundColor:"red"}}><Dropdownfilter list={examsT[examSelected].data()['years']} click={setYearSelected}/></div> : <></>}
        </div>

        </div>

        <button className={styles.submit_button} onClick={()=>{getPaperNames()}}>Submit</button>
        <div className={styles.select_exam_n_year} styles={{paddingTop:'0'}}>
        <div className={styles.drop_down}>
        
        <span style={{margin:'0',paddingTop:'0'}}>Select Paper</span>
        <DropDownIcon click={setExamNamesMenuOpeen} bool={examNamesMenuOpen}/>
        {/* <button onClick={()=>{setExamYearMenuOpeen(true)}}>test</button> */}
      
      </div>
      </div>
      {examNamesMenuOpen ? <Dropdownfilter list={paperNamesList} click={setPaperSelected}/> : <></>}  

      <span style={{marginLeft:'1.1em',fontSize:'1.5em'}}>Enter the answer number</span>
      <input style={{width:'max-content',marginLeft:'2em'}} onChange={(e)=>{setQuestionNumber(e.target.value)}} type="number" ></input>

      {()=>{
        if(auth.currentUser != null){
          return auth.currentUser.displayName
        }
      }}

      {/* <button onClick={()=>{console.log(auth.currentUser)}}></button>
      <button onClick={()=>{auth.signOut()}}>out</button> */}



                

                <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here</p> :
          <p className={styles.submit_button} style={{cursor:'pointer',backgroundColor:'rgba(231, 231, 231, 1)',width:'max-content',padding:'0.3em'}}>Drag n drop some files here or click to select files</p>
      }
    </div>

    <button className={styles.submit_button} onClick={()=>{finalUploadPaper()}}>Submit</button>

    </div>
    
  )
}
async function getPaperYears(){
  const yearsList = examsT[examSelected].data()['years']


  setYears(yearsList)
  console.log(yearsList)
  return yearsList
}



function DropDownIcon(props) {
    return (
      
      <svg style={{cursor:'pointer'}} onClick={()=>{props.click(!props.bool)}}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <circle cx="9" cy="9" r="9" fill="#D9D9D9"></circle>
        <path
          stroke="#0048BA"
          strokeLinecap="round"
          strokeWidth="1.862"
          d="M3.104 6.828l5.586 5.586 5.586-5.586"
        ></path>
      </svg>
    );
  }

export default Upload_paper
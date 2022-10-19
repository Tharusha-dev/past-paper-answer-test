import {useState,useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../styles/upload_paper.module.css'
import Dropdownfilter from '../components/DropDownFilter'

import { db,app } from '../firebase-config';
import {doc,collection,getDocs,getDoc} from 'firebase/firestore'
import { getStorage,ref } from 'firebase/storage';


const firebaseStorage = getStorage(app)
const answersStorageFolder = ref(firebaseStorage,'/answers')

function Upload_paper() {
    const [examMenuOpen,setExamMenuOpen] = useState(false)
    const [examYearMenuOpen,setExamYearMenuOpen] = useState(false)
    


    const exams = ['GCE ADCANCED LEVEL','GCE ORDINARY LEVEL','TERM EXAMS']
    const years = ['2019','2022']

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
      
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              const binaryStr = reader.result
              
              let data  = {} 
              console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
          })
      }, [])
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
        <span>Select the paper you want to answer</span>


        <div className={styles.drop_down}>
                    <span>GCE Advanced Level</span>
                    <DropDownIcon click={setExamMenuOpen} bool={examMenuOpen}/>

                </div>
                {examMenuOpen ? <Dropdownfilter list={exams}/> : <></>}
                <div className={styles.drop_down}>
                    <span>2021</span>
                    <DropDownIcon click={setExamYearMenuOpen} bool={examYearMenuOpen}/>
                {examYearMenuOpen ? <Dropdownfilter list={years} /> : <></>}



                </div>

                <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here</p> :
          <p>Drag n drop some files here or click to select files</p>
      }
    </div>
    </div>
    
  )
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
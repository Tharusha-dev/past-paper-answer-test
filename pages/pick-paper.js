import Head from 'next/head'
import  styles from '../styles/PickPaper.module.css'
import { useState } from 'react';


import { db } from '../firebase-config';
import {doc,collection,getDocs,getDoc} from 'firebase/firestore'


import Dropdownfilter from '../components/DropDownFilter'
import PickPaper_PaperCard from '../components/PickPaper_PaperCard';

const test_names_list = []
let test_names = []
let papeers = []
const test_list = [1,2,3]
// let paper_titles = [2]
// let paper_icons = [2]

const collectionRef = collection(db,'papers')
const docRef = doc(db,'/papers/GCE_AL/2022/lRuNqfjF2babmteANtLs')


GetData()

export default function PickPaper() {

  const [examMenuOpen,setExamMenuOpen] = useState(false)
  const [examYearMenuOpen,setExamYearMenuOpen] = useState(false)
  const [examSelected,setExamsSelected] = useState(0)
  const [yearSelected,setYearSelected] = useState(0)
  const [paperTitles,Setpapertitle] = useState([])
  const [paperIcons,setPaperIcons] = useState([])
  // const [papers,setPapers] = useState([])
  // const [paper]

  async function getPapers(year,exam){
    // Setpapertitle([])
    // paperIcons = []
    const papersDocsRef = collection(db,`/papers/${exam}/${year}`)
    
    papeers = await (await getDocs(papersDocsRef)).docs
    console.log("logging papeers.docs **********************")
    console.log(papeers)
    console.log("*******************************************")

    papeers.forEach((doc,index)=>{

      // Setpapertitle()
      console.log("thossss")
      console.log(paperTitles)
      console.log("thossss")

      let newArray = [...paperTitles,doc.data()['display_name']]
      //TODO : except for titles , icons , meta_data seperately implement a one object for all state 
      paperTitles[paperTitles.length] = doc.data()['display_name']
      
      
      Setpapertitle([...paperTitles])
      paperIcons[paperIcons.length] = doc.data()['meta_data']['logo']
      setPaperIcons([...paperIcons])

      // if (paperTitles.length == 0) {Setpapertitle([...paperTitles])}
      // else {console.log(paperTitles.length)}
      

      // Setpapertitle([...paper_titles,doc.data()['display_name']]);console.log("******************** for each********************");console.log("getPapers Runned " + doc.data()['display_name']+"length of paper titles - " + paper_titles.length);console.log(paper_titles);console.log("******************** for each********************")
    })

    // papeers.forEach((doc)=>{paper_icons.push(doc.data()['meta_data']['logo'])})

    // console.log(paper_titles)
    // console.log('++++++++++++++++ get data ++++++++++++++++++++++++++')
    // console.log(await (await getDocs(papersDocsRef)).docs[0].data())
    // console.log(await (await getDocs(papersDocsRef)).docs[1].data())
    // console.log('++++++++++++++++ get data ++++++++++++++++++++++++++')


    // setPapers()
    
  
  
  }

  return (
    <div className={styles.pick_paper}>
        <div className={styles.sorting_menu}>
            <span style={{fontSize:"1.49em",fontWeight:"600",color:"var(--primary-gray)"}}>Sort by</span>


            <div className={styles.sorting_menu_exam}>
                <div className={styles.sorting_menu_selector}>
                    
                    Exam
                </div>
                <div className={styles.drop_down}>
                    <span>GCE Advanced Level</span>
                    <DropDownIcon click={setExamMenuOpen} bool={examMenuOpen}/>

                </div>
                {examMenuOpen ? <Dropdownfilter list={test_names_list} click={setExamsSelected}/> : <></>}

                <div className={styles.drop_down}>
                    <span>2021</span>
                    <DropDownIcon click={setExamYearMenuOpen} bool={examYearMenuOpen}/>
                {examYearMenuOpen ? <Dropdownfilter list={
                //   ()=>{
                //   // switch(examSelected){
                //   //   case 0 : 
                //   //     return ["one","one"] 
                //   //     break
                //   //   case 1 : 
                //   //     return ["two","two"]; 
                //   //     break
                //   //   case 2:
                //   //     return ["three","three"];
                //   //     break
                //   //   default: return ["none","none"]
                //   // }
                //   return [1,2,3]
                // }
                ttttt(examSelected)
                }  click={setYearSelected}/> : <></>}



                </div>
            </div>


            <div className={styles.sorting_menu_school}>
                <div className={styles.sorting_menu_selector}>
                       
                        <span style={{marginTop:'5em'}}>School/Institue</span>
                </div>
                <div className={styles.drop_down}>
                        <span>test</span>
                    <DropDownIcon/>
                </div>
                {/* <button onClick={()=>{GetData()}}></button> */}
                
            </div>

            {/* <Dropdownfilter/> */}
            <div style={{marginTop:'2vw',padding:'0.3em',backgroundColor:'rgba(251, 252, 255, 1)',width:'max-content',borderRadius:'0.4em',fontSize:'1.3em',cursor:'pointer'}} onClick={()=>{
              console.log(`year : ${test_names.docs[examSelected].data()['years'][yearSelected]} : exam ${test_names.docs[examSelected].id}`);
              getPapers(test_names.docs[examSelected].data()['years'][yearSelected],test_names.docs[examSelected].id);
              console.log(paperTitles)

              
              }}>Submit</div>
            {/* /papers/GCE_AL/2019 */}

        </div>
    
        {paperTitles.map((paper_title,index)=>{return <div key={index}><PickPaper_PaperCard  index={index} title={paper_title} full_path={`/papers/${test_names.docs[examSelected].id}/${test_names.docs[examSelected].data()['years'][yearSelected]}/${papeers[index].id}`} icon={paperIcons[index]} meta_name={papeers[index].data()['meta_data']['meta_name']} num_of_questions={papeers[index].data()['meta_data']['meta_name'] }/></div>})}
        
    </div>
  
    
    
  )

 }
 async function GetData(){
 
  const data = await getDocs(collectionRef);
  const data_doc = await getDoc(docRef);

  test_names = await getDocs(collectionRef)
  // const gghg = await getDocs(collectionRef)
  // gghg.docs.forEach((doc)=>{doc.id})

  
  test_names.docs.forEach((doc)=>{test_names_list.push(doc.data()['name'])})
  console.log("runned")
  // console.log(test_names_list)

  // return test_names_list

}

function ttttt(e){
  

  return test_names.docs[e].data()['years']

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


import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import FindAnswersImage1 from '../public/home_find_answers.png'
import BuildYourRanking from '../public/build_your_ranking'
import HomeTopRightSvg from '../public/home_top_right_svg'
import HomeShareKnowledgeSvg from '../public/home_share_knowledge_svg'


export default function Home() {
  return (
    <>
    <div className={styles.home}>

      <div className={styles.top}>
      <div className={styles.top_left}>
        <span id={styles["home-top-span-study"]}>Study</span>
        <span style={{ marginTop: '-0.3em',}} >Help</span>
        <span id={styles["home-top-span-share-and"]}>Share and learn</span>

      </div>
      <div className={styles.top_right}>
        
        <HomeTopRightSvg />
        
        
      </div>

    
      </div>

      <div className={styles.top_three_buttons}>
        <Link href='/pick-paper'>
        <div className={styles.top_three_button}>
          Find Papers
        </div>
        </Link>
        <Link href='/upload-answer'>
        <div className={styles.top_three_button}>
          Submit answers
        </div>
        </Link>
      </div>

    <div className={styles.share_knowledge}>
      <div className={styles.share_knowledge_svg}>
        <HomeShareKnowledgeSvg />
      </div>

      <span>Share your knowledge with the world</span>
    </div>

    <div className={styles.find_answers}>
      <span>Find comprehensive answers from fellow learners</span>
      <FindAnswersImage />
    </div>

    {/* <div className={styles.build_your_rankings}>
      <BuildYourRanking />
      <span>Build up your ranking by answering questions</span>
    </div> */}

    </div>
    <div className={styles.footer}><h2>Made by Tharusha Jayasooriya</h2></div>

    </>

  )
}

const FindAnswersImage = () => {
  return (
    <Image
      src={FindAnswersImage1}
      alt="Find answers"
      // width="auto"
      // height="300px"
      layout="responsive" 
  />
  )

 }


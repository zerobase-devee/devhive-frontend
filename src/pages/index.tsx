import styles from '@/styles/pages/home.module.css'
import MainProjectList from '@/components/main/contents/MainProjectList'
import MainRankList from '@/components/main/contents/MainRankList'
import Carousel from '@/components/main/carousel/Carousel'
import { withAuthUser } from '@/utils/withAuthUser'
import NicknameChangeInfoModal from '@/components/auth/sns/NicknameChangeInfoModal'
import useNicknameChangeModal from '@/hooks/useNicknameChangeModal'

const Home = () => {
  const { openModal } = useNicknameChangeModal()

  return (
    <>
      {openModal && <NicknameChangeInfoModal />}
      <div className={styles.container}>
        <Carousel />
        <div className={styles.inner}>
          <div className={styles.contentContainer}>
            <h2 className={styles.title}>프로젝트</h2>
            <MainProjectList />
          </div>
          <div className={styles.contentContainer}>
            <h2 className={styles.title}>랭킹</h2>
            <MainRankList />
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withAuthUser()

export default Home

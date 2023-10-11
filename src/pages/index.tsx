import styles from '@/styles/pages/home.module.css'
import MainProjectList from '@/components/main/contents/MainProjectList'
import MainRankList from '@/components/main/contents/MainRankList'
import Carousel from '@/components/main/carousel/Carousel'
import { withAuthUser } from '@/utils/withAuthUser'
import NicknameChangeInfoModal from '@/components/auth/sns/NicknameChangeInfoModal'
import useNicknameChangeModal from '@/hooks/useNicknameChangeModal'

const Home = () => {
  const { openModal } = useNicknameChangeModal()
  const mainContent = [
    {
      title: '프로젝트',
      content: <MainProjectList />,
    },
    {
      title: '랭킹',
      content: <MainRankList />,
    },
  ]

  return (
    <>
      {openModal && <NicknameChangeInfoModal />}
      <div className={styles.container}>
        <Carousel />
        <div className={styles.inner}>
          {mainContent.map((item) => (
            <div key={item.title} className={styles.contentContainer}>
              <h2 className={styles.title}>{item.title}</h2>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withAuthUser()

export default Home

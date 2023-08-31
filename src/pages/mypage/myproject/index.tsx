import styles from '@/styles/pages/myproject.module.css'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import Title from '@/components/common/title/Title'
import dynamic from 'next/dynamic'

const ParticipationProjectList = dynamic(
  () => import('@/components/mypage/myproject/list/ParticipationProjectList'),
  { ssr: false },
)
const WriteProjectList = dynamic(
  () => import('@/components/mypage/myproject/list/WriteProjectList'),
  { ssr: false },
)

const Myproject = () => {
  return (
    <MypageLayout>
      <Title title="내 프로젝트" />
      <div className={styles.container}>
        <section>
          <p className={styles.title}>참여한 프로젝트</p>
          <ParticipationProjectList />
        </section>
        <section>
          <p className={styles.title}>생성한 프로젝트</p>
          <WriteProjectList />
        </section>
      </div>
    </MypageLayout>
  )
}

export default Myproject

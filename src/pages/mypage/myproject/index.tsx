import styles from '@/styles/pages/myproject.module.css'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import Title from '@/components/common/title/Title'
import ParticipationProjectList from '@/components/mypage/myproject/list/ParticipationProjectList'
import WriteProjectList from '@/components/mypage/myproject/list/WriteProjectList'
import useRequireLogin from '@/hooks/useRequireLogin'

const Myproject = () => {
  useRequireLogin()

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

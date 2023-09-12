import styles from '@/styles/pages/myprofile.module.css'
import Title from '@/components/common/title/Title'
import MypageLayout from '@/components/mypage/common/mypageLayout/MypageLayout'
import AdvancedProfile from '@/components/mypage/myprofile/advancedProfile/AdvancedProfile'
import BasicProfile from '@/components/mypage/myprofile/basicProfile/BasicProfile'
import useRequireLogin from '@/hooks/useRequireLogin'
import { withAuthUser } from '@/utils/withAuthUser'

const MypageProfile = () => {
  useRequireLogin()

  return (
    <MypageLayout>
      <Title title="내 프로필" />
      <div className={styles.container}>
        <BasicProfile />
        <AdvancedProfile />
      </div>
    </MypageLayout>
  )
}

export const getServerSideProps = withAuthUser()

export default MypageProfile

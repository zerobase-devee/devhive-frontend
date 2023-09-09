import styles from './applicantUserModal.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import Button from '@/components/common/button/Button'
import { FiUserX } from 'react-icons/fi'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { useQuery } from 'react-query'
import { ProjectApplyListDataType } from '@/types/users/myprojectDataType'
import Loading from '@/components/common/loading/Loading'
import useModal from '@/hooks/useModal'
import useProjectApply from '@/hooks/queries/useProjectApply'
import { useRouter } from 'next/router'

const ApplicantUserModal = () => {
  const router = useRouter()
  const id = Number(router.query.id)

  const { data, error, isLoading } = useQuery<ProjectApplyListDataType[]>(
    REACT_QUERY_KEY.projectApplyList,
    () => fetchAccessData(`/projects/${id}/application`),
  )
  const { acceptUser, rejectUser } = useProjectApply()
  const { handleCloseModal } = useModal()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className={styles.list}>
        <div className={styles.null}>에러발생</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={styles.list}>
        <div className={styles.null}>
          <FiUserX />
          아직 신청한 사람이 없어요.
        </div>
      </div>
    )
  }

  const handleApprove = async (user: ProjectApplyListDataType) => {
    try {
      await acceptUser.mutateAsync(user.applicationId)
    } catch (error) {
      console.error('에러발생: ', error)
    }
  }

  const handleReject = async (user: ProjectApplyListDataType) => {
    try {
      await rejectUser.mutateAsync(user.applicationId)
    } catch (error) {
      console.error('에러발생: ', error)
    }
  }

  return data.length === 0 ? (
    <div className={styles.list}>
      <div className={styles.null}>
        <FiUserX />
        아직 신청한 사람이 없어요.
      </div>
    </div>
  ) : (
    <div className={styles.list}>
      {data.map((item) => (
        <div className={styles.item} key={item.userId}>
          <div className={styles.userArea}>
            <div className={styles.userImg}>
              <UserProfileImg
                userProfile={item.profileImage}
                width={32}
                height={32}
              />
            </div>
            <p className={styles.nickname}>{item.nickName}</p>
          </div>
          <LinkButton
            gray
            href={`/profile/${item.userId}`}
            onClick={handleCloseModal}
          >
            프로필
          </LinkButton>
          <Button onClick={() => handleApprove(item)} fill type="button">
            승인
          </Button>
          <Button onClick={() => handleReject(item)} type="button">
            거절
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ApplicantUserModal

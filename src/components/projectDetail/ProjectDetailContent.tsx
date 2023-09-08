import styles from './projectDetailContent.module.css'
import Custom404 from '@/pages/404'
import ProjectBadge from '../common/projectBadge/ProjectBadge'
import BookmarkButton from '../common/bookmarkButton/bookmarkButton'
import ProjectUser from './projectUser/ProjectUser'
import { calculateDday, formatDatePost } from '@/utils/formatDate'
import { BiTime } from 'react-icons/bi'
import { GrView } from 'react-icons/gr'
import {
  isRegion,
  translateDevelopmentToKorean,
  translateRecruitmentToKorean,
  translateStatusToKorean,
} from '@/utils/projectDataToKorean'
import TechStackCard from '../techStack/techStackCard/TechStackCard'
import TextEditorView from './textEditorView/TextEditorView'
import LinkButton from '../common/button/LinkButton'
import Button from '../common/button/Button'
import useModal from '@/hooks/useModal'
import InfoModal from '../common/modal/InfoModal'
import { fetchData } from '@/utils/fetchData'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { ProjectDetailDataType } from '@/types/project/projectDataType'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import Loading from '../common/loading/Loading'
import { loginState } from '@/recoil/loginState'
import { useRecoilValue } from 'recoil'
import { deleteProject } from '@/apis/project/projects'
import { useRouter } from 'next/navigation'
import CommentList from './comment/CommentList'

const ProjectDetailContent = ({ projectId }: { projectId: number }) => {
  const { openModal, handleCloseModal, handleOpenModal } = useModal()
  const isLogin = useRecoilValue(loginState)
  const router = useRouter()

  const { data, error, isLoading } = useQuery<ProjectDetailDataType>(
    REACT_QUERY_KEY.projectDetail,
    () =>
      isLogin
        ? fetchAccessData(`/projects/${projectId}`)
        : fetchData(`/projects/${projectId}`),
  )

  const handleDeleteProject = async () => {
    handleCloseModal()
    router.push('/project')
    await deleteProject(projectId)
  }

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Custom404 />
  }

  if (error) {
    return <p>에러 발생</p>
  }

  return (
    <>
      {openModal && (
        <InfoModal
          doubleButton
          buttonText="삭제"
          buttonText2="취소"
          onClose={handleCloseModal}
          onClick={handleDeleteProject}
        >
          게시글을 삭제할까요?
        </InfoModal>
      )}
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.topArea}>
            <div className={styles.projectInfo}>
              <ProjectBadge
                red={data.status !== 'COMPLETE'}
                green={data.status === 'COMPLETE'}
              >
                {translateStatusToKorean(data.status)}
              </ProjectBadge>
              <h2 className={styles.title}>{data.projectTitle}</h2>
              <div>
                <div className={styles.time}>
                  <BiTime />
                  <p>
                    {data.modifiedDate !== null
                      ? formatDatePost(data.modifiedDate)
                      : formatDatePost(data.createDate)}
                  </p>
                </div>
                <div className={styles.viewCount}>
                  <GrView />
                  <p>{data.viewCount}</p>
                </div>
              </div>
            </div>
            <BookmarkButton projectId={projectId} active={data.isBookmark} />
          </div>
          <div className={styles.projectDetailInfoArea}>
            <p className={styles.infoTitle}>모집분야</p>
            <ProjectBadge>
              {translateDevelopmentToKorean(data.developmentType)}
            </ProjectBadge>
            <p className={styles.infoTitle}>모임형태</p>
            <ProjectBadge green>
              {translateRecruitmentToKorean(data.recruitmentType)}
              {isRegion(data.region)}
            </ProjectBadge>
            <p className={styles.infoTitle}>모집인원</p>
            <p className={styles.info}>{data.recruitmentNum}명</p>
            <p className={styles.infoTitle}>모집마감일</p>
            <p className={styles.info}>{calculateDday(data.deadline)}</p>
            <p className={styles.infoTitle}>프로젝트명</p>
            <p className={styles.info}>{data.projectName}</p>
            <p className={styles.infoTitle}>기술스택</p>
            <div>
              {data.techStacks.map((item) => (
                <TechStackCard
                  key={item.id}
                  name={item.name}
                  imageUrl={item.image}
                />
              ))}
            </div>
          </div>
          <TextEditorView content={data.content} />
          <div className={styles.buttonArea}>
            {data.userInfo &&
              data.userInfo.userId === data.writerInfo.userId && (
                <>
                  <Button
                    onClick={handleOpenModal}
                    red
                    disabled={
                      data.status === 'RECRUITMENT_COMPLETE' ||
                      data.status === 'COMPLETE'
                    }
                  >
                    삭제하기
                  </Button>
                  <LinkButton href={`/project/${projectId}/modify`}>
                    수정하기
                  </LinkButton>
                </>
              )}
            <LinkButton href={'/project'} fill>
              목록으로
            </LinkButton>
          </div>
          {/* <CommentList
            loginUser={data.userInfo}
            writeUserId={data.writeInfo.userId}
            comments={data.commentAndReply}
          /> */}
        </div>
        <ProjectUser
          loginUser={data.userInfo}
          applyStatus={data.applyStatus}
          writerInfo={data.writerInfo}
          projectMembers={data.projectMembers}
        />
      </div>
    </>
  )
}

export default ProjectDetailContent

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
import { useQueries } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import Loading from '../common/loading/Loading'
import { loginState } from '@/recoil/loginState'
import { useRecoilValue } from 'recoil'
import { deleteProject } from '@/apis/project/projects'
import { useRouter } from 'next/navigation'
import CommentList from './comment/CommentList'
import { CommentDataType } from '@/types/project/commentDataType'

const ProjectDetailContent = ({ projectId }: { projectId: number }) => {
  const { openModal, handleCloseModal, handleOpenModal } = useModal()
  const isLogin = useRecoilValue(loginState)
  const router = useRouter()

  const queries = useQueries([
    {
      queryKey: REACT_QUERY_KEY.projectDetail,
      queryFn: () =>
        isLogin
          ? fetchAccessData(`/projects/${projectId}`)
          : fetchData(`/projects/${projectId}`),
    },
    {
      queryKey: REACT_QUERY_KEY.projectComments,
      queryFn: () => fetchData(`/comments/projects/${projectId}`),
    },
  ])

  const detailData = queries[0].data as ProjectDetailDataType
  const isLoadingDetailData = queries[0].isLoading
  const errorDetailData = queries[0].error

  const commentData = queries[1].data as CommentDataType[]
  const isLoadingCommentData = queries[1].isLoading
  const errorCommentData = queries[1].error

  const handleDeleteProject = async () => {
    handleCloseModal()
    await deleteProject(projectId)
    router.push('/project')
  }

  if (isLoadingDetailData || isLoadingCommentData) {
    return <Loading />
  }

  if (!detailData || !commentData) {
    return <Custom404 />
  }

  if (errorDetailData || errorCommentData) {
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
                red={detailData.status !== 'COMPLETE'}
                green={detailData.status === 'COMPLETE'}
              >
                {translateStatusToKorean(detailData.status)}
              </ProjectBadge>
              <h2 className={styles.title}>{detailData.projectTitle}</h2>
              <div>
                <div className={styles.time}>
                  <BiTime />
                  <p>
                    {detailData.modifiedDate !== null
                      ? formatDatePost(detailData.modifiedDate)
                      : formatDatePost(detailData.createDate)}
                  </p>
                </div>
                <div className={styles.viewCount}>
                  <GrView />
                  <p>{detailData.viewCount}</p>
                </div>
              </div>
            </div>
            <BookmarkButton
              projectId={projectId}
              bookmarkId={detailData.bookmarkId}
              active={detailData.bookmarkId ? true : false}
            />
          </div>
          <div className={styles.projectDetailInfoArea}>
            <p className={styles.infoTitle}>모집분야</p>
            <ProjectBadge>
              {translateDevelopmentToKorean(detailData.developmentType)}
            </ProjectBadge>
            <p className={styles.infoTitle}>모임형태</p>
            <ProjectBadge green>
              {translateRecruitmentToKorean(detailData.recruitmentType)}
              {isRegion(detailData.region)}
            </ProjectBadge>
            <p className={styles.infoTitle}>모집인원</p>
            <p className={styles.info}>{detailData.recruitmentNum}명</p>
            <p className={styles.infoTitle}>모집마감일</p>
            <p className={styles.info}>{calculateDday(detailData.deadline)}</p>
            <p className={styles.infoTitle}>프로젝트명</p>
            <p className={styles.info}>{detailData.projectName}</p>
            <p className={styles.infoTitle}>기술스택</p>
            <div>
              {detailData.techStacks.map((item) => (
                <TechStackCard
                  key={item.id}
                  name={item.name}
                  imageUrl={item.image}
                />
              ))}
            </div>
          </div>
          <TextEditorView content={detailData.content} />
          <div className={styles.buttonArea}>
            {detailData.userInfo &&
              detailData.userInfo.userId === detailData.writerInfo.userId && (
                <>
                  <Button
                    onClick={handleOpenModal}
                    red
                    disabled={detailData.status !== 'RECRUITING'}
                  >
                    삭제하기
                  </Button>
                  <Button
                    disabled={detailData.status === 'COMPLETE'}
                    onClick={() => router.push(`/project/${projectId}/modify`)}
                  >
                    수정하기
                  </Button>
                </>
              )}
            <LinkButton href={'/project'} fill>
              목록으로
            </LinkButton>
          </div>
          <CommentList
            loginUser={detailData.userInfo}
            writeUserId={detailData.writerInfo.userId}
            comments={commentData}
          />
        </div>
        <ProjectUser
          status={detailData.status}
          loginUser={detailData.userInfo}
          applyStatus={detailData.applyStatus}
          writerInfo={detailData.writerInfo}
          projectMembers={detailData.projectMembers}
        />
      </div>
    </>
  )
}

export default ProjectDetailContent

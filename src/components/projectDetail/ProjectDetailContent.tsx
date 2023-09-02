import styles from './projectDetailContent.module.css'
import Custom404 from '@/pages/404'
import { ProjectDetailDataType } from '@/types/projectDataType'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProjectBadge from '../common/projectBadge/ProjectBadge'
import BookmarkButton from '../common/bookmarkButton/bookmarkButton'
import ProjectUser from './projectUser/ProjectUser'
import { calculateDday, formatDatePost } from '@/utils/formatDate'
import { BiTime } from 'react-icons/bi'
import { GrView } from 'react-icons/gr'
import { isRegion } from '@/utils/projectIsRegion'
import TechStackCard from '../techStack/techStackCard/TechStackCard'
import TextEditorView from './textEditorView/TextEditorView'
import LinkButton from '../common/button/LinkButton'
import Button from '../common/button/Button'
import { useRouter } from 'next/navigation'
import useModal from '@/hooks/useModal'
import InfoModal from '../common/modal/InfoModal'
import CommentList from './comment/CommentList'
import { fetchData } from '@/utils/fetchData'

const ProjectDetailContent = ({ projectId }: { projectId: number }) => {
  const router = useRouter()
  const { openModal, handleCloseModal, handleOpenModal } = useModal()
  const [projectData, setProjectData] = useState<ProjectDetailDataType | null>(
    null,
  )

  useEffect(() => {
    fetchData(`/projects/${projectId}`, setProjectData)
  }, [projectId])

  if (!projectData) {
    return <Custom404 />
  }

  const handleDeleteContent = async () => {
    try {
      await axios.delete(`/api/projects/${projectId}`, {
        data: {
          projectId: projectId,
        },
      })
      handleCloseModal()
      setProjectData(null)
      router.push('/project')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {openModal && (
        <InfoModal
          doubleButton
          buttonText="삭제"
          buttonText2="취소"
          onClose={handleCloseModal}
          onClick={handleDeleteContent}
        >
          게시글을 삭제할까요?
        </InfoModal>
      )}
      <div className={styles.container}>
        <div>
          <div className={styles.topArea}>
            <div className={styles.projectInfo}>
              <ProjectBadge
                red={projectData.projectStatus !== '프로젝트완료'}
                green={projectData.projectStatus === '프로젝트완료'}
              >
                {projectData.projectStatus}
              </ProjectBadge>
              <h2 className={styles.title}>{projectData.projectTitle}</h2>
              <div>
                <div className={styles.time}>
                  <BiTime />
                  <p>
                    {projectData.modifiedDate !== null
                      ? formatDatePost(projectData.modifiedDate)
                      : formatDatePost(projectData.createdDate)}
                  </p>
                </div>
                <div className={styles.viewCount}>
                  <GrView />
                  <p>{projectData.viewCount}</p>
                </div>
              </div>
            </div>
            <BookmarkButton active={projectData.bookmark} />
          </div>
          <div className={styles.projectDetailInfoArea}>
            <p className={styles.infoTitle}>모집분야</p>
            <ProjectBadge>{projectData.developmentType}</ProjectBadge>
            <p className={styles.infoTitle}>모임형태</p>
            <ProjectBadge green>
              {projectData.recruitmentType}
              {isRegion(projectData.region)}
            </ProjectBadge>
            <p className={styles.infoTitle}>모집인원</p>
            <p className={styles.info}>{projectData.recruitmemtNum}명</p>
            <p className={styles.infoTitle}>모집마감일</p>
            <p className={styles.info}>{calculateDday(projectData.deadline)}</p>
            <p className={styles.infoTitle}>프로젝트명</p>
            <p className={styles.info}>{projectData.projectName}</p>
            <p className={styles.infoTitle}>기술스택</p>
            <div>
              {projectData.techStacks.map((item) => (
                <TechStackCard
                  key={item.id}
                  name={item.name}
                  imageUrl={item.image}
                />
              ))}
            </div>
          </div>
          <TextEditorView content={projectData.content} />
          <div className={styles.buttonArea}>
            {projectData.loginUser?.userId ===
              projectData.projectWriter.userId && (
              <>
                <Button
                  onClick={handleOpenModal}
                  red
                  disabled={
                    projectData.projectStatus === '프로젝트시작' ||
                    projectData.projectStatus === '프로젝트완료'
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
          <CommentList
            loginUser={projectData.loginUser}
            writeUserId={projectData.projectWriter.userId}
            comments={projectData.commentAndReply}
          />
        </div>
        <ProjectUser
          applyStatus={projectData.applyStatus}
          writeUser={projectData.projectWriter}
          projectMembers={projectData.projectMembers}
        />
      </div>
    </>
  )
}

export default ProjectDetailContent

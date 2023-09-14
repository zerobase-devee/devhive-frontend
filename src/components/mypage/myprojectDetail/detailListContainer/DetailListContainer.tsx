import styles from './detailListContainer.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import ProjectInfo from '../info/ProjectInfo'
import TeamInfo from '../info/TeamInfo'
import { useRouter } from 'next/router'
import Custom404 from '@/pages/404'
import EvaluationInfo from '../info/EvaluationInfo'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { useQueries } from 'react-query'
import {
  MyprojectDetailDataType,
  ProjectVoteDataType,
} from '@/types/users/myprojectDataType'
import Loading from '@/components/common/loading/Loading'
import { translateStatusToKorean } from '@/utils/projectDataToKorean'

const DetailListContainer = () => {
  const router = useRouter()
  const projectId = Number(router.query.id)

  const queries = useQueries([
    {
      queryKey: REACT_QUERY_KEY.userProjectDetail,
      queryFn: () => fetchAccessData(`/users/project/${projectId}`),
    },
    {
      queryKey: REACT_QUERY_KEY.projectVote,
      queryFn: () => fetchAccessData(`/projects/${projectId}/vote`),
    },
  ])

  const projectData = queries[0].data as MyprojectDetailDataType
  const isLoadingProjectData = queries[0].isLoading
  const isErrorProjectData = queries[0].error

  const voteData = queries[1].data as ProjectVoteDataType[]
  const isLoadingVoteData = queries[1].isLoading
  const isErrorVoteData = queries[1].error

  if (isLoadingProjectData || isLoadingVoteData) {
    return <Loading />
  }

  if (!projectData) {
    return <Custom404 />
  }

  if (isErrorProjectData || isErrorVoteData) {
    return <p>에러 발생</p>
  }

  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoArea}>
        <p className={styles.infoTitle}>프로젝트 정보</p>
        <ProjectInfo
          roomId={projectData.roomId}
          projectId={projectData.projectId}
          projectName={projectData.name}
          deadline={projectData.deadline}
          status={translateStatusToKorean(projectData.status)}
          startDate={projectData.startDate}
          endDate={projectData.endDate}
          leader={projectData.leader}
        />
      </div>
      <div className={styles.infoArea}>
        <p className={styles.infoTitle}>팀원 정보</p>
        <TeamInfo
          projectId={projectData.projectId}
          status={translateStatusToKorean(projectData.status)}
          writer={projectData.userId}
          projectMember={projectData.projectMembers}
          voteData={voteData}
        />
      </div>
      <div className={styles.infoArea}>
        <p className={styles.infoTitle}>평가 정보</p>
        <EvaluationInfo score={projectData.totalAverageScore} />
      </div>
      <LinkButton fill href={'/mypage/myproject'}>
        목록으로
      </LinkButton>
    </div>
  )
}

export default DetailListContainer

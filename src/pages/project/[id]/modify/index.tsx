import Container from '@/components/common/container/Container'
import Loading from '@/components/common/loading/Loading'
import WriteForm from '@/components/projectWrite/writeForm/WriteForm'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import useRequireLogin from '@/hooks/useRequireLogin'
import Custom404 from '@/pages/404'
import { ProjectDetailDataType } from '@/types/project/projectDataType'
import { fetchAccessData } from '@/utils/fetchAccessData'
import { formatDateToYYYYMMDD } from '@/utils/formatDate'
import {
  translateDevelopmentToKorean,
  translateRecruitmentToKorean,
} from '@/utils/projectDataToKorean'
import { withAuthUser } from '@/utils/withAuthUser'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

const Modify = () => {
  useRequireLogin()
  const router = useRouter()
  const id = Number(router.query.id)

  const formatTeamSize = (teamSize: number) => {
    return `${teamSize}명`
  }

  const { data, error, isLoading } = useQuery<ProjectDetailDataType>(
    REACT_QUERY_KEY.projectDetail,
    () => fetchAccessData(`/projects/${id}`),
  )

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Custom404 />
  }

  if (error) {
    return <Custom404 />
  }

  return (
    <Container>
      <WriteForm
        title={data.projectTitle}
        name={data.projectName}
        development={translateDevelopmentToKorean(data.developmentType)}
        recruitment={translateRecruitmentToKorean(data.recruitmentType)}
        region={data.region}
        content={data.content}
        teamSize={formatTeamSize(data.recruitmentNum)}
        deadline={formatDateToYYYYMMDD(data.deadline)}
        techStack={data.techStacks}
        modify
      />
    </Container>
  )
}

export const getServerSideProps = withAuthUser()

export default Modify

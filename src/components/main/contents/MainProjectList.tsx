import ProjectCard from '@/components/project/card/ProjectCard'
import styles from './list.module.css'
import LinkButton from '@/components/common/button/LinkButton'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'
import { postAccessProjectList, postProjectList } from '@/apis/project/projects'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { ProjectCardDataType } from '@/types/project/projectDataType'
import SkeletonCard from '@/components/common/loading/SkeletonCard'

const MainProjectList = () => {
  const isLogin = useRecoilValue(loginState)
  const LIMIT_CARD_NUM = 6

  const filter = {
    keyword: '',
    development: 'ALL' as 'ALL',
    recruitment: 'ALL' as 'ALL',
    techStackIds: [],
  }
  const sort = 'desc'
  const { data, error, isLoading } = useQuery(
    REACT_QUERY_KEY.mainProject,
    isLogin
      ? () => postAccessProjectList(0, LIMIT_CARD_NUM, filter, sort)
      : () => postProjectList(0, LIMIT_CARD_NUM, filter, sort),
  )

  if (isLoading) {
    return (
      <div className={styles.list}>
        {new Array(LIMIT_CARD_NUM).fill(0).map((_, index) => (
          <SkeletonCard key={`Project${index}`} />
        ))}
      </div>
    )
  }

  if (error || data.content === undefined) {
    return <p>에러발생</p>
  }

  if (data.content.length === 0) {
    return <div className={styles.null}>아직 프로젝트가 없어요.</div>
  }

  return (
    <>
      <div className={styles.list}>
        {data.content.map((item: ProjectCardDataType) => (
          <ProjectCard
            name={item.name}
            status={item.status}
            deadline={item.deadline}
            key={item.id}
            id={item.id}
            title={item.title}
            userNickname={item.userNickname}
            profileImage={item.profileImage}
            createDate={item.createDate}
            viewCount={item.viewCount}
            techStackList={item.techStackList}
            developmentType={item.developmentType}
            recruitmentType={item.recruitmentType}
            region={item.region}
            bookmarkId={item.bookmarkId}
            projectMemberList={item.projectMemberList}
          />
        ))}
      </div>
      <LinkButton href="/project">프로젝트 더보기</LinkButton>
    </>
  )
}

export default MainProjectList

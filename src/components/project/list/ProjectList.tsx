import styles from './projectList.module.css'
import ProjectCard from '../card/ProjectCard'
import Pagination from '@/components/common/pagination/Pagination'
import usePagination from '@/hooks/usePagination'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useEffect, useState } from 'react'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import SearchBar from '@/components/common/search/SearchBar'
import TechStackSelectedBox from '@/components/techStack/techStackSelected/TechStackSelectedBox'
import { SELECTED_BOX_DATA } from '@/constants/selectedBoxData'
import TechStackSelectedList from '@/components/techStack/techStackSelected/TechStackSelectedList'
import useTechStack from '@/hooks/useTechStack'
import useClearSessionStorage from '@/hooks/useClearSessionStorage'
import ListNull from '@/components/common/listNull/ListNull'
import { useQuery } from 'react-query'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import {
  dataProps,
  postAccessProjectList,
  postProjectList,
} from '@/apis/project/projects'
import { ProjectCardDataType } from '@/types/project/projectDataType'
import { useRecoilValue } from 'recoil'
import { loginState } from '@/recoil/loginState'
import { TechStackDataType } from '@/types/admin/adminDataType'
import { fetchData } from '@/utils/fetchData'
import { useRouter } from 'next/router'
import ErrorComponent from '@/components/common/error/ErrorComponent'
import SkeletonCard from '@/components/common/loading/SkeletonCard'

const ProjectList = () => {
  useClearSessionStorage(['techStack', 'project'])
  const isLogin = useRecoilValue(loginState)
  const PAGE_SIZE = 9
  const { page, handlePageChange } = usePagination('project')

  const [selectedDev, setSelectedDev] = useState('전체')
  const [selectedRecruitment, setSelectedRecruitment] = useState('전체')
  const [selectedSort, setSelectedSort] = useState('최신순')
  const [postData, setPostData] = useState<dataProps>({
    keyword: '',
    development: 'ALL',
    recruitment: 'ALL',
    techStackIds: [],
  })

  const recruitmentTypeData = (recruitmentType: string) => {
    if (recruitmentType === '온라인') return 'ONLINE' as 'ONLINE'
    else if (recruitmentType === '오프라인') return 'OFFLINE' as 'OFFLINE'
    else return 'ALL' as 'ALL'
  }

  const developmentTypeData = (developmentType: string) => {
    if (developmentType === '프론트엔드') return 'FRONTEND' as 'FRONTEND'
    else if (developmentType === '백엔드') return 'BACKEND' as 'BACKEND'
    else if (developmentType === '풀스택') return 'FULLSTACK' as 'FULLSTACK'
    else return 'ALL' as 'ALL'
  }

  const sortData = () => {
    if (selectedSort === '최신순') {
      return 'desc'
    } else {
      return 'asc'
    }
  }

  const {
    selectedItems,
    handleTechStackSave,
    selectedTechStacks,
    setSelectedTechStacks,
  } = useTechStack([])
  const [techStackData, setTechStackData] = useState<TechStackDataType[]>([])
  const router = useRouter()
  const searchQuery = router.query.search

  useEffect(() => {
    setPostData((prevData) => ({
      ...prevData,
      keyword: searchQuery === undefined ? '' : String(searchQuery),
      techStackIds: selectedTechStacks.map((item) => item.id),
      development: developmentTypeData(selectedDev),
      recruitment: recruitmentTypeData(selectedRecruitment),
    }))
  }, [selectedDev, selectedRecruitment, searchQuery, selectedTechStacks])

  const [openSortMenu, setOpenSortMenu] = useState(false)
  const handleSortMenu = () => {
    setOpenSortMenu(!openSortMenu)
  }
  const handleSort = (item: string) => {
    handleSortMenu()
    setSelectedSort(item)
  }

  const [postDataChanged, setPostDataChanged] = useState(false)
  const [sortDataChanged, setSortDataChanged] = useState(false)

  useEffect(() => {
    setPostDataChanged(true)
  }, [postData])

  useEffect(() => {
    setSortDataChanged(true)
  }, [selectedSort])

  useEffect(() => {
    fetchData('/admin/tech-stacks', setTechStackData)
  }, [])

  const queryKey = [REACT_QUERY_KEY.projectList, page, postData, sortData()]

  const { data, isError, isLoading } = useQuery(
    queryKey,
    isLogin
      ? () => postAccessProjectList(page - 1, PAGE_SIZE, postData, sortData())
      : () => postProjectList(page - 1, PAGE_SIZE, postData, sortData()),
    {
      enabled: postDataChanged || sortDataChanged,
      staleTime: 6 * 10 * 1000,
      cacheTime: 6 * 10 * 1000,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div>
          <p>모집분야</p>
          <SelectedBox
            menu={SELECTED_BOX_DATA.developmentType}
            placeholder="모집분야"
            selectedItem={selectedDev}
            setSelectedItem={setSelectedDev}
          />
        </div>
        <div>
          <p>모임형태</p>
          <SelectedBox
            menu={SELECTED_BOX_DATA.recruitmentType}
            placeholder="모임형태"
            selectedItem={selectedRecruitment}
            setSelectedItem={setSelectedRecruitment}
          />
        </div>
        <div className={styles.techStack}>
          <p>기술스택</p>
          <TechStackSelectedBox
            scroll
            selectedTechStacks={selectedTechStacks}
            setSelectedTechStacks={setSelectedTechStacks}
            techStackData={techStackData}
            selectedItems={selectedItems}
            handleItemToggle={handleTechStackSave}
          />
        </div>
        <SearchBar />
      </div>
      <TechStackSelectedList
        data={techStackData}
        selectedItems={selectedTechStacks}
      />
      <div className={styles.sortArea}>
        <p>
          <span>{data && data.totalElements}</span>개의 프로젝트
        </p>
        <div className={styles.sortButtonContainer}>
          <button
            className={styles.sortButton}
            type="button"
            onClick={handleSortMenu}
          >
            {selectedSort}
            {openSortMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
          {openSortMenu && (
            <div className={styles.sortMenuList}>
              {SELECTED_BOX_DATA.projectSort.map((item, index) => (
                <button
                  className={`${styles.buttonItem} ${
                    selectedSort === item ? styles.selected : ''
                  }`}
                  key={index}
                  type="button"
                  onClick={() => handleSort(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className={styles.list}>
          {new Array(PAGE_SIZE).fill(0).map((_, index) => (
            <SkeletonCard key={`Project${index}`} />
          ))}
        </div>
      ) : isError || data === undefined ? (
        <ErrorComponent />
      ) : data.content.length === 0 ? (
        <ListNull
          href={'/project/write'}
          buttonText="프로젝트올리기"
          contentText="아직 등록된 프로젝트가 없어요"
        />
      ) : (
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
          <Pagination
            page={page}
            setPage={handlePageChange}
            limit={PAGE_SIZE}
            total={data.totalElements}
          />
        </>
      )}
    </div>
  )
}

export default ProjectList

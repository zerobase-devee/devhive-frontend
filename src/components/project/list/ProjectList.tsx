import styles from './projectList.module.css'
import { projectCardData } from 'public/data/projectCardData'
import ProjectCard from '../card/ProjectCard'
import Pagination from '@/components/common/pagination/Pagination'
import usePagination from '@/hooks/usePagination'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useEffect, useState } from 'react'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import SearchBar from '@/components/common/search/SearchBar'
import TechStackSelectedBox from '@/components/techStack/techStackSelected/TechStackSelectedBox'
import { techStackData } from 'public/data/techStackData'
import { SELECTED_BOX_DATA } from '@/constants/selectedBoxData'
import TechStackSelectedList from '@/components/techStack/techStackSelected/TechStackSelectedList'
import useTechStack from '@/hooks/useTechStack'
import useClearSessionStorage from '@/hooks/useClearSessionStorage'
import CheckBox from '@/components/common/checkbox/CheckBox'
import { ProjectDataType } from '@/types/projectDataType'
import ListNull from '@/components/common/listNull/ListNull'
import { useSearchParams } from 'next/navigation'
import SearchResult from '@/components/common/search/SearchResult'

const ProjectList = () => {
  useClearSessionStorage(['techStack', 'project'])

  const devType = ['전체', '프론트엔드', '백엔드', '풀스택']
  const recruitmentType = ['전체', '온라인', '온/오프라인', '오프라인']
  const [selectedDev, setSelectedDev] = useState('전체')
  const [selectedRecruitment, setSelectedRecruitment] = useState('전체')
  const [selectedRegion, setSelectedRegion] = useState('전체')
  const { selectedItems, handleTechStackSave } = useTechStack()

  const sort = ['최신순', '인기순']
  const [selectedSort, setSelectedSort] = useState('최신순')
  const [openSortMenu, setOpenSortMenu] = useState(false)
  const handleSortMenu = () => {
    setOpenSortMenu(!openSortMenu)
  }
  const handleSort = (item: string) => {
    handleSortMenu()
    setSelectedSort(item)
  }

  const limit = 9
  const { page, handlePageChange, offset, setPage } = usePagination(
    'project',
    limit,
  )

  const [isChecked, setIsChecked] = useState(true)
  const [projectData, setProjectData] = useState<ProjectDataType[]>([])

  useEffect(() => {
    if (isChecked) {
      const filteredProjects = projectCardData.filter(
        (project) =>
          project.status === '팀원모집중' || project.status === '팀원재모집',
      )
      setPage(1)
      setProjectData(filteredProjects)
    } else {
      setPage(1)
      setProjectData(projectCardData)
    }
  }, [isChecked, setPage])

  const handleChecked = () => {
    setIsChecked(!isChecked)
  }

  const searchParams = useSearchParams()

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div>
          <p>모집분야</p>
          <SelectedBox
            menu={devType}
            placeholder="모집분야"
            selectedItem={selectedDev}
            setSelectedItem={setSelectedDev}
          />
        </div>
        <div>
          <p>모임형태</p>
          <SelectedBox
            menu={recruitmentType}
            placeholder="모임형태"
            selectedItem={selectedRecruitment}
            setSelectedItem={setSelectedRecruitment}
          />
        </div>
        <div>
          <p>지역</p>
          <SelectedBox
            menu={SELECTED_BOX_DATA.region}
            placeholder="지역선택"
            selectedItem={selectedRegion}
            setSelectedItem={setSelectedRegion}
            scroll
          />
        </div>
        <div className={styles.techStack}>
          <p>기술스택</p>
          <TechStackSelectedBox
            data={techStackData}
            selectedItems={selectedItems}
            handleItemToggle={handleTechStackSave}
          />
        </div>
        <SearchBar />
      </div>
      <TechStackSelectedList
        data={techStackData}
        selectedItems={selectedItems}
      />
      <div className={styles.sortArea}>
        {/* 검색어 개수, 필터 개수 반영 필요 */}
        <p>
          <span>{projectData.length}</span>개의 프로젝트
        </p>
        <CheckBox checked={isChecked} onChange={handleChecked}>
          모집중만 보기
        </CheckBox>
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
              {sort.map((item, index) => (
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
      {searchParams.get('search') ? (
        <SearchResult />
      ) : projectData.length === 0 ? (
        <ListNull
          href={'/project/write'}
          buttonText="프로젝트올리기"
          contentText="아직 등록된 프로젝트가 없어요"
        />
      ) : (
        <>
          <div className={styles.list}>
            {projectData.slice(offset, offset + limit).map((item) => (
              <ProjectCard
                key={item.projectID}
                projectID={item.projectID}
                title={item.title}
                nickname={item.nickname}
                userProfile={item.userProfile}
                createdDate={item.createdDate}
                viewCount={item.viewCount}
                techStack={item.techStack}
                techStackImg={item.techStackImg}
                developmentType={item.developmentType}
                recruitmentType={item.recruitmentType}
                region={item.region}
                bookmark={item.bookmark}
                participatingUsers={item.participatingUsers}
              />
            ))}
          </div>
          <Pagination
            page={page}
            setPage={handlePageChange}
            limit={limit}
            total={projectData.length}
          />
        </>
      )}
    </div>
  )
}

export default ProjectList

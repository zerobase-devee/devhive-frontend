import React from 'react'
import styles from './Project.module.css'
import ProjectCard from './ProjectCard'

const projectData = [
  {
    id: 1,
    title: '프로젝트 파트너 구합니다',
    category: ['프론트엔드', '온라인'],
    skills: ['A', 'B'],
    bookmark: false,
  },
  {
    id: 2,
    title: '백엔드 2명 구합니다',
    category: ['백엔드', '온라인'],
    skills: ['A', 'B'],
    bookmark: true,
  },
  {
    id: 3,
    title: '딥다이브 프로젝트 만드실분 ',
    category: ['백엔드', '온라인'],
    skills: ['A', 'B', 'C'],
    bookmark: false,
  },
  {
    id: 4,
    title: '프론트엔드 두분 구합니다 프론트엔드 두분 구합니다',
    category: ['백엔드', '온라인'],
    skills: ['A', 'B'],
    bookmark: true,
  },
  {
    id: 5,
    title: '저희랑 같이 프로젝트 하실분 3분 모집',
    category: ['백엔드', '온/오프라인'],
    skills: ['A', 'B'],
    bookmark: false,
  },
  {
    id: 6,
    title: '프로젝트 하실분 모집합니다',
    category: ['풀스택', '오프라인·서울'],
    skills: ['A', 'B'],
    bookmark: true,
  },
]

export default function Project() {
  return (
    <ul className={styles.project}>
      {projectData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
  )
}

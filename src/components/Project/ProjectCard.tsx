import React from 'react'
import styles from './Project.module.css'
import { FaUserCircle } from 'react-icons/fa'
import { GrView } from 'react-icons/gr'
import { BiTime } from 'react-icons/bi'
import { BsFillBookmarkPlusFill } from 'react-icons/bs'

interface IprojectProps {
  project: any
}

export default function ProjectCard({ project }: IprojectProps) {
  return (
    <li>
      <button
        className={`${styles.bookmark} ${
          project.bookmark ? styles.active : ''
        }`}
      >
        <BsFillBookmarkPlusFill />
      </button>
      <div className={styles.top}>
        <div className={styles.category}>
          {project.category.map((category, index) => (
            <span key={index}>{category}</span>
          ))}
        </div>
        <h3 className={styles.title}>
          {project.title}
          <span>new</span>
        </h3>
        <div className={styles.skillWrap}>
          <div className={styles.skills}>
            {project.skills.slice(0, 3).map((skill, index) => (
              <span key={index}>
                <img src={`/images/icon_skills/icon_${skill}.png`} alt="" />
              </span>
            ))}
            {project.skills.length >= 3 && (
              <span className={styles.more}>+1</span>
            )}
          </div>
          <div className={styles.createdAt}>
            <span>
              <BiTime />
              2025-00-00
            </span>
            <span>
              <GrView />8
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.user}>
          <FaUserCircle />
          <span>닉네임</span>
        </div>
        <div className={styles.users}>
          <span>
            <FaUserCircle />
          </span>
          <span>
            <FaUserCircle />
          </span>
          <span>
            <FaUserCircle />
          </span>
          <span>...</span>
        </div>
      </div>
    </li>
  )
}

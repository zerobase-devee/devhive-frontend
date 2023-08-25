import { UserProfile } from './userDataType'

// 내 프로필
// 경력
export interface CareerDataType {
  readonly company: string
  readonly position: string
  readonly startDate: string
  readonly endDate: string
}

// 기술스택
export interface TechStackDataType {
  readonly id: number
  readonly name: string
  readonly imageUrl: string
}

// 내프로젝트
export interface myprojectDataType {
  id: number
  projectStatus: string
  projectTitle: string
}

// 내프로젝트 디테일
export interface ProjectMemberDataType {
  userId: number
  nickname: string
  profileImage: string | null
}

export interface ProjectInfoProps {
  readonly projectId: number
  readonly projectName: string
  readonly deadline: string
  readonly projectStatus: string | null
  readonly startDate: string | null
  readonly endDate: string | null
  readonly leader: boolean
}

export interface MyprojectDetailDataType extends ProjectInfoProps {
  totalAverageScore: number | null
  projectMembers: ProjectMemberDataType[]
}

// 북마크
// 관심 프로젝트
export interface FavoriteProjectProps {
  readonly projectTitle: string
}

export interface FavoriteProjectListProps extends FavoriteProjectProps {
  readonly projectId: number
}

// 관심 유저
export interface FavoriteUserProps extends UserProfile {
  readonly userNickname: string
}

export interface FavoriteUserListProps extends FavoriteUserProps {
  readonly userId: number
}

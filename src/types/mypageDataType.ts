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
  readonly id: number
  readonly projectStatus: string
  readonly projectTitle: string
}

// 내프로젝트 디테일
export interface ProjectMemberDataType {
  readonly userId: number
  readonly nickname: string
  readonly profileImage: string | null
}

export interface votedMember {
  readonly userId: number
  readonly isVoted: boolean
}

export interface projectExitVoteDataType {
  readonly targetUserId: number
  readonly createdDate: string
  readonly votedMemberList: votedMember[]
}

export interface ProjectInfoProps {
  readonly projectId: number
  readonly projectName: string
  readonly projectStatus: string
  readonly deadline: string
  readonly startDate: string | null
  readonly endDate: string | null
  readonly leader: boolean
}

export interface MyprojectDetailDataType extends ProjectInfoProps {
  readonly userId: number
  readonly totalAverageScore: number | null
  readonly projectMembers: ProjectMemberDataType[]
  readonly projectExitVote: projectExitVoteDataType | null
  readonly reviewerId: number[]
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

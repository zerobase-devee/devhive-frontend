import { UserProfile } from './userDataType'

// 내 프로필
// 경력
export interface CareerData {
  readonly company: string
  readonly position: string
  readonly startDate: string
  readonly endDate: string
}

// 기술스택
export interface techStackDataType {
  readonly id: number
  readonly name: string
  readonly imageUrl: string
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

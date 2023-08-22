import { UserProfile } from './userDataType'

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

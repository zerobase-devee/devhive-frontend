export interface ParticipatingUsersDataType {
  userId: number
  userProfile: string | null
}

export interface ProjectCardProps {
  projectID: number
  title: string
  nickname: string
  userProfile: null | string
  createdDate: string
  viewCount: number
  techStack: string[]
  techStackImg: string[]
  developmentType: string
  recruitmentType: string
  region: string | null
  bookmark: boolean
  participatingUsers: ParticipatingUsersDataType[]
}

export interface ProjectDataType extends ProjectCardProps {
  status: string
}

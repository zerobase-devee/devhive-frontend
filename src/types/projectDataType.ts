export interface ParticipatingUsersDataType {
  readonly userId: number
  readonly userProfile: string | null
}

export interface TechStackData {
  readonly id: number
  readonly name: string
  readonly image: string
}

export interface ProjectBasicData {
  readonly projectTitle: string
  readonly createdDate: string
  readonly viewCount: number
  readonly techStacks: TechStackData[]
  readonly developmentType: string
  readonly recruitmentType: string
  readonly region: string | null
  readonly bookmark: boolean
}

export interface ProjectCardProps extends ProjectBasicData {
  readonly projectID: number
  readonly nickname: string
  readonly userProfile: null | string
  readonly participatingUsers: ParticipatingUsersDataType[]
}

export interface ProjectDataType extends ProjectCardProps {
  readonly status: string
}

export interface User {
  readonly userId: number
  readonly nickname: string
  readonly profileImage: string | null
}

export interface Reply {
  readonly replyId: number
  readonly user: User
  readonly reply: string
  readonly createdDate: string
  readonly modifiedDate: string | null
}

export interface Comment {
  readonly commentId: number
  readonly user: User
  readonly comment: string
  readonly createdDate: string
  readonly modifiedDate: string | null
  readonly replies: Reply[]
}

export interface ProjectDetailDataType extends ProjectBasicData {
  readonly recruitmemtNum: number
  readonly projectStatus: string
  readonly modifiedDate: string | null
  readonly deadline: string
  readonly projectName: string
  readonly content: string
  readonly projectWriter: User
  readonly projectMembers: User[]
  readonly commentAndReply: Comment[]
  readonly loginUser: User | null
  readonly applyStatus: string | null
}

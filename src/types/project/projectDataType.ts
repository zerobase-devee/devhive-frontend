import { TechStackDataType } from '../admin/adminDataType'

export interface ProjectDataType {
  title: string
  projectName: string
  developmentType: string
  recruitmentType: string
  region: string | null
  content: string
  teamSize: string
  deadline: string
}

export interface SendProjectDataType {
  readonly techStacks: TechStackDataType[]
  readonly title: string
  readonly projectName: string
  readonly developmentType: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'ALL'
  readonly recruitmentType: 'ONLINE' | 'OFFLINE' | 'ALL'
  readonly region: string | null
  readonly content: string
  readonly teamSize: number
  readonly deadline: string
}

export interface UserInfo {
  readonly userId: number
  readonly nickName: string
  readonly profileImage: string | null
}

export interface ProjectDetailDataType {
  readonly status:
    | 'RECRUITING'
    | 'RECRUITMENT_COMPLETE'
    | 'RE_RECRUITING'
    | 'COMPLETE'

  readonly projectTitle: string
  readonly createDate: string
  readonly modifiedDate: string | null
  readonly viewCount: number
  readonly recruitmentType: 'ONLINE' | 'OFFLINE' | 'ALL'
  readonly region: string | null
  readonly developmentType: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'ALL'
  readonly recruitmentNum: number
  readonly deadline: string
  readonly projectName: string
  readonly techStacks: TechStackDataType[]
  readonly content: string
  readonly writerInfo: UserInfo
  readonly projectMembers: UserInfo[]
  readonly userInfo: UserInfo | null
  readonly applyStatus: 'PENDING' | 'ACCEPT' | 'REJECT' | null
  readonly isBookmark: boolean
}

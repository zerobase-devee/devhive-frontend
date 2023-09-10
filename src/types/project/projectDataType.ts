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

export interface ProjectStatus {
  readonly status:
    | 'RECRUITING'
    | 'RECRUITMENT_COMPLETE'
    | 'RE_RECRUITMENT'
    | 'COMPLETE'
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
  readonly bookmarkId: number | null
}

export interface ProjectCardDataType {
  readonly bookmarkId: number | null
  readonly createDate: string
  readonly deadline: string
  readonly developmentType: 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'ALL'
  readonly recruitmentType: 'ONLINE' | 'OFFLINE' | 'ALL'
  readonly id: number
  readonly title: string
  readonly name: string
  readonly userNickname: string
  readonly profileImage: null | string
  readonly status: ProjectStatus['status']
  readonly region: string | null
  readonly viewCount: number
  readonly techStackList: TechStackDataType[]
  readonly projectMemberList: UserInfo[]
}

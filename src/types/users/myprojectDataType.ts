import { StaticImageData } from 'next/image'
import { UserInfo } from '../project/projectDataType'

export interface MyprojectDataType {
  readonly projectId: number
  readonly name: string
  readonly status: string
}

export interface ProjectApplyListDataType extends UserInfo {
  readonly applicationId: number
}

export interface ProjectMemberDataType {
  readonly userId: number
  readonly nickName: string
  readonly profileImage: string
  readonly review: boolean
}

export interface MyprojectDetailDataType {
  readonly userId: number
  readonly leader: boolean
  readonly projectId: number
  readonly name: string
  readonly status:
    | 'RECRUITING'
    | 'RECRUITMENT_COMPLETE'
    | 'RE_RECRUITING'
    | 'COMPLETE'

  readonly deadline: string
  readonly startDate: string
  readonly endDate: string
  readonly totalAverageScore: number | null
  readonly projectMembers: ProjectMemberDataType[]
  readonly roomId: number | null
}

export interface VotedMemberDataType {
  readonly userId: number
  readonly voted: boolean
}

export interface ProjectVoteDataType {
  readonly targetUserId: number
  readonly createDate: string
  readonly voted: boolean
  readonly voteId: number
  readonly userId: number
}

export interface ProjectInfoDataType {
  readonly roomId: number | null
  readonly projectId: number
  readonly projectName: string
  readonly startDate: string
  readonly endDate: string
  readonly leader: boolean
  readonly deadline: string
  readonly status:
    | '모집중'
    | '프로젝트완료'
    | '모집완료'
    | '팀원재모집'
    | '프로젝트시작'
}

export interface reviewData {
  badgeDto: {
    id: number
    name: string
    image: string | StaticImageData
  }
  point: number
}

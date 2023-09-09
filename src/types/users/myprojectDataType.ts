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
  readonly totalAverageScore: number
  readonly projectMembers: ProjectMemberDataType[]
}

export interface VotedMemberDataType {
  readonly userId: number
  readonly isVoted: boolean
}

export interface ProjectVoteDataType {
  readonly targetUserId: number
  readonly createDate: string
  readonly votedDtoList: VotedMemberDataType[]
}

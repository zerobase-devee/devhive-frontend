import { UserInfo } from '../project/projectDataType'

export interface MyprojectDataType {
  readonly projectId: number
  readonly name: string
  readonly status: string
}

export interface ProjectApplyListDataType extends UserInfo {
  readonly applicationId: number
}

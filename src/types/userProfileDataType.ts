import { CareerDataType, TechStackDataType } from './mypageDataType'

export interface Project {
  readonly projectName: string
  readonly point: number
}

export interface UserProfileDataType {
  readonly nickname: string
  readonly isFavorite: boolean
  readonly intro: string
  readonly profileImage: null | string
  readonly exitNum: number
  readonly techStacks: TechStackDataType[]
  readonly projects: Project[]
  readonly careers: CareerDataType[]
  readonly badge: string[]
}

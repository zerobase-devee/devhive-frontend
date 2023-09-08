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

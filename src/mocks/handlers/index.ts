import { imageUploadHandler } from './imageUploadHandler'
import ProjectDetail from './projectDetail'
import { rankHandler } from './rank'
import { userProfileHandler } from './userProfile'

export const handlers = [
  ...ProjectDetail,
  imageUploadHandler,
  userProfileHandler,
  rankHandler,
]

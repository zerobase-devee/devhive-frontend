import { imageUploadHandler } from './imageUploadHandler'
import ProjectDetail from './projectDetail'
import { userProfileHandler } from './userProfile'

export const handlers = [
  ...ProjectDetail,
  imageUploadHandler,
  userProfileHandler,
]

import { imageUploadHandler } from './imageUpload'
import { userProfileHandler } from './userProfile'
import { rankHandler } from './rank'
import loginHandler from './login'
import ProjectDetail from './projectDetail'

export const handlers = [
  ...ProjectDetail,
  imageUploadHandler,
  userProfileHandler,
  rankHandler,
  loginHandler,
]

import { imageUploadHandler } from './imageUpload'
import { userProfileHandler } from './userProfile'
import { rankHandler } from './rank'
import loginHandler from './auth/login'
import ProjectDetail from './projectDetail'
import logoutHandler from './auth/logout'

export const handlers = [
  ...ProjectDetail,
  imageUploadHandler,
  userProfileHandler,
  rankHandler,
  loginHandler,
  logoutHandler,
]

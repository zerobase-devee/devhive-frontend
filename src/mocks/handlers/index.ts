import { postProjectList } from './project/postProjectList'
import { imageUploadHandler } from './project/imageUpload'
import { getRankList } from './rank/getRankList'
import { loginHandler } from './auth/login'

export const handlers = [
  imageUploadHandler,
  postProjectList,
  getRankList,
  loginHandler,
]

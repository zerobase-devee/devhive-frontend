import { postProjectList } from './project/postProjectList'
import { imageUploadHandler } from './project/imageUpload'
import { getRankList } from './rank/getRankList'
import { loginHandler } from './auth/login'
import { getComment, getProject } from './project/projectDetail'

export const handlers = [
  imageUploadHandler,
  postProjectList,
  getRankList,
  loginHandler,
  getProject,
  getComment,
]

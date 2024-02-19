import { postProjectList } from './project/postProjectList'
import { imageUploadHandler } from './project/imageUpload'
import { getRankList } from './rank/getRankList'
import { loginHandler } from './auth/login'
import { getComment, getProject } from './project/projectDetail'
import { alarms } from './alarms/alarms'
import { chat } from './chat/chat'
import { getTechStack } from './admin/techStack'
import {
  exitNum,
  hiveLevel,
  userBadges,
  userCarrers,
  userData,
  userProjectHistories,
  userTechStack,
} from './mypage/user'

export const handlers = [
  imageUploadHandler,
  postProjectList,
  getRankList,
  loginHandler,
  getProject,
  getComment,
  alarms,
  chat,
  getTechStack,
  userData,
  hiveLevel,
  exitNum,
  userBadges,
  userCarrers,
  userTechStack,
  userProjectHistories,
]

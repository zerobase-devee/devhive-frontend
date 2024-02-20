import { postProjectList } from './project/postProjectList'
import { imageUploadHandler } from './project/imageUpload'
import { getRankList } from './rank/getRankList'
import { loginHandler } from './auth/login'
import { getComment, getProject } from './project/projectDetail'
import { alarms } from './alarms/alarms'
import { chat } from './chat/chat'
import { getTechStack } from './admin/techStack'
import {
  putUserCareers,
  exitNum,
  hiveLevel,
  putUserData,
  userBadges,
  userCareers,
  userData,
  userProjectHistories,
  userTechStack,
  putUserTechStack,
} from './mypage/user'
import { getProfile } from './profile/profile'
import { getBookmark, getFavorite } from './mypage/bookmark'
import {
  getMyProject,
  getPProjectList,
  getVoteData,
  getWProjectList,
  postReview,
} from './mypage/project'

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
  putUserData,
  hiveLevel,
  exitNum,
  userBadges,
  userCareers,
  putUserCareers,
  userTechStack,
  userProjectHistories,
  putUserTechStack,
  getProfile,
  getBookmark,
  getFavorite,
  getWProjectList,
  getPProjectList,
  getMyProject,
  getVoteData,
  postReview,
]

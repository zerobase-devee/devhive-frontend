import { imageUploadHandler } from './imageUpload'
import profileHandler from './profile/profile'
import { rankHandler } from './rank'
import loginHandler from './auth/login'
import ProjectDetail from './projectDetail'
import logoutHandler from './auth/logout'
import myprofileHandler from './mypage/myprofile'
import refreshTokenHandler from './auth/refreshToken'
import checkNicknameHandler from './auth/checkNickname'

export const handlers = [
  ...ProjectDetail,
  imageUploadHandler,
  profileHandler,
  rankHandler,
  loginHandler,
  logoutHandler,
  myprofileHandler,
  refreshTokenHandler,
  checkNicknameHandler,
]

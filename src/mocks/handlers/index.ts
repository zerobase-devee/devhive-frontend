import { postProjectList } from './project/postProjectList'
import { getRankList } from './rank/getRankList'
import { loginHandler } from './auth/login'

export const handlers = [postProjectList, getRankList, loginHandler]

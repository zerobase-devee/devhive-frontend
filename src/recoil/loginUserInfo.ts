import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { loginUserInfoDataType } from '@/types/auth/userDataType'

const { persistAtom } = recoilPersist({
  key: 'loginUserInfo',
})

export const loginUserInfo = atom<loginUserInfoDataType>({
  key: 'loginUserInfo',
  default: {
    userId: null,
    role: null,
    profileImage: null,
  },
  effects_UNSTABLE: [persistAtom],
})

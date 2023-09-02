import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'authState',
})

export const authState = atom({
  key: 'authState',
  default: {
    accessToken: null,
    refreshToken: null,
  },
  effects_UNSTABLE: [persistAtom],
})

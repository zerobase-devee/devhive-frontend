import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'paginationState',
  storage: sessionStorage,
})

export const paginationState = atom<{ [key: string]: number }>({
  key: 'paginationState',
  default: {
    participationKey: 1,
    writeKey: 1,
  },
  effects_UNSTABLE: [persistAtom],
})

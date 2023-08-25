import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'myprofileTechState',
})

export const myprofileTechState = atom<number[]>({
  key: 'myprofileTechState',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

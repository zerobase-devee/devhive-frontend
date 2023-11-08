import { atom } from 'recoil'

export const deleteFavoriteProjectIdState = atom<number | null>({
  key: 'deleteFavoriteProjectIdState',
  default: null,
})

export const deleteFavoriteUserIdState = atom<number | null>({
  key: 'deleteFavoriteIdState',
  default: null,
})

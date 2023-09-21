import { atom } from 'recoil'

export const deleteFavoriteIdState = atom<number | null>({
  key: 'deleteFavoriteIdState',
  default: null,
})

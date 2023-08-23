import { atom } from 'recoil'

export const openLoginModalState = atom({
  key: 'openLoginModalState',
  default: false,
})

export const openSignupModalState = atom({
  key: 'openSignupModalState',
  default: false,
})

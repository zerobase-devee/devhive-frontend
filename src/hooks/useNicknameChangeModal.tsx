import { loginUserInfo } from '@/recoil/loginUserInfo'
import { useRecoilValue } from 'recoil'
import useModal from './useModal'
import { NEEDS_NICKNAME_CHANGE } from '@/constants/nicknameChange'
import { useEffect } from 'react'

const useNicknameChangeModal = () => {
  const userInfo = useRecoilValue(loginUserInfo)
  const userNickname = userInfo.nickName
  const { openModal, handleOpenModal } = useModal()
  useEffect(() => {
    if (userNickname?.includes(NEEDS_NICKNAME_CHANGE)) {
      handleOpenModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { openModal }
}

export default useNicknameChangeModal

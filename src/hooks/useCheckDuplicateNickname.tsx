'use cleint'

import { nicknameDuplicateCheck } from '@/apis/auth/nicknameDuplicateCheck'
import { useState } from 'react'

const useCheckDuplicateNickname = () => {
  const [isNicknameDuplicateCheck, setIsNicknameDuplicateCheck] =
    useState(false)
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false)
  const [duplicateCheckMsg, setDublicateCheckMsg] = useState('')

  const handleCheckDuplicateNickname = async (nickname: string) => {
    try {
      setIsNicknameDuplicateCheck(true)
      const isNickname = await nicknameDuplicateCheck(nickname)
      if (!!isNickname) {
        await setIsNicknameAvailable(true)
        setDublicateCheckMsg('사용할 수 있는 닉네임이에요.')
      } else if (!isNickname && isNickname !== undefined) {
        await setIsNicknameAvailable(false)
        setDublicateCheckMsg('중복된 닉네임이에요.')
      } else {
        setDublicateCheckMsg('다시 한번 시도해주세요.')
      }
    } catch (err) {
      console.error('이메일 변경 오류:', err)
      setIsNicknameAvailable(false)
      setIsNicknameDuplicateCheck(false)
    }
  }

  return {
    isNicknameAvailable,
    setIsNicknameAvailable,
    isNicknameDuplicateCheck,
    setIsNicknameDuplicateCheck,
    duplicateCheckMsg,
    setDublicateCheckMsg,
    handleCheckDuplicateNickname,
  }
}

export default useCheckDuplicateNickname

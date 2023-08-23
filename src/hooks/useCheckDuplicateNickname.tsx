'use cleint'

import { useState } from 'react'

const useCheckDuplicateNickname = () => {
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false)
  const [isNicknameDuplicateCheck, setIsNicknameDuplicateCheck] =
    useState(false)
  const [duplicateCheckMsg, setDublicateCheckMsg] = useState('')

  const handleCheckDuplicateNickname = async (nickname: string) => {
    await setIsNicknameDuplicateCheck(true)
    try {
      // api 연결하고 변경하기
      if (nickname === '야호') {
        await setIsNicknameAvailable(true)
        setDublicateCheckMsg('사용할 수 있는 닉네임이에요.')
      } else {
        await setIsNicknameAvailable(false)
        setDublicateCheckMsg('중복된 닉네임이에요.')
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

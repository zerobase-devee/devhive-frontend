'use client'

import ModalBG from '@/components/common/modal/ModalBG'
import styles from './signup.module.css'
import AuthContainer from '@/components/auth/authModal/AuthModal'
import AuthTitle from '@/components/auth/authTitle/Title'
import AuthInput from '@/components/auth/authInput/AuthInput'
import { useState } from 'react'

const SignUp = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  return (
    <>
      <ModalBG />
      <AuthContainer imgWidth={374} imgHeight={390}>
        <div className={styles.rightSideArea}>
          <p className={styles.signupStep}>
            3단계 중 <span>1단계</span>
          </p>
          <AuthTitle text=" 회원가입" />
          <form className={styles.signupForm}>
            <AuthInput
              type="email"
              placeholder="이메일을 입력해주세요."
              value={inputValue.email}
              onChange={onChange}
              name="email"
            />
            <AuthInput
              type="email"
              placeholder="이메일을 입력해주세요."
              value={inputValue.email}
              onChange={onChange}
              name="email"
            />
            <AuthInput
              type="email"
              placeholder="이메일을 입력해주세요."
              value={inputValue.email}
              onChange={onChange}
              name="email"
            />
          </form>
        </div>
      </AuthContainer>
    </>
  )
}

export default SignUp

'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './login.module.css'
import KakaoIcon from 'public/svgs/kakao.svg'
import NaverIcon from 'public/svgs/naver.svg'
import GoogleIcon from 'public/svgs/google.svg'
import { IoMdClose } from 'react-icons/io'
import loginPic from 'public/images/login.png'
import Input from '@/components/auth/authInput/Input'
import CheckBox from '@/components/common/checkbox/CheckBox'
import LinkLineButton from '@/components/common/button/linkbutton/LinkLineButton'
import ModalBG from '@/components/common/modal/ModalBG'
import AuthTitle from '@/components/auth/authTitle/Title'
import AuthContainer from '@/components/auth/authContainer/AuthContainer'

const LoginModal = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleEmailReset = () => {
    setInputValue({
      ...inputValue,
      email: '',
    })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <ModalBG />
      <AuthContainer imgWidth={444} imgHeight={444}>
        <>
          <AuthTitle text="에 로그인하세요" />
          <form className={styles.loginForm}>
            <Input
              value={inputValue.email}
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              onChange={onChange}
              onClick={handleEmailReset}
            />
            <Input
              value={inputValue.password}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요."
              onChange={onChange}
              onClick={toggleShowPassword}
            />
            <CheckBox id="saveEmail" text={'이메일 저장'} checkStatus={true} />
            <button className={styles.loginButton} type="submit">
              로그인
            </button>
          </form>
          <div className={styles.signupArea}>
            <p className={styles.text}>
              아직 <span className={styles.bold}>devHive</span>의 회원이
              아니신가요?
            </p>
            <LinkLineButton href="/signup">이메일로 시작하기</LinkLineButton>
            <button type="button" className={styles.kakao}>
              <KakaoIcon />
              카카오로 시작하기
            </button>
            <button type="button" className={styles.naver}>
              <NaverIcon />
              네이버로 시작하기
            </button>
            <button type="button" className={styles.google}>
              <GoogleIcon />
              구글로 시작하기
            </button>
          </div>
        </>
      </AuthContainer>
    </>
  )
}

export default LoginModal

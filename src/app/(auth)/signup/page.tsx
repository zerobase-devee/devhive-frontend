'use client'

import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import styles from './signup.module.css'
import AuthContainer from '@/components/auth/authModal/AuthModal'
import AuthTitle from '@/components/auth/authTitle/Title'
import AuthInput from '@/components/auth/authInput/AuthInput'
import Button from '@/components/common/button/Button'
import LinkButton from '@/components/common/button/LinkButton'

const SignUp = () => {
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const {
    inputValue,
    onChange,
    showPassword,
    toggleShowPassword,
    handleEmailReset,
  } = useAuth()

  return (
    <AuthContainer imgWidth={374} imgHeight={390}>
      <div className={styles.rightSideArea}>
        <p className={styles.signupStep}>
          3단계 중 <span>{step}단계</span>
        </p>
        <AuthTitle text=" 회원가입" />
        <form className={styles.signupForm}>
          {step === 1 && (
            <>
              <div className={styles.inputContainer}>
                <AuthInput
                  value={inputValue.email}
                  name="email"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  onChange={onChange}
                  onClick={handleEmailReset}
                />
                <Button disabled>이메일인증</Button>
              </div>
              <div className={styles.inputContainer}>
                <AuthInput
                  value={inputValue.authNumber}
                  name="authNumber"
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  onChange={onChange}
                />
                <Button disabled>확인</Button>
              </div>
              <AuthInput
                value={inputValue.password}
                name="password"
                type={showPassword.password ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요."
                onChange={onChange}
                onClick={() => toggleShowPassword('password')}
              />
              <AuthInput
                value={inputValue.passwordConfirm}
                name="passwordConfirm"
                type={showPassword.passwordConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 한번 더 입력해주세요."
                onChange={onChange}
                onClick={() => toggleShowPassword('passwordConfirm')}
              />
              <Button onClick={handleNextStep} fill>
                다음으로
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <p className={styles.topArea}>
                <span>devHive</span>에서
                <br /> 사용할 닉네임을 정해주세요.
              </p>
              <div className={styles.inputContainer}>
                <AuthInput
                  value={inputValue.nickname}
                  name="name"
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  onChange={onChange}
                />
                <Button disabled>중복확인</Button>
              </div>
              <Button onClick={handleNextStep} fill>
                다음으로
              </Button>
            </>
          )}
          {step === 3 && (
            <div className={styles.step3ContentContainer}>
              <p className={styles.topArea}>
                <span className={styles.nickname}>닉네임 님</span>
                <br />
                <span>devHive</span>에 오신걸 환영합니다. :)
              </p>
              <p className={styles.desc}>
                프로젝트에 참여하기 전에
                <br /> 프로필을 등록해보세요!
              </p>
              <LinkButton href="/" fill>
                프로필 등록하기
              </LinkButton>
            </div>
          )}
        </form>
      </div>
    </AuthContainer>
  )
}

export default SignUp

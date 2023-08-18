'use client'

import styles from './loginForm.module.css'
import inputStyles from '../authInput.module.css'
import { useForm } from 'react-hook-form'
import { AUTH_FORM_REGEX } from '@/constants/authFormRegex'
import CheckBox from '@/components/common/checkbox/CheckBox'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import useShowPassword from '@/hooks/useShowPassword'
import KakaoIcon from 'public/svgs/kakao.svg'
import NaverIcon from 'public/svgs/naver.svg'
import GoogleIcon from 'public/svgs/google.svg'
import LinkButton from '@/components/common/button/LinkButton'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type LoginFormType = {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  const { showPassword, toggleShowPassword } = useShowPassword()

  // 로그인
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<LoginFormType>({
    mode: 'onChange',
  })

  const onSubmit = (data: LoginFormType) => {
    console.log(data)
    reset()
    router.back()
    router.push('/')
  }

  // 이메일 저장
  const [isSaveEmail, setIsSaveEmail] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['saveEmail'])

  useEffect(() => {
    if (cookies.saveEmail !== undefined) {
      setIsSaveEmail(true)
      setValue('email', cookies.saveEmail)
    } else {
      setIsSaveEmail(false)
    }
  }, [cookies.saveEmail, setValue, setIsSaveEmail])

  const handleOnChange = () => {
    const newIsSaveEmail = !isSaveEmail

    if (newIsSaveEmail) {
      const maxAge = 30 * 24 * 60 * 60
      setCookie('saveEmail', getValues('email'), {
        path: '/',
        maxAge: maxAge,
      })
    } else {
      removeCookie('saveEmail')
    }

    setIsSaveEmail(newIsSaveEmail)
  }

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`${inputStyles.input} ${
            errors.email && inputStyles.error
          }`}
          type="email"
          placeholder="이메일을 입력해주세요."
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: AUTH_FORM_REGEX.email,
              message: '이메일 형식을 다시 확인해주세요.',
            },
          })}
        />
        <div className={inputStyles.inputItemContainer}>
          <input
            className={`${inputStyles.input} ${
              errors.password && inputStyles.error
            }`}
            type={showPassword.password ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요."
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          />
          {watch('password') && (
            <button
              type="button"
              className={inputStyles.inputIcon}
              onClick={() => toggleShowPassword('password')}
            >
              {showPassword.password ? (
                <BsFillEyeSlashFill />
              ) : (
                <BsFillEyeFill />
              )}
            </button>
          )}
        </div>
        <CheckBox
          id="saveEmail"
          text="이메일 저장"
          checked={isSaveEmail}
          onChange={handleOnChange}
        />
        {errors.email && (
          <p className={inputStyles.errorMsg}>{errors.email.message}</p>
        )}
        {!errors.email && errors.password && (
          <p className={inputStyles.errorMsg}>{errors.password.message}</p>
        )}
        <button className={styles.loginButton} type="submit">
          로그인
        </button>
      </form>
      <div className={styles.signupButtonArea}>
        <p className={styles.text}>
          아직 <span className={styles.bold}>devHive</span>의 회원이 아니신가요?
        </p>
        <LinkButton href="/signup">이메일로 시작하기</LinkButton>
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
  )
}

export default LoginForm

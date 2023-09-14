import styles from './loginForm.module.css'
import inputStyles from '../authInput.module.css'
import { useForm } from 'react-hook-form'
import { AUTH_FORM_REGEX } from '@/constants/authFormRegex'
import CheckBox from '@/components/common/checkbox/CheckBox'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import useShowPassword from '@/hooks/useShowPassword'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import Button from '@/components/common/button/Button'
import useLogin from '@/hooks/queries/useLogin'
import { LoginDataType } from '@/types/auth/loginDataType'
import { EMAIL_MAX_AGE } from '@/constants/cookieMaxAge'

const LoginForm = () => {
  const { showPassword, toggleShowPassword } = useShowPassword()
  const { loginMutation } = useLogin()
  const [cookies, setCookie, removeCookie] = useCookies(['saveEmail'])

  // 로그인
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
    setError,
  } = useForm<LoginDataType>({
    mode: 'onChange',
    criteriaMode: 'all',
  })

  const onSubmit = async (data: LoginDataType) => {
    try {
      await loginMutation.mutateAsync(data, {
        onSuccess: () => {
          reset()
        },
        onError: (error: any) => {
          const errorRes = error.response
          if (errorRes.status !== 405) {
            setError('root', {
              message:
                '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.',
            })
          } else {
            setError('root', {
              message: '퇴출전적으로 인해 계정이 비활성화되었어요.',
            })
          }
        },
      })
    } catch (error: any) {
      console.error('API 호출 실패:', error)
    }
  }

  // 이메일 저장
  const [isSaveEmail, setIsSaveEmail] = useState(false)

  useEffect(() => {
    if (cookies.saveEmail !== undefined) {
      setValue('email', cookies.saveEmail)
      setIsSaveEmail(true)
    } else {
      setIsSaveEmail(false)
    }
  }, [cookies.saveEmail, setValue, setIsSaveEmail])

  const handleOnChange = () => {
    const newIsSaveEmail = !isSaveEmail

    if (newIsSaveEmail) {
      setCookie('saveEmail', getValues('email'), {
        path: '/',
        maxAge: EMAIL_MAX_AGE,
      })
    } else {
      removeCookie('saveEmail')
    }

    setIsSaveEmail(newIsSaveEmail)
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={`${inputStyles.input} ${
          errors.email || (errors.root && inputStyles.error)
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
            errors.password || (errors.root && inputStyles.error)
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
            tabIndex={-1}
          >
            {showPassword.password ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        )}
      </div>
      <CheckBox
        id="saveEmail"
        defaultChecked={cookies.saveEmail ? true : false}
        onChange={handleOnChange}
      >
        이메일저장
      </CheckBox>
      {errors.email ? (
        <p className={inputStyles.errorMsg}>{errors.email.message}</p>
      ) : errors.password ? (
        <p className={inputStyles.errorMsg}>{errors.password.message}</p>
      ) : (
        errors.root && (
          <p className={inputStyles.errorMsg}>{errors.root.message}</p>
        )
      )}
      <Button fill type="submit">
        로그인
      </Button>
    </form>
  )
}

export default LoginForm

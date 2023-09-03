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
import useModal from '@/hooks/useModal'
import { usePathname, useRouter } from 'next/navigation'

const LoginForm = () => {
  const { handleCloseModal } = useModal()
  const router = useRouter()
  const pathname = usePathname()
  const { showPassword, toggleShowPassword } = useShowPassword()
  const { loginMutation } = useLogin()

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
      await loginMutation.mutate(data, {
        onSuccess: (authToken, errMsg) => {
          const { accessToken, refreshToken } = authToken
          if (accessToken !== undefined && refreshToken !== undefined) {
            handleCloseModal()
            router.push(pathname)
            reset()
          } else if (errMsg) {
            reset({ password: '' })
            setError('root', {
              message:
                '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요.',
            })
          }
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 이메일 저장
  const [cookies, setCookie, removeCookie] = useCookies(['saveEmail'])
  const [isSaveEmail, setIsSaveEmail] = useState(false)

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
      <CheckBox id="saveEmail" checked={isSaveEmail} onChange={handleOnChange}>
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

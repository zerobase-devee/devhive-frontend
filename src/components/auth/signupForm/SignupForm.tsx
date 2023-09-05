import styles from './signupForm.module.css'
import inputStyles from '../authInput.module.css'
import Button from '@/components/common/button/Button'
import { useForm } from 'react-hook-form'
import { AUTH_FORM_REGEX } from '@/constants/authFormRegex'
import { useEffect, useState } from 'react'
import useShowPassword from '@/hooks/useShowPassword'
import AuthTitle from '../authTitle/Title'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import useModal from '@/hooks/useModal'
import useCheckDuplicateNickname from '@/hooks/useCheckDuplicateNickname'
import { SignupDataType } from '@/types/auth/signupDataType'
import useLogin from '@/hooks/useLogin'
import { signup } from '@/apis/auth/signup'
import { emailSendVerify } from '@/apis/auth/emailSendVerify'
import { emailCheckVerify } from '@/apis/auth/emailCheckVerify'

interface SignupFormData {
  email: string
  emailAuthNumber: string
  password: string
  passwordConfirm: string
  nickname: string
}

const SignupForm = () => {
  const { loginMutation } = useLogin()
  const {
    setIsNicknameDuplicateCheck,
    handleCheckDuplicateNickname,
    isNicknameDuplicateCheck,
    isNicknameAvailable,
    duplicateCheckMsg,
  } = useCheckDuplicateNickname()
  const { handleCloseModal } = useModal()
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
    reset,
  } = useForm<SignupFormData>({ mode: 'onChange' })
  const router = useRouter()
  // 이메일 인증
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [emailVerification, setEmailVerification] = useState(false)
  const [emailSendVerifyCount, setEmailSendVerifyCount] = useState(0)
  // 회원가입 단계
  const [step, setStep] = useState(1)
  // 이메일 인증시간
  const emailVerificationTime = 60 * 10
  const [timer, setTimer] = useState(emailVerificationTime)
  const [timerActive, setTimerActive] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const { showPassword, toggleShowPassword } = useShowPassword()
  const [userNickname, setUserNickname] = useState('')

  useEffect(() => {
    let timeCount: NodeJS.Timeout | undefined
    if (timerActive && timer > 0) {
      timeCount = setInterval(() => setTimer(timer - 1), 1000)
    }
    if (timer === 0) {
      setTimerExpired(true)
      clearInterval(timeCount)
    }

    return () => clearInterval(timeCount)
  }, [timer, timerActive])

  const formatTimeToMMSS = (timer: number) => {
    const minutes = Math.floor(timer / 60)
    const remainingSeconds = timer % 60

    const formattedTime = `${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    return formattedTime
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const onSubmit = async (data: SignupFormData) => {
    try {
      const serverSendData: SignupDataType = {
        email: data.email,
        password: data.password,
        rePassword: data.passwordConfirm,
        nickName: data.nickname,
      }
      await signup(serverSendData)
      await loginMutation.mutate({ email: data.email, password: data.password })
      setUserNickname(serverSendData.nickName)
      handleNextStep()
      reset()
    } catch (error) {
      console.error('API 오류:', error)
      setError('root', {
        message: '새로고침 후 다시 시도해주세요.',
      })
    }
  }

  // 이메일 인풋 리셋 버튼
  const handleEmailReset = () => {
    setValue('email', '')
    setValue('emailAuthNumber', '')
    setEmailVerification(false)
    setTimerActive(false)
    setTimerExpired(false)
    setIsSendingEmail(false)
    setTimer(emailVerificationTime)
  }

  // 이메일 인증메일 전송
  const handleSendEmailVerification = async () => {
    try {
      setIsSendingEmail(true)
      await emailSendVerify(getValues('email'))
      setTimerActive(true)
      setEmailVerification(true)
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('API 오류:', error)
        setError('email', {
          message: '이미 가입된 이메일이에요.',
        })
      } else {
        setTimerActive(false)
        setEmailVerification(false)
        console.error('API 오류:', error)
        setError('email', {
          message: '다시 시도해주세요.',
        })
      }
    }
  }

  // 이메일 인증메일 재전송
  const handleResendEmail = async () => {
    setEmailSendVerifyCount((prev) => prev + 1)
    if (emailSendVerifyCount < 2) {
      try {
        console.log(emailSendVerifyCount)
        await emailSendVerify(getValues('email'))
        setTimerExpired(false)
        setTimer(emailVerificationTime)
      } catch (error) {
        console.error('API 오류:', error)
        setError('email', {
          message: '다시 시도해주세요.',
        })
      }
    } else {
      console.error('API 오류: 이메일 인증횟수 초과')
      setError('email', {
        message: '이메일 인증횟수를 초과했어요. 다시 시도해주세요.',
      })
    }
  }

  // 인증 코드 확인
  const handleVerifyEmailCode = async () => {
    try {
      await emailCheckVerify(getValues('email'), getValues('emailAuthNumber'))
      setTimerActive(false)
    } catch (error) {
      console.error('API 오류:', error)
      setError('emailAuthNumber', {
        message: '인증번호가 맞지 않아요.',
      })
    }
  }

  const HandleLinkProfile = () => {
    handleCloseModal()
    router.push('/mypage/myprofile')
  }

  return (
    <>
      <p className={`${styles.signupStep}  ${step === 2 && styles.step2}`}>
        2단계 중 <span>{step}단계</span>
      </p>

      {step === 1 && (
        <>
          <AuthTitle text="회원가입" />
          <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
            {/* 이메일 */}
            <div className={styles.inputContainer}>
              <div className={inputStyles.inputItemContainer}>
                <input
                  disabled={emailVerification}
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
                {watch('email') && (
                  <button
                    tabIndex={-1}
                    type="button"
                    className={inputStyles.inputIcon}
                    onClick={handleEmailReset}
                  >
                    <AiFillCloseCircle />
                  </button>
                )}
              </div>
              <Button
                type="button"
                disabled={
                  !watch('email') ||
                  !!errors.email ||
                  emailVerification ||
                  isSendingEmail
                }
                onClick={handleSendEmailVerification}
              >
                이메일인증
              </Button>
            </div>
            {errors.email && (
              <p className={inputStyles.errorMsg}>{errors.email.message}</p>
            )}
            {/* 이메일 인증번호 */}
            {timerActive && (
              <>
                <div className={styles.inputContainer}>
                  <div className={inputStyles.inputItemContainer}>
                    <input
                      className={`${inputStyles.input} ${
                        errors.emailAuthNumber && inputStyles.error
                      }`}
                      type="text"
                      placeholder="인증번호를 입력해주세요."
                      aria-invalid={errors.emailAuthNumber ? 'true' : 'false'}
                      {...register('emailAuthNumber', {
                        required: '인증번호를 입력해주세요.',
                      })}
                    />
                    <p className={inputStyles.inputTime}>
                      {formatTimeToMMSS(timer)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    disabled={
                      !watch('emailAuthNumber') || !!errors.emailAuthNumber
                    }
                    onClick={handleVerifyEmailCode}
                  >
                    확인
                  </Button>
                </div>
                <div className={styles.emailAuthNumberDesc}>
                  <p>
                    입력한 이메일로 인증번호를 보내드렸어요.
                    <br />
                    메일함에 없다면, 스팸 메일함도 확인해주세요.
                  </p>
                  <button
                    type="button"
                    disabled={emailSendVerifyCount >= 3 ? true : false}
                    onClick={handleResendEmail}
                  >
                    재전송
                  </button>
                </div>
                {timerExpired ? (
                  <p className={inputStyles.errorMsg}>
                    인증 시간이 지났습니다.
                  </p>
                ) : (
                  errors.emailAuthNumber && (
                    <p className={inputStyles.errorMsg}>
                      {errors.emailAuthNumber.message}
                    </p>
                  )
                )}
              </>
            )}
            {/* 비밀번호 */}
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
                  minLength: {
                    value: 8,
                    message: '최소 8자 이상 입력해주세요.',
                  },
                  pattern: {
                    value: AUTH_FORM_REGEX.password,
                    message: '영문+숫자+특수문자 조합을 활용해주세요.',
                  },
                })}
              />
              {watch('password') && (
                <button
                  type="button"
                  className={inputStyles.inputIcon}
                  onClick={() => toggleShowPassword('password')}
                  tabIndex={-1}
                >
                  {showPassword.password ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </button>
              )}
            </div>
            {errors.password && (
              <p className={inputStyles.errorMsg}>{errors.password.message}</p>
            )}
            {/* 비밀번호 확인 */}
            <div className={inputStyles.inputItemContainer}>
              <input
                className={`${inputStyles.input} ${
                  errors.passwordConfirm && inputStyles.error
                }`}
                type={showPassword.passwordConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 한번 더 입력해주세요."
                aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
                {...register('passwordConfirm', {
                  required: '비밀번호를 한번 더 입력해주세요.',
                  validate: {
                    passwordCheck: (passwordConfirm) => {
                      if (getValues('password') !== passwordConfirm) {
                        return '입력한 비밀번호와 똑같이 입력해주세요.'
                      }
                    },
                  },
                })}
              />
              {watch('passwordConfirm') && (
                <button
                  type="button"
                  className={inputStyles.inputIcon}
                  onClick={() => toggleShowPassword('passwordConfirm')}
                  tabIndex={-1}
                >
                  {showPassword.passwordConfirm ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </button>
              )}
            </div>
            {errors.passwordConfirm && (
              <p className={inputStyles.errorMsg}>
                {errors.passwordConfirm.message}
              </p>
            )}
            {/* 닉네임 */}
            <div className={styles.inputContainer}>
              <input
                className={`${inputStyles.input} ${
                  errors.nickname && inputStyles.error
                }`}
                type="text"
                placeholder="닉네임을 입력해주세요."
                aria-invalid={errors.nickname ? 'true' : 'false'}
                {...register('nickname', {
                  onChange: () => {
                    setIsNicknameDuplicateCheck(false)
                  },
                  required: '닉네임을 입력해주세요.',
                  validate: {
                    specialCharacterCheck: (nickname) => {
                      if (
                        AUTH_FORM_REGEX.specialCharacterRegex.test(nickname)
                      ) {
                        return '닉네임에 특수문자는 사용할 수 없어요.'
                      }
                    },
                  },
                  pattern: {
                    value: AUTH_FORM_REGEX.nickname,
                    message: '올바르지 않은 닉네임이에요.',
                  },
                  maxLength: {
                    value: 6,
                    message: '닉네임은 6자 이하로 입력해 주세요.',
                  },
                })}
              />
              <Button
                type="button"
                disabled={!watch('nickname') || !!errors.nickname}
                onClick={() =>
                  handleCheckDuplicateNickname(getValues('nickname'))
                }
              >
                중복확인
              </Button>
            </div>
            {(errors.nickname && (
              <p className={inputStyles.errorMsg}>{errors.nickname.message}</p>
            )) ||
              (isNicknameDuplicateCheck && (
                <p
                  className={`${inputStyles.errorMsg} ${
                    isNicknameAvailable && inputStyles.positiveMsg
                  }`}
                >
                  {duplicateCheckMsg}
                </p>
              ))}
            {errors.root && (
              <p className={inputStyles.errorMsg}>{errors.root.message}</p>
            )}
            <Button
              fill
              disabled={!isDirty || !isValid || !isNicknameAvailable}
              type="submit"
            >
              다음으로
            </Button>
          </form>
        </>
      )}
      {step === 2 && (
        <div className={styles.step2ContentContainer}>
          <p className={styles.topArea}>
            <span className={styles.nickname}>{userNickname} 님</span>
            <br />
            <span>devHive</span>에 오신걸 환영합니다.😀
          </p>
          <p className={styles.desc}>
            프로젝트에 참여하기 전에
            <br /> 프로필을 등록해보세요!
          </p>
          <Button type="button" onClick={HandleLinkProfile} fill>
            프로필 등록하기
          </Button>
        </div>
      )}
    </>
  )
}

export default SignupForm

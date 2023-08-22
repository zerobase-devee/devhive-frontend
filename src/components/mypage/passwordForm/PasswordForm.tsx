'use client'
import useShowPassword from '@/hooks/useShowPassword'
import styles from './passwordForm.module.css'
import inputStyles from '@/components/auth/authInput.module.css'
import { useForm } from 'react-hook-form'
import { AUTH_FORM_REGEX } from '@/constants/authFormRegex'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import InfoModal from '@/components/common/modal/InfoModal'
import useModal from '@/hooks/useModal'
import { useRouter } from 'next/navigation'
import Button from '@/components/common/button/Button'

type PasswordFormType = {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

const PasswordForm = () => {
  const { openModal, handleOpenModal, handleCloseModal } = useModal()
  const { showPassword, toggleShowPassword } = useShowPassword()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm<PasswordFormType>({
    mode: 'onChange',
  })

  const onSubmit = (data: PasswordFormType) => {
    console.log(data)
    reset()
    handleOpenModal()
  }

  const handleModal = () => {
    handleCloseModal()
    router.push('/')
  }

  return (
    <>
      {openModal === true && (
        <InfoModal buttonText="확인" onClick={handleModal}>
          비밀번호 변경이 완료되었어요 <br /> 새로운 비밀번호로 다시 로그인
          해주세요
        </InfoModal>
      )}
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputFieldArea}>
          <div className={styles.inputFielditem}>
            <p className={styles.fieldText}>현재 비밀번호</p>
            <div className={inputStyles.inputItemContainer}>
              <input
                className={`${inputStyles.input} ${
                  errors.currentPassword && inputStyles.error
                }`}
                type={showPassword.currentPassword ? 'text' : 'password'}
                placeholder="현재 비밀번호를 입력해 주세요."
                aria-invalid={errors.currentPassword ? 'true' : 'false'}
                {...register('currentPassword', {
                  required: '현재 비밀번호를 입력해 주세요.',
                })}
              />
              {watch('currentPassword') && (
                <button
                  type="button"
                  className={inputStyles.inputIcon}
                  onClick={() => toggleShowPassword('currentPassword')}
                  tabIndex={-1}
                >
                  {showPassword.currentPassword ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </button>
              )}
            </div>
            {errors.currentPassword && (
              <p className={inputStyles.errorMsg}>
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className={styles.inputFielditem}>
            <p className={styles.fieldText}>새 비밀번호</p>
            <div className={inputStyles.inputItemContainer}>
              <input
                className={`${inputStyles.input} ${
                  errors.newPassword && inputStyles.error
                }`}
                type={showPassword.newPassword ? 'text' : 'password'}
                placeholder="새 비밀번호를 입력해 주세요."
                aria-invalid={errors.newPassword ? 'true' : 'false'}
                {...register('newPassword', {
                  required: '새 비밀번호를 입력해 주세요.',
                  minLength: {
                    value: 8,
                    message: '최소 8자 이상 입력해주세요.',
                  },
                  pattern: {
                    value: AUTH_FORM_REGEX.password,
                    message: '영문+숫자+특수문자 조합을 활용해주세요.',
                  },
                  validate: {
                    passwordCheck: (newPassword) => {
                      if (getValues('currentPassword') === newPassword) {
                        return '이전 비밀번호는 사용할 수 없어요.'
                      }
                    },
                  },
                })}
              />
              {watch('newPassword') && (
                <button
                  type="button"
                  className={inputStyles.inputIcon}
                  onClick={() => toggleShowPassword('newPassword')}
                  tabIndex={-1}
                >
                  {showPassword.newPassword ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </button>
              )}
            </div>
            {errors.newPassword && (
              <p className={inputStyles.errorMsg}>
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className={styles.inputFielditem}>
            <p className={styles.fieldText}>새 비밀번호 확인</p>
            <div className={inputStyles.inputItemContainer}>
              <input
                className={`${inputStyles.input} ${
                  errors.newPasswordConfirm && inputStyles.error
                }`}
                type={showPassword.newPasswordConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 한번 더 입력해주세요."
                aria-invalid={errors.newPasswordConfirm ? 'true' : 'false'}
                {...register('newPasswordConfirm', {
                  required: '비밀번호를 한번 더 입력해주세요.',
                  validate: {
                    passwordCheck: (newPasswordConfirm) => {
                      if (getValues('newPassword') !== newPasswordConfirm) {
                        return '입력한 비밀번호와 똑같이 입력해주세요.'
                      }
                    },
                  },
                })}
              />
              {watch('newPasswordConfirm') && (
                <button
                  type="button"
                  className={inputStyles.inputIcon}
                  onClick={() => toggleShowPassword('newPasswordConfirm')}
                  tabIndex={-1}
                >
                  {showPassword.newPasswordConfirm ? (
                    <BsFillEyeSlashFill />
                  ) : (
                    <BsFillEyeFill />
                  )}
                </button>
              )}
            </div>
            {errors.newPasswordConfirm && (
              <p className={inputStyles.errorMsg}>
                {errors.newPasswordConfirm.message}
              </p>
            )}
          </div>
        </div>
        <Button
          disabled={
            !watch('currentPassword') ||
            !!errors.currentPassword ||
            !watch('newPassword') ||
            !!errors.newPassword ||
            !watch('newPasswordConfirm') ||
            !!errors.newPasswordConfirm
          }
          type="submit"
        >
          비밀번호 변경하기
        </Button>
      </form>
    </>
  )
}

export default PasswordForm

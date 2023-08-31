import styles from './profileEditModal.module.css'
import inputStyles from '@/components/auth/authInput.module.css'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/common/button/Button'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import { AUTH_FORM_REGEX } from '@/constants/authFormRegex'
import useCheckDuplicateNickname from '@/hooks/useCheckDuplicateNickname'
import SelectedBox from '@/components/common/selectedBox/SelectedBox'
import { SELECTED_BOX_DATA } from '@/constants/selectedBoxData'
import { useEffect, useState } from 'react'
import { MAX_SIZE_IN_BYTES } from '@/constants/maxSizeInBytes'
import axios from 'axios'

interface ProfileEditData {
  nickname: string
  intro: string | null
  region: string
  profileImage: File | Blob | null
}

interface ProfileEditModalProps {
  onClick: () => void
}

const ProfileEditModal = ({ onClick }: ProfileEditModalProps) => {
  const {
    setIsNicknameDuplicateCheck,
    handleCheckDuplicateNickname,
    isNicknameDuplicateCheck,
    isNicknameAvailable,
    duplicateCheckMsg,
  } = useCheckDuplicateNickname()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm<ProfileEditData>({ mode: 'onChange' })
  const [imgPreview, setImgPreview] = useState('')
  const profileImage = watch('profileImage')
  const [fileSizeError, setFileSizeError] = useState('')

  useEffect(() => {
    if (profileImage) {
      setImgPreview(URL.createObjectURL(profileImage))
    }
  }, [profileImage])

  const onSubmit = async (data: ProfileEditData) => {
    onClick()
    try {
      console.log(data)
    } catch (err) {
      console.error('프로필 업데이트 오류', err)
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.content}>
        <div className={styles.editImg}>
          <div className={styles.imgArea}>
            <UserProfileImg
              userProfile={imgPreview ? imgPreview : null}
              width={208}
              height={208}
            />
          </div>
          <Controller
            name="profileImage"
            control={control}
            render={({ field: { onChange } }) => (
              <label className={styles.uploadButton}>
                사진업로드
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(event) => {
                    const selectedFile =
                      event.target.files && event.target.files[0]
                    if (selectedFile) {
                      if (selectedFile.size <= MAX_SIZE_IN_BYTES) {
                        onChange(selectedFile)
                        setFileSizeError('')
                      } else {
                        onChange(null)
                        setFileSizeError('파일 용량은 최대 5MB까지 가능해요.')
                      }
                    }
                  }}
                />
              </label>
            )}
          />
          <Controller
            name="profileImage"
            control={control}
            render={({ field: { onChange } }) => (
              <button
                className={styles.removeButton}
                type="button"
                onClick={() => {
                  onChange(null)
                  setImgPreview('')
                  setFileSizeError('')
                }}
              >
                사진제거
              </button>
            )}
          />
          <p className={styles.fileError}>{fileSizeError}</p>
        </div>
        <div className={styles.editInfo}>
          <div className={styles.nicknameArea}>
            <div className={styles.inputTitleArea}>
              <span className={styles.inputTitle}>닉네임</span>
              <span className={styles.inputDesc}>
                닉네임은 한번만 변경할 수 있어요
              </span>
            </div>
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
                gray
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
          </div>
          <div className={styles.introArea}>
            <div className={styles.inputTitleArea}>
              <span className={styles.inputTitle}>자기소개</span>
              <span className={styles.inputTextLength}>
                (
                <span className={`${errors.intro && styles.err}`}>
                  {watch('intro') === undefined ? '0' : watch('intro')?.length}
                </span>
                /<span className={styles.point}>100</span>)
              </span>
            </div>
            <div className={styles.inputContainer}>
              <textarea
                className={`${styles.intro} ${errors.intro && styles.error}`}
                placeholder="자기소개를 입력해주세요."
                maxLength={101}
                aria-invalid={errors.intro ? 'true' : 'false'}
                {...register('intro', {
                  maxLength: {
                    value: 100,
                    message: '자기소개는 최대 100자까지 입력할 수 있어요.',
                  },
                })}
              />
            </div>
            {errors.intro && (
              <p className={inputStyles.errorMsg}>{errors.intro.message}</p>
            )}
          </div>
          <div className={styles.regionArea}>
            <span className={styles.inputTitle}>프로젝트 선호 지역</span>
            <Controller
              control={control}
              name="region"
              render={({ field: { onChange, value } }) => (
                <SelectedBox
                  selectedItem={value}
                  setSelectedItem={onChange}
                  placeholder="지역선택"
                  scroll
                  menu={SELECTED_BOX_DATA.region}
                />
              )}
            />
          </div>
        </div>
      </div>
      <Button type="submit" fill>
        프로필저장
      </Button>
    </form>
  )
}

export default ProfileEditModal

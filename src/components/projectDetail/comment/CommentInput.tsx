import styles from './commentInput.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import { User } from '@/types/projectDataType'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface CommentInputProps {
  loginUser: User | null
  onClick?: (id: number) => void
  commentId?: number
}

interface CommentData {
  comment: string
}

const CommentInput = ({ loginUser, onClick, commentId }: CommentInputProps) => {
  const pathname = usePathname()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentData>({ mode: 'onChange' })

  const onSubmit = (data: CommentData) => {
    if (onClick && commentId) {
      onClick(commentId)
    }

    if (watch('comment')) {
      console.log(data)
      reset()
      // 댓글 등록 api 연결 예정
    }
  }

  return (
    <>
      {loginUser === null ? (
        <div className={styles.container}>
          <p className={styles.login}>
            댓글을 작성하려면{' '}
            <Link href={`${pathname}?user=login`}>로그인</Link>해주세요.
          </p>
        </div>
      ) : (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.user}>
            <UserProfileImg
              userProfile={loginUser.profileImage}
              width={24}
              height={24}
            />
            <p>{loginUser.nickname}</p>
          </div>
          <div className={styles.commentInputArea}>
            <textarea
              className={`${styles.commentInput} ${
                errors.comment && styles.error
              }`}
              placeholder="댓글을 입력해주세요."
              maxLength={101}
              aria-invalid={errors.comment ? 'true' : 'false'}
              {...register('comment', {
                maxLength: {
                  value: 100,
                  message: '댓글은 최대 100자까지 입력할 수 있어요.',
                },
              })}
            />
            <div>
              {errors.comment && (
                <p className={styles.errorMsg}>{errors.comment.message}</p>
              )}
              <button type="submit">등록</button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default CommentInput

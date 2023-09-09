import { UserInfo } from '@/types/project/projectDataType'
import styles from './commentInput.module.css'
import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import useComment from '@/hooks/queries/useComment'
import { useRouter } from 'next/router'
import { CommentData } from '@/types/project/commentDataType'

interface CommentInputProps {
  loginUser: UserInfo | null
  handleToggleReply?: () => void
  commentId?: number
  editCommentId?: number
  edit?: boolean
  editContent?: string
  editClick?: () => void
  editReplyId?: number
}

const CommentInput = ({
  loginUser,
  handleToggleReply,
  commentId,
  edit,
  editContent,
  editClick,
  editCommentId,
  editReplyId,
}: CommentInputProps) => {
  const router = useRouter()
  const projectId = Number(router.query.id)
  const pathname = usePathname()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentData>({
    mode: 'onChange',
    defaultValues: {
      content: editContent,
    },
  })

  const {
    addCommentMutation,
    editCommentMutation,
    addReplyMutation,
    editReplyMutation,
  } = useComment()

  const onSubmit = async (data: CommentData) => {
    try {
      if (handleToggleReply && commentId) {
        // 리플
        handleToggleReply()
        await addReplyMutation.mutateAsync({ commentId, data })
        reset()
      } else if (editClick && edit && editReplyId) {
        editClick()
        await editReplyMutation.mutateAsync({ editReplyId, data })
        reset()
      } else if (edit && editCommentId && editClick) {
        // 댓글 수정
        editClick()
        await editCommentMutation.mutateAsync({ editCommentId, data })
        reset()
      } else {
        await addCommentMutation.mutateAsync({ projectId, data })
        reset()
      }
    } catch (error) {
      console.error(error)
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
            <p>{loginUser.nickName}</p>
          </div>
          <div className={styles.commentInputArea}>
            <textarea
              className={`${styles.commentInput} ${
                errors.content && styles.error
              }`}
              placeholder="댓글을 입력해주세요."
              maxLength={101}
              aria-invalid={errors.content ? 'true' : 'false'}
              {...register('content', {
                maxLength: {
                  value: 100,
                  message: '댓글은 최대 100자까지 입력할 수 있어요.',
                },
              })}
            />
            <div>
              {errors.content && (
                <p className={styles.errorMsg}>{errors.content.message}</p>
              )}
              {edit ? (
                <div className={styles.commentButtonArea}>
                  <button
                    className={styles.commentButton}
                    type="button"
                    onClick={editClick}
                  >
                    취소
                  </button>
                  <button className={styles.commentButton} type="submit">
                    수정
                  </button>
                </div>
              ) : (
                <button className={styles.commentButton} type="submit">
                  등록
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default CommentInput

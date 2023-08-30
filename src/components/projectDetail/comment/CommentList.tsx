import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import styles from './commentList.module.css'
import { Comment, User } from '@/types/projectDataType'
import { MdMoreVert } from 'react-icons/md'
import CommentInput from './CommentInput'
import { useState } from 'react'
import Link from 'next/link'

interface CommentListProps {
  comments: Comment[]
  writeUserId: number
  loginUser: User | null
}

const CommentList = ({
  comments,
  writeUserId,
  loginUser,
}: CommentListProps) => {
  const [openMoreMenu, setOpenMoreMenu] = useState<{
    [commentId: number]: boolean
  }>({})
  const [oepnReply, setOpenReply] = useState<{
    [commentId: number]: boolean
  }>({})

  const handleToggleReply = (commentId: number) => {
    setOpenReply((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleToggleMenu = (commentId: number) => {
    setOpenMoreMenu((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleRemoveComment = () => {
    console.log('댓글 삭제')
  }

  const handleModifyComment = () => {
    console.log('댓글 수정')
  }

  const countComments = () => {
    let repliesLength = 0
    for (let i = 0; i < comments.length; i++) {
      repliesLength += comments[i].replies.length
    }
    return repliesLength + comments.length
  }

  return (
    <>
      <div className={styles.container}>
        <p className={styles.countComments}>
          댓글 <span>{countComments()}</span>
        </p>
        <ul className={styles.commentsList}>
          {comments.map((item) => (
            <>
              <li className={styles.commentArea} key={item.commentId}>
                <div>
                  <Link
                    href={`/profile/@${item.user.userId}`}
                    className={styles.user}
                  >
                    <UserProfileImg
                      userProfile={item.user.profileImage}
                      width={32}
                      height={32}
                    />
                    <p className={styles.nickname}>{item.user.nickname}</p>
                    {item.user.userId === writeUserId && (
                      <p className={styles.writer}>작성자</p>
                    )}
                  </Link>
                  <div className={styles.comment}>
                    <p>{item.comment}</p>
                    <div className={styles.commentInfo}>
                      <p>{item.createdDate}</p>
                      <button
                        type="button"
                        onClick={() => handleToggleReply(item.commentId)}
                      >
                        답글쓰기
                      </button>
                    </div>
                  </div>
                </div>
                {item.user.userId === writeUserId && (
                  <div className={styles.menuContainer}>
                    <MdMoreVert
                      onClick={() => {
                        handleToggleMenu(item.commentId)
                      }}
                    />
                    {openMoreMenu[item.commentId] && (
                      <div className={styles.menuList}>
                        <button
                          type="button"
                          className={styles.buttonItem}
                          onClick={() => {
                            handleToggleMenu(item.commentId)
                            handleModifyComment()
                          }}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          className={styles.buttonItem}
                          onClick={() => {
                            handleToggleMenu(item.commentId)
                            handleRemoveComment()
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </li>
              {oepnReply[item.commentId] && (
                <div className={styles.replyInputContainer}>
                  <CommentInput
                    loginUser={loginUser}
                    onClick={handleToggleReply}
                    commentId={item.commentId}
                  />
                </div>
              )}
              <li>
                <ul>
                  {item.replies.map((item) => (
                    <>
                      <li
                        className={`${styles.commentArea} ${styles.reply}`}
                        key={item.replyId}
                      >
                        <div>
                          <Link
                            href={`/profile/@${item.user.userId}`}
                            className={styles.user}
                          >
                            <UserProfileImg
                              userProfile={item.user.profileImage}
                              width={32}
                              height={32}
                            />
                            <p className={styles.nickname}>
                              {item.user.nickname}
                            </p>
                            {item.user.userId === writeUserId && (
                              <p className={styles.writer}>작성자</p>
                            )}
                          </Link>
                          <div className={styles.comment}>
                            <p>{item.reply}</p>
                            <div className={styles.commentInfo}>
                              <p>{item.createdDate}</p>
                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleReply(item.replyId * 2)
                                }
                              >
                                답글쓰기
                              </button>
                            </div>
                          </div>
                        </div>
                        {item.user.userId === writeUserId && <MdMoreVert />}
                      </li>
                      {oepnReply[item.replyId * 2] && (
                        <div className={styles.replyInputContainer}>
                          <CommentInput
                            loginUser={loginUser}
                            onClick={handleToggleReply}
                            commentId={item.replyId}
                          />
                        </div>
                      )}
                    </>
                  ))}
                  <li></li>
                </ul>
              </li>
            </>
          ))}
        </ul>
      </div>
      <CommentInput loginUser={loginUser} />
    </>
  )
}

export default CommentList

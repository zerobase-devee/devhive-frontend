import UserProfileImg from '@/components/common/userProfileImg/UserProfileImg'
import styles from './commentList.module.css'
import { MdMoreVert } from 'react-icons/md'
import CommentInput from './CommentInput'
import React, { useState } from 'react'
import Link from 'next/link'
import { UserInfo } from '@/types/project/projectDataType'
import { CommentDataType } from '@/types/project/commentDataType'
import useComment from '@/hooks/queries/useComment'
import { formatDatetoYYYYMMDDHHMM } from '@/utils/formatDate'

interface CommentListProps {
  comments: CommentDataType[]
  writeUserId: number
  loginUser: UserInfo | null
}

const CommentList = ({
  comments,
  writeUserId,
  loginUser,
}: CommentListProps) => {
  const { deleteCommentMutation, deleteReplyMutation } = useComment()
  const [openMoreMenu, setOpenMoreMenu] = useState<{
    [commentId: number]: boolean
  }>({})
  const [openReply, setOpenReply] = useState<{
    [commentId: number]: boolean
  }>({})

  const [isEdit, setIsEdit] = useState<{
    [commentId: number]: boolean
  }>({})

  const handleToggleReply = (commentId: number) => {
    setOpenReply((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleToggleMenu = (id: number) => {
    setOpenMoreMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleModifyComment = async (id: number) => {
    try {
      handleToggleMenu(id)
      setIsEdit((prev) => ({
        ...prev,
        [id]: !prev[id],
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveComment = async (commentId: number) => {
    try {
      handleToggleMenu(commentId)
      await deleteCommentMutation.mutateAsync(commentId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveReply = async (replyId: number) => {
    try {
      handleToggleMenu(replyId)
      await deleteReplyMutation.mutateAsync(replyId)
    } catch (error) {
      console.error(error)
    }
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
          {comments.map((item, index) => (
            <React.Fragment key={`${item.commentId}_${index}`}>
              {isEdit[item.commentId] ? (
                <div className={styles.edit}>
                  <CommentInput
                    edit
                    editCommentId={item.commentId}
                    editClick={() =>
                      setIsEdit((prev) => ({
                        ...prev,
                        [item.commentId]: !prev[item.commentId],
                      }))
                    }
                    editContent={item.content}
                    loginUser={loginUser}
                  />
                </div>
              ) : (
                <li className={styles.commentArea} key={item.commentId}>
                  <div>
                    <Link
                      href={`/profile/${item.userDto.userId}`}
                      className={styles.user}
                    >
                      <UserProfileImg
                        userProfile={item.userDto.profileImage}
                        width={32}
                        height={32}
                      />
                      <p className={styles.nickname}>{item.userDto.nickName}</p>
                      {item.userDto.userId === writeUserId && (
                        <p className={styles.writer}>작성자</p>
                      )}
                    </Link>
                    <div className={styles.comment}>
                      <p>{item.content}</p>
                      <div className={styles.commentInfo}>
                        <p>{formatDatetoYYYYMMDDHHMM(item.createDate)}</p>
                        <button
                          type="button"
                          onClick={() => handleToggleReply(item.commentId)}
                        >
                          답글쓰기
                        </button>
                      </div>
                    </div>
                  </div>
                  {loginUser && loginUser.userId === item.userDto.userId && (
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
                            onClick={() => handleModifyComment(item.commentId)}
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            className={styles.buttonItem}
                            onClick={() => handleRemoveComment(item.commentId)}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              )}
              {openReply[item.commentId] && (
                <div className={styles.replyInputContainer}>
                  <CommentInput
                    loginUser={loginUser}
                    handleToggleReply={() => handleToggleReply(item.commentId)}
                    commentId={item.commentId}
                  />
                </div>
              )}
              <li>
                <ul>
                  {item.replies.map((item, index) => (
                    <React.Fragment key={`${item.replyId}_${index}`}>
                      {isEdit[item.replyId] ? (
                        <div className={styles.edit}>
                          <CommentInput
                            edit
                            editReplyId={item.replyId}
                            editClick={() =>
                              setIsEdit((prev) => ({
                                ...prev,
                                [item.replyId]: !prev[item.replyId],
                              }))
                            }
                            editContent={item.content}
                            loginUser={loginUser}
                          />
                        </div>
                      ) : (
                        <li
                          className={`${styles.commentArea} ${styles.reply}`}
                          key={item.replyId}
                        >
                          <div>
                            <Link
                              href={`/profile/${item.userDto.userId}`}
                              className={styles.user}
                            >
                              <UserProfileImg
                                userProfile={item.userDto.profileImage}
                                width={32}
                                height={32}
                              />
                              <p className={styles.nickname}>
                                {item.userDto.nickName}
                              </p>
                              {item.userDto.userId === writeUserId && (
                                <p className={styles.writer}>작성자</p>
                              )}
                            </Link>
                            <div className={styles.comment}>
                              <p>{item.content}</p>
                              <div className={styles.commentInfo}>
                                <p>
                                  {formatDatetoYYYYMMDDHHMM(item.createDate)}
                                </p>
                              </div>
                            </div>
                          </div>
                          {loginUser &&
                            loginUser.userId === item.userDto.userId && (
                              <div className={styles.menuContainer}>
                                <MdMoreVert
                                  onClick={() => {
                                    handleToggleMenu(item.replyId)
                                  }}
                                />
                                {openMoreMenu[item.replyId] && (
                                  <div className={styles.menuList}>
                                    <button
                                      type="button"
                                      className={styles.buttonItem}
                                      onClick={() =>
                                        handleModifyComment(item.replyId)
                                      }
                                    >
                                      수정
                                    </button>
                                    <button
                                      type="button"
                                      className={styles.buttonItem}
                                      onClick={() =>
                                        handleRemoveReply(item.replyId)
                                      }
                                    >
                                      삭제
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
      <CommentInput loginUser={loginUser} />
    </>
  )
}

export default CommentList

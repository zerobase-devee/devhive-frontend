import { CommentData } from '@/types/project/commentDataType'
import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const postComment = async (projectId: number, content: CommentData) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/comments/projects/${projectId}`,
      data: content,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const putComment = async (commentId: number, content: CommentData) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/comments/${commentId}`,
      data: content,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteComment = async (commentId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/comments/${commentId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const postReply = async (commentId: number, content: CommentData) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/reply/comments/${commentId}`,
      data: content,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const putReply = async (replyId: number, content: CommentData) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/reply/${replyId}`,
      data: content,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteReply = async (replyId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/reply/${replyId}`,
    })
    return res
  } catch (error) {
    throw error
  }
}

import {
  deleteComment,
  deleteReply,
  postComment,
  postReply,
  putComment,
  putReply,
} from '@/apis/comment/comment'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { CommentData } from '@/types/project/commentDataType'
import { useMutation, useQueryClient } from 'react-query'

const useComment = () => {
  const queryClient = useQueryClient()
  const addCommentMutation = useMutation(
    ({ projectId, data }: { projectId: number; data: CommentData }) => {
      return postComment(projectId, data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectComments)
      },
    },
  )

  const editCommentMutation = useMutation(
    ({ editCommentId, data }: { editCommentId: number; data: CommentData }) => {
      return putComment(editCommentId, data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectComments)
      },
    },
  )

  const deleteCommentMutation = useMutation(
    (commentId: number) => {
      return deleteComment(commentId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectComments)
      },
    },
  )

  const addReplyMutation = useMutation(
    ({ commentId, data }: { commentId: number; data: CommentData }) => {
      return postReply(commentId, data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectComments)
      },
    },
  )

  const editReplyMutation = useMutation(
    ({ editReplyId, data }: { editReplyId: number; data: CommentData }) => {
      return putReply(editReplyId, data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectComments)
      },
    },
  )

  const deleteReplyMutation = useMutation(
    (replyId: number) => {
      return deleteReply(replyId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectComments)
      },
    },
  )

  return {
    addCommentMutation,
    editCommentMutation,
    deleteCommentMutation,
    addReplyMutation,
    editReplyMutation,
    deleteReplyMutation,
  }
}

export default useComment

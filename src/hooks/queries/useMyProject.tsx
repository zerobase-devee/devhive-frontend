import {
  postProjectReview,
  postProjectVote,
  putProjectStauts,
  putProjectVote,
} from '@/apis/mypage/myProject'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { ProjectStatus } from '@/types/project/projectDataType'
import { reviewData } from '@/types/users/myprojectDataType'
import { useMutation, useQueryClient } from 'react-query'

const useMyProject = () => {
  const queryClient = useQueryClient()

  const editProjectStatusMutation = useMutation(
    ({ projectId, status }: { projectId: number; status: ProjectStatus }) => {
      return putProjectStauts(projectId, status)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.userProjectDetail)
      },
    },
  )

  const postProjectExitVote = useMutation(
    ({
      projectId,
      targetUserId,
    }: {
      projectId: number
      targetUserId: number
    }) => {
      return postProjectVote(projectId, targetUserId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectVote)
      },
    },
  )

  const putProjectExitVote = useMutation(
    ({
      projectId,
      voteId,
      vote,
    }: {
      projectId: number
      voteId: number
      vote: boolean
    }) => {
      return putProjectVote(projectId, voteId, vote)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectVote)
      },
    },
  )

  const addProjectReview = useMutation(
    ({
      projectId,
      targetUserId,
      result,
    }: {
      projectId: number
      targetUserId: number
      result: reviewData[]
    }) => {
      return postProjectReview(projectId, targetUserId, result)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.userProjectDetail)
      },
    },
  )

  return {
    editProjectStatusMutation,
    postProjectExitVote,
    putProjectExitVote,
    addProjectReview,
  }
}

export default useMyProject

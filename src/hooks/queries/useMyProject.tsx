import {
  deleteProjectLeaderExit,
  deleteProjectMemberExit,
  postExitProcess,
  postProjectReview,
  postProjectVote,
  putProjectStauts,
  putProjectVote,
} from '@/apis/mypage/myProject'
import { REACT_QUERY_KEY } from '@/constants/reactQueryKey'
import { ProjectStatus } from '@/types/project/projectDataType'
import { reviewData } from '@/types/users/myprojectDataType'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from 'react-query'

const useMyProject = () => {
  const router = useRouter()
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

  const deleteMemberExit = useMutation(
    ({
      targetUserId,
      projectId,
    }: {
      targetUserId: number
      projectId: number
    }) => {
      return deleteProjectMemberExit(targetUserId, projectId)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(REACT_QUERY_KEY.projectVote)
        queryClient.invalidateQueries(REACT_QUERY_KEY.userProjectDetail)
      },
    },
  )

  const exitTeamMember = async (targetUserId: number, projectId: number) => {
    try {
      await postExitProcess(targetUserId)
      await deleteMemberExit.mutateAsync({ targetUserId, projectId })
    } catch (error) {
      console.error(error)
    }
  }

  const exitTeamLeader = async (targetUserId: number, projectId: number) => {
    try {
      await postExitProcess(targetUserId)
      await deleteProjectLeaderExit(projectId)
    } catch (error) {
      console.error(error)
    }
  }

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
      onSuccess: async (data) => {
        console.log(data)
        const { projectId, targetUserId, leader } = data
        if (data === null) {
          queryClient.invalidateQueries(REACT_QUERY_KEY.projectVote)
        } else {
          if (leader === true) {
            router.push('/mypage/myproject')
            await exitTeamLeader(targetUserId, projectId)
            queryClient.invalidateQueries(REACT_QUERY_KEY.projectVote)
          } else {
            await exitTeamMember(targetUserId, projectId)
            queryClient.invalidateQueries(REACT_QUERY_KEY.projectVote)
          }
        }
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
    deleteMemberExit,
    exitTeamMember,
    exitTeamLeader,
  }
}

export default useMyProject

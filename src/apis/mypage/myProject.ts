import { reviewData } from '@/types/users/myprojectDataType'
import { axiosAccessFn } from '..'
import { ProjectStatus } from '@/types/project/projectDataType'

const axiosAccess = axiosAccessFn()

export const getProjectWrite = async (pageParam: number, pageSize: number) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/users/project/write`,
      params: {
        page: pageParam,
        size: pageSize,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export const getProjectParticipation = async (
  pageParam: number,
  pageSize: number,
) => {
  try {
    const res = await axiosAccess({
      method: 'get',
      url: `/users/project/participation`,
      params: {
        page: pageParam,
        size: pageSize,
      },
    })
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const putProjectStauts = async (
  projectId: number,
  status: ProjectStatus,
) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/projects/${projectId}/status`,
      data: status,
    })

    return res
  } catch (error) {
    throw error
  }
}

export const postProjectVote = async (
  projectId: number,
  targetUserId: number,
) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/projects/${projectId}/vote/${targetUserId}`,
    })

    return res
  } catch (error) {
    throw error
  }
}

export const putProjectVote = async (
  projectId: number,
  voteId: number,
  vote: boolean,
) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/projects/${projectId}/vote/${voteId}`,
      params: {
        vote: vote,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}

export const postProjectReview = async (
  projectId: number,
  targetUserId: number,
  data: reviewData[],
) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/projects/${projectId}/review/${targetUserId}`,
      data: data,
    })

    return res
  } catch (error) {
    throw error
  }
}

import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const getProjectWrite = async (pageParam: number, pageSize: number) => {
  try {
    const res = await axiosAccess.get(`/users/project/write`, {
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
    const res = await axiosAccess.get(`/users/project/participation`, {
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

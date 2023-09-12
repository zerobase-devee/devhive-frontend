import { axiosAccessFn } from '..'

const axiosAccess = axiosAccessFn()

export const postApplicationProject = async (projectId: number) => {
  try {
    const res = await axiosAccess({
      method: 'post',
      url: `/projects/${projectId}/application`,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const deleteApplicationProject = async (projectId: number) => {
  try {
    const res = await axiosAccess({
      method: 'delete',
      url: `/projects/${projectId}/application`,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const putApplicationAccept = async (applicationId: number) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/projects/application/${applicationId}/accept`,
    })
    return res
  } catch (error) {
    throw error
  }
}

export const putApplicationReject = async (applicationId: number) => {
  try {
    const res = await axiosAccess({
      method: 'put',
      url: `/projects/application/${applicationId}/reject`,
    })
    return res
  } catch (error) {
    throw error
  }
}
